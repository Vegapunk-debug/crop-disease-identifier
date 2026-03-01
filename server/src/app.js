const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const { diagnoseImage } = require('./inference');
const { getTreatmentByCommonName, getSpeciesList } = require('./database');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Multer: store uploads in memory (we just need the buffer)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (_req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/heic'];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG, PNG, WebP and HEIC images are allowed'));
    }
  }
});

// GET /api/species — return all available species from the manifest
app.get('/api/species', (_req, res) => {
  try {
    const species = getSpeciesList();
    res.json({ species });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/diagnose — upload image + species, get diagnosis
app.post('/api/diagnose', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file uploaded' });
    }

    const species = req.body.species;
    if (!species) {
      return res.status(400).json({ error: 'Species is required' });
    }

    // Run inference
    const diagnosis = await diagnoseImage(req.file.buffer, species);

    // Look up treatment
    const treatment = getTreatmentByCommonName(diagnosis.commonName);

    res.json({
      species: diagnosis.speciesKey,
      speciesName: diagnosis.speciesName,
      classIndex: diagnosis.classIndex,
      diseaseKey: diagnosis.diseaseKey,
      diseaseName: diagnosis.diseaseName,
      commonName: diagnosis.commonName,
      logit: diagnosis.logit,
      treatment: treatment || {
        common_name: diagnosis.commonName,
        symptoms: 'No detailed symptom data available.',
        cultural_control: 'Consult local agricultural extension services.',
        chemical_control: 'Consult local agricultural extension services.'
      }
    });
  } catch (err) {
    console.error('Diagnosis error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Error handling middleware
app.use((err, _req, res, _next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`🌱 Crop Disease Identifier API running on http://localhost:${PORT}`);
  console.log(`   POST /api/diagnose — Upload image + species for diagnosis`);
  console.log(`   GET  /api/species  — List available species`);
});
