const path = require('path');
const sharp = require('sharp');
const ort = require('onnxruntime-node');
const manifest = require('./plant_manifest.json');

const MODEL_PATH = path.join(__dirname, 'models', 'swin_v2_mvp_quantized.onnx');
const IMAGE_SIZE = 256;
const CHANNELS = 3;
const IMAGENET_MEAN = [0.485, 0.456, 0.406];
const IMAGENET_STD = [0.229, 0.224, 0.225];

let sessionPromise;

function getSession() {
  if (!sessionPromise) {
    sessionPromise = ort.InferenceSession.create(MODEL_PATH);
  }
  return sessionPromise;
}

function prettifyLabel(label) {
  return label
    .replace(/_/g, ' ')
    .replace(/[(),]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function toSpeciesMap(speciesKey) {
  const speciesMap = manifest[speciesKey];
  if (!speciesMap) {
    throw new Error(`Unknown species key: ${speciesKey}`);
  }
  return speciesMap;
}

async function preprocessImageToTensor(imageBuffer) {
  const { data, info } = await sharp(imageBuffer)
    .rotate()
    .resize(IMAGE_SIZE, IMAGE_SIZE, { fit: 'fill' })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  if (info.channels !== CHANNELS) {
    throw new Error(`Expected ${CHANNELS} channels after preprocessing, got ${info.channels}`);
  }

  const pixelsPerChannel = IMAGE_SIZE * IMAGE_SIZE;
  const tensorData = new Float32Array(CHANNELS * pixelsPerChannel);

  for (let y = 0; y < IMAGE_SIZE; y += 1) {
    for (let x = 0; x < IMAGE_SIZE; x += 1) {
      const hwIndex = y * IMAGE_SIZE + x;
      const bufferIndex = hwIndex * CHANNELS;

      const r = data[bufferIndex] / 255;
      const g = data[bufferIndex + 1] / 255;
      const b = data[bufferIndex + 2] / 255;

      tensorData[hwIndex] = (r - IMAGENET_MEAN[0]) / IMAGENET_STD[0];
      tensorData[pixelsPerChannel + hwIndex] = (g - IMAGENET_MEAN[1]) / IMAGENET_STD[1];
      tensorData[(2 * pixelsPerChannel) + hwIndex] = (b - IMAGENET_MEAN[2]) / IMAGENET_STD[2];
    }
  }

  return new ort.Tensor('float32', tensorData, [1, CHANNELS, IMAGE_SIZE, IMAGE_SIZE]);
}

function maskedArgmax(logits, validIndices) {
  const maskedLogits = new Float32Array(logits.length);
  maskedLogits.fill(Number.NEGATIVE_INFINITY);

  for (const idx of validIndices) {
    maskedLogits[idx] = logits[idx];
  }

  let bestIndex = -1;
  let bestValue = Number.NEGATIVE_INFINITY;

  for (let idx = 0; idx < maskedLogits.length; idx += 1) {
    const value = maskedLogits[idx];
    if (value > bestValue) {
      bestValue = value;
      bestIndex = idx;
    }
  }

  return { index: bestIndex, value: bestValue, maskedLogits };
}

async function diagnoseImage(imageBuffer, speciesKey) {
  const session = await getSession();
  const tensor = await preprocessImageToTensor(imageBuffer);
  const speciesMap = toSpeciesMap(speciesKey);
  const validIndices = Object.values(speciesMap);

  const feeds = { [session.inputNames[0]]: tensor };
  const outputs = await session.run(feeds);
  const outputName = session.outputNames[0];
  const logits = outputs[outputName].data;

  const { index: predictedIndex, value: predictedLogit } = maskedArgmax(logits, validIndices);

  if (predictedIndex < 0) {
    throw new Error(`No valid indices available for species: ${speciesKey}`);
  }

  const diseaseKey = Object.keys(speciesMap).find((key) => speciesMap[key] === predictedIndex);
  if (!diseaseKey) {
    throw new Error(`Predicted index ${predictedIndex} not found in species map`);
  }

  const speciesName = prettifyLabel(speciesKey);
  const diseaseName = prettifyLabel(diseaseKey);

  return {
    speciesKey,
    speciesName,
    classIndex: predictedIndex,
    diseaseKey,
    diseaseName,
    commonName: `${speciesName} ${diseaseName}`,
    logit: predictedLogit
  };
}

// ─── Blur Detection (Variance of the Laplacian) ────────────────────────────
const BLUR_THRESHOLD = 100;
const BLUR_SIZE = 256;

async function checkBlur(imageBuffer) {
  // Convert to grayscale and resize
  const { data } = await sharp(imageBuffer)
    .rotate()
    .resize(BLUR_SIZE, BLUR_SIZE, { fit: 'fill' })
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Laplacian kernel: [0, 1, 0], [1, -4, 1], [0, 1, 0]
  const w = BLUR_SIZE;
  const h = BLUR_SIZE;
  const laplacian = new Float32Array((w - 2) * (h - 2));
  let sum = 0;

  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const val =
        data[(y - 1) * w + x] +       // top
        data[(y + 1) * w + x] +       // bottom
        data[y * w + (x - 1)] +       // left
        data[y * w + (x + 1)] -       // right
        4 * data[y * w + x];          // center
      const idx = (y - 1) * (w - 2) + (x - 1);
      laplacian[idx] = val;
      sum += val;
    }
  }

  const n = laplacian.length;
  const mean = sum / n;
  let varianceSum = 0;
  for (let i = 0; i < n; i++) {
    const diff = laplacian[i] - mean;
    varianceSum += diff * diff;
  }
  const variance = varianceSum / n;

  return {
    blurry: variance < BLUR_THRESHOLD,
    variance: Math.round(variance * 100) / 100,
    threshold: BLUR_THRESHOLD
  };
}

module.exports = {
  diagnoseImage,
  checkBlur
};