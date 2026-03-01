import { useState, useRef, useEffect } from 'react';
import { jsPDF } from 'jspdf';

const API_URL = window.location.port === '5173' ? 'http://localhost:3001' : '';

interface Treatment {
  common_name: string;
  symptoms: string;
  cultural_control: string;
  chemical_control: string;
  biological_control?: string;
  prevention?: string;
}

interface DiagnosisResponse {
  species: string;
  speciesName: string;
  classIndex: number;
  diseaseKey: string;
  diseaseName: string;
  commonName: string;
  logit: number;
  confidence: number;
  treatment: Treatment;
}

interface SpeciesInfo {
  key: string;
  label: string;
  diseases: { key: string; label: string; index: number }[];
}

type AppState = 'select' | 'uploading' | 'results';

// ─── PDF Export ──────────────────────────────────────────────────────────────
function exportPDF(result: DiagnosisResponse) {
  const doc = new jsPDF();
  const margin = 20;
  let y = margin;
  const pageWidth = doc.internal.pageSize.getWidth();
  const contentWidth = pageWidth - margin * 2;

  // Header
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('Crop Disease Diagnosis Report', margin, y);
  y += 10;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(120, 120, 120);
  doc.text(`Generated: ${new Date().toLocaleString()}  •  100% Offline AI Analysis`, margin, y);
  y += 4;

  // Divider
  doc.setDrawColor(16, 185, 129);
  doc.setLineWidth(0.8);
  doc.line(margin, y, pageWidth - margin, y);
  y += 10;

  doc.setTextColor(0, 0, 0);

  // Diagnosis Summary
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Diagnosis Summary', margin, y);
  y += 8;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');

  const isHealthy = result.diseaseKey?.includes('healthy');
  const summaryItems = [
    ['Species:', result.speciesName],
    ['Disease:', result.diseaseName],
    ['Full Classification:', result.commonName],
    ['AI Confidence:', `${result.confidence}%`],
    ['Status:', isHealthy ? 'HEALTHY — No disease detected' : 'DISEASE DETECTED — Treatment recommended'],
  ];

  for (const [label, value] of summaryItems) {
    doc.setFont('helvetica', 'bold');
    doc.text(label, margin, y);
    doc.setFont('helvetica', 'normal');
    doc.text(value, margin + 40, y);
    y += 6;
  }
  y += 6;

  // Helper to add sections with word wrap
  const addSection = (title: string, body: string) => {
    if (!body) return;
    // Check if we need a new page
    if (y > 260) {
      doc.addPage();
      y = margin;
    }
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(title, margin, y);
    y += 7;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const lines = doc.splitTextToSize(body, contentWidth);
    for (const line of lines) {
      if (y > 280) { doc.addPage(); y = margin; }
      doc.text(line, margin, y);
      y += 5;
    }
    y += 6;
  };

  addSection('Symptoms', result.treatment.symptoms);

  if (!isHealthy) {
    addSection('Cultural Control', result.treatment.cultural_control);
    addSection('Chemical Control', result.treatment.chemical_control);
    if (result.treatment.biological_control) {
      addSection('Biological Control', result.treatment.biological_control);
    }
    if (result.treatment.prevention) {
      addSection('Prevention', result.treatment.prevention);
    }
  } else {
    addSection('Maintenance Recommendations', result.treatment.cultural_control);
    if (result.treatment.prevention) {
      addSection('Ongoing Prevention', result.treatment.prevention);
    }
  }

  // Footer
  if (y > 270) { doc.addPage(); y = margin; }
  y += 4;
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.3);
  doc.line(margin, y, pageWidth - margin, y);
  y += 6;
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text('Crop Disease Identifier — Powered by Swin Transformer V2 + ONNX Runtime', margin, y);
  y += 4;
  doc.text('This report was generated entirely offline using on-device AI inference.', margin, y);

  doc.save(`diagnosis_${result.speciesName}_${result.diseaseName}_${Date.now()}.pdf`);
}

