import * as ort from 'onnxruntime-node';
import path from 'path';

async function run() {
    try {
        const onnxPath = path.join(__dirname, '../models/swin_transformer.onnx');
        const session = await ort.InferenceSession.create(onnxPath);
        
        // Create an empty input array
        const float32Data = new Float32Array(3 * 256 * 256);
        
        const tensor = new ort.Tensor('float32', float32Data, [1, 3, 256, 256]);
        
        const feeds: Record<string, ort.Tensor> = {};
        feeds[session.inputNames[0]] = tensor;
        
        const results = await session.run(feeds);
        console.log("Success! Output array length:", (results[session.outputNames[0]].data as Float32Array).length);
    } catch (e) {
        console.error("ONNX Error:", e);
    }
}

run();
