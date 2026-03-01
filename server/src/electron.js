const { app, BrowserWindow } = require('electron');
const path = require('path');

// Start the Express server (this also initializes DB + ONNX)
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { diagnoseImage } = require('./inference');
const { getTreatmentByCommonName, getSpeciesList } = require('./database');

const PORT = 3001;
let server;

function startServer() {
    const expressApp = express();
    expressApp.use(cors());
    expressApp.use(express.json());

    // Serve the built React frontend
    const clientDist = path.join(__dirname, '..', '..', 'client', 'dist');
    expressApp.use(express.static(clientDist));

    const upload = multer({
        storage: multer.memoryStorage(),
        limits: { fileSize: 10 * 1024 * 1024 },
        fileFilter: (_req, file, cb) => {
            const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/heic'];
            cb(null, allowed.includes(file.mimetype));
        }
    });

    expressApp.get('/api/species', (_req, res) => {
        try {
            res.json({ species: getSpeciesList() });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    expressApp.post('/api/diagnose', upload.single('image'), async (req, res) => {
        try {
            if (!req.file) return res.status(400).json({ error: 'No image uploaded' });
            if (!req.body.species) return res.status(400).json({ error: 'Species required' });

            const diagnosis = await diagnoseImage(req.file.buffer, req.body.species);
            const treatment = getTreatmentByCommonName(diagnosis.commonName);

            res.json({
                ...diagnosis,
                treatment: treatment || {
                    common_name: diagnosis.commonName,
                    symptoms: 'No detailed data available.',
                    cultural_control: 'Consult local agricultural services.',
                    chemical_control: 'Consult local agricultural services.'
                }
            });
        } catch (err) {
            console.error('Diagnosis error:', err);
            res.status(500).json({ error: err.message });
        }
    });

    // Fallback: serve index.html for any non-API route
    expressApp.get('*', (_req, res) => {
        res.sendFile(path.join(clientDist, 'index.html'));
    });

    server = expressApp.listen(PORT, () => {
        console.log(`🌱 Server running on http://localhost:${PORT}`);
    });
}

function createWindow() {
    const win = new BrowserWindow({
        width: 1280,
        height: 820,
        title: 'Crop Disease Identifier',
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    win.loadURL(`http://localhost:${PORT}`);
    win.setMenuBarVisibility(false);
}

app.whenReady().then(() => {
    startServer();
    // Give the server a moment to start
    setTimeout(createWindow, 500);

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (server) server.close();
    if (process.platform !== 'darwin') app.quit();
});