// ─── Confidence Badge ────────────────────────────────────────────────────────
function ConfidenceBadge({ confidence }: { confidence: number }) {
  let colorClasses = 'text-red-700 bg-red-100 border-red-200';
  let label = 'Low';
  if (confidence >= 80) {
    colorClasses = 'text-emerald-700 bg-emerald-100 border-emerald-200';
    label = 'High';
  } else if (confidence >= 50) {
    colorClasses = 'text-amber-700 bg-amber-100 border-amber-200';
    label = 'Medium';
  }
  return (
    <span className={`px-2.5 py-1 text-xs font-bold rounded-lg border ${colorClasses}`}>
      {label}: {confidence}%
    </span>
  );
}

function App() {
  const [species, setSpecies] = useState<SpeciesInfo[]>([]);
  const [selectedSpecies, setSelectedSpecies] = useState('');
  const [appState, setAppState] = useState<AppState>('select');
  const [result, setResult] = useState<DiagnosisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load species on mount
  useEffect(() => {
    fetch(`${API_URL}/api/species`)
      .then(res => res.json())
      .then(data => setSpecies(data.species || []))
      .catch(err => {
        console.error('Failed to load species:', err);
        setError('Could not connect to the server. Make sure the backend is running on port 3001.');
      });
  }, []);

  const handleFileSelect = async (file: File) => {
    if (!selectedSpecies) {
      setError('Please select a crop species first.');
      return;
    }

    setError(null);
    setAppState('uploading');
    setUploadedFileName(file.name);

    // Preview
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    // Upload
    const formData = new FormData();
    formData.append('image', file);
    formData.append('species', selectedSpecies);

    try {
      const res = await fetch(`${API_URL}/api/diagnose`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json();
        if (errData.error === 'BLURRY_IMAGE') {
          setError(`📸 ${errData.message} (Sharpness score: ${errData.variance}, minimum: ${errData.threshold})`);
          setAppState('select');
          return;
        }
        throw new Error(errData.error || 'Diagnosis failed');
      }

      const data: DiagnosisResponse = await res.json();
      setResult(data);
      setAppState('results');
    } catch (err: any) {
      setError(err.message || 'Failed to analyze image.');
      setAppState('select');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleReset = () => {
    setAppState('select');
    setResult(null);
    setError(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setUploadedFileName('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const isHealthy = result?.diseaseKey?.includes('healthy');

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Header */}
      <header className="border-b border-emerald-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 tracking-tight">Crop Disease Identifier</h1>
              <p className="text-xs text-gray-500">AI-powered leaf disease diagnosis</p>
            </div>
          </div>
          <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
            100% Offline AI
          </span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Error */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-xl px-5 py-4 flex items-start gap-3">
            <svg className="w-5 h-5 text-red-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-sm font-semibold text-red-800">{error}</p>
            </div>
            <button onClick={() => setError(null)} className="ml-auto text-red-400 hover:text-red-600">✕</button>
          </div>
        )}

        {/* ─── STEP 1: Select Species ─── */}
        {(appState === 'select' || appState === 'uploading') && (
          <div className="space-y-8">
            {/* Species Selection */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">New Diagnosis</h2>
              <p className="text-gray-500 text-sm mb-6">Select the crop species, then upload a clear photo of the leaf.</p>

              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Select Crop Species</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {species.map(sp => (
                      <button
                        key={sp.key}
                        onClick={() => { setSelectedSpecies(sp.key); setError(null); }}
                        className={`px-4 py-3 rounded-xl border text-sm font-semibold text-left transition-all ${selectedSpecies === sp.key
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-800 shadow-sm shadow-emerald-100 ring-1 ring-emerald-500'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                      >
                        {sp.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Upload Area */}
                <div className="p-8">
                  <div
                    onDrop={handleDrop}
                    onDragOver={e => e.preventDefault()}
                    onClick={() => {
                      if (!selectedSpecies) { setError('Please select a crop species first.'); return; }
                      fileInputRef.current?.click();
                    }}
                    className={`border-2 border-dashed rounded-2xl flex flex-col items-center justify-center min-h-[280px] transition-all ${selectedSpecies
                      ? 'border-gray-300 bg-gray-50/50 hover:bg-emerald-50/50 hover:border-emerald-300 cursor-pointer'
                      : 'border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed'
                      }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="hidden"
                      disabled={!selectedSpecies}
                      onChange={e => {
                        const file = e.target.files?.[0];
                        if (file) handleFileSelect(file);
                      }}
                    />

                    {appState === 'uploading' ? (
                      <div className="flex flex-col items-center gap-4">
                        {previewUrl && (
                          <img src={previewUrl} alt="Preview" className="w-32 h-32 object-cover rounded-xl shadow-md" />
                        )}
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                          <span className="text-sm font-semibold text-gray-700">Analyzing {uploadedFileName}...</span>
                        </div>
                        <p className="text-xs text-gray-400">Running TTA inference (3 geometric variants)</p>
                      </div>
                    ) : (
                      <>
                        <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-4">
                          <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                          </svg>
                        </div>
                        <p className="text-base font-semibold text-gray-800 mb-1">
                          {selectedSpecies ? 'Click or drag an image here' : 'Select a species first'}
                        </p>
                        <p className="text-sm text-gray-400">JPEG, PNG, or WebP — up to 10MB</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ─── RESULTS ─── */}
        {appState === 'results' && result && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className={`px-2.5 py-1 text-xs font-bold rounded-lg ${isHealthy
                    ? 'text-emerald-700 bg-emerald-100 border border-emerald-200'
                    : 'text-red-700 bg-red-100 border border-red-200'
                    }`}>
                    {isHealthy ? '✓ HEALTHY' : '⚠ DISEASE DETECTED'}
                  </span>
                  <ConfidenceBadge confidence={result.confidence} />
                  <span className="text-xs text-gray-400 font-mono">Index: {result.classIndex}</span>
                </div>
                <h2 className="text-3xl font-black text-gray-900">{result.commonName}</h2>
                <p className="text-sm text-gray-500 mt-1">{result.speciesName} — {result.diseaseName}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => exportPDF(result)}
                  className="px-4 py-2.5 bg-white text-gray-700 font-semibold text-sm rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  Export PDF
                </button>
                <button
                  onClick={handleReset}
                  className="px-5 py-2.5 bg-emerald-600 text-white font-semibold text-sm rounded-xl hover:bg-emerald-700 transition-colors shadow-md shadow-emerald-200"
                >
                  New Scan
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-[1fr_1.5fr] gap-6">
              {/* Uploaded Image */}
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                {previewUrl && (
                  <img src={previewUrl} alt="Analyzed Leaf" className="w-full aspect-square object-cover" />
                )}
                <div className="px-5 py-3 border-t border-gray-100 bg-gray-50">
                  <p className="text-xs text-gray-500 font-medium truncate">{uploadedFileName}</p>
                </div>
              </div>

              {/* Diagnosis Section */}
              <div className="space-y-4">
                {/* Symptoms */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                  <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                      </svg>
                    </span>
                    Symptoms
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{result.treatment.symptoms}</p>
                </div>

                {/* Treatment */}
                {!isHealthy && (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Cultural Control */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:border-emerald-300 transition-colors">
                      <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="w-7 h-7 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">🌱</span>
                        Cultural Control
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{result.treatment.cultural_control}</p>
                    </div>

                    {/* Chemical Control */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:border-purple-300 transition-colors">
                      <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="w-7 h-7 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">🧪</span>
                        Chemical Control
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{result.treatment.chemical_control}</p>
                    </div>

                    {/* Biological Control */}
                    {result.treatment.biological_control && (
                      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:border-teal-300 transition-colors">
                        <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                          <span className="w-7 h-7 bg-teal-100 rounded-lg flex items-center justify-center text-teal-600">🦠</span>
                          Biological Control
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{result.treatment.biological_control}</p>
                      </div>
                    )}

                    {/* Prevention */}
                    {result.treatment.prevention && (
                      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:border-amber-300 transition-colors">
                        <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                          <span className="w-7 h-7 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600">🛡️</span>
                          Prevention
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{result.treatment.prevention}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Healthy message */}
                {isHealthy && (
                  <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-8 text-center">
                    <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-200">
                      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-emerald-800 mb-2">Your crop looks healthy!</h3>
                    <p className="text-sm text-emerald-600">{result.treatment.cultural_control}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-xs text-gray-400 pb-8">
          <p>All inference runs 100% locally on your device • No data is sent to the cloud</p>
        </div>
      </main>
    </div>
  );
}

export default App;
