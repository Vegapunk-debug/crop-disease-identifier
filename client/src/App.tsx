import { useState, useRef, useEffect } from 'react';
import { jsPDF } from 'jspdf';

const API_URL = window.location.port === '5173' ? 'http://localhost:3001' : '';

// ─── Types ───────────────────────────────────────────────────────────────────
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

// ─── Icons (Lucide-style SVGs) ───────────────────────────────────────────────
const Icons = {
  leaf: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  ),
  upload: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  ),
  search: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
    </svg>
  ),
  download: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
  check: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  alertTriangle: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <path d="M12 9v4" /><path d="M12 17h.01" />
    </svg>
  ),
  x: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18" /><path d="m6 6 12 12" />
    </svg>
  ),
  flask: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2" />
      <path d="M8.5 2h7" /><path d="M7 16.5h10" />
    </svg>
  ),
  sprout: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 20h10" /><path d="M10 20c5.5-2.5.8-6.4 3-10" />
      <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8Z" />
      <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2Z" />
    </svg>
  ),
  microscope: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 18h8" /><path d="M3 22h18" /><path d="M14 22a7 7 0 1 0 0-14h-1" />
      <path d="M9 14h2" /><path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z" />
      <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" />
    </svg>
  ),
  shield: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  loader: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin">
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  ),
};

// ─── PDF Export ──────────────────────────────────────────────────────────────
async function exportPDF(result: DiagnosisResponse, imageDataUrl: string | null) {
  const doc = new jsPDF();
  const margin = 20;
  let y = margin;
  const pageWidth = doc.internal.pageSize.getWidth();
  const contentWidth = pageWidth - margin * 2;

  // ── Header bar
  doc.setFillColor(22, 163, 74); // emerald-600
  doc.rect(0, 0, pageWidth, 12, 'F');
  y = 24;

  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(17, 24, 39);
  doc.text('Crop Disease Diagnosis Report', margin, y);
  y += 7;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(107, 114, 128);
  doc.text(`Report generated on ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at ${new Date().toLocaleTimeString()}`, margin, y);
  y += 4;
  doc.text('Analysis performed using on-device AI inference (Swin Transformer V2 + ONNX Runtime)', margin, y);
  y += 8;

  doc.setDrawColor(229, 231, 235);
  doc.setLineWidth(0.4);
  doc.line(margin, y, pageWidth - margin, y);
  y += 10;

  doc.setTextColor(17, 24, 39);

  // ── Image section
  if (imageDataUrl) {
    try {
      const imgWidth = 50;
      const imgHeight = 50;
      doc.addImage(imageDataUrl, 'JPEG', margin, y, imgWidth, imgHeight);

      // Summary next to image
      const textX = margin + imgWidth + 10;
      const textWidth = contentWidth - imgWidth - 10;
      let iy = y + 2;

      doc.setFontSize(13);
      doc.setFont('helvetica', 'bold');
      doc.text(result.commonName, textX, iy);
      iy += 7;

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(107, 114, 128);
      doc.text(`Species: ${result.speciesName}`, textX, iy);
      iy += 5;
      doc.text(`Condition: ${result.diseaseName}`, textX, iy);
      iy += 5;

      const isHealthy = result.diseaseKey?.includes('healthy');
      if (isHealthy) {
        doc.setTextColor(22, 163, 74);
        doc.text('Status: Healthy — No disease detected', textX, iy);
      } else {
        doc.setTextColor(220, 38, 38);
        doc.text('Status: Disease Detected — Treatment recommended', textX, iy);
      }
      iy += 5;

      doc.setTextColor(107, 114, 128);
      doc.text(`AI Confidence: ${result.confidence}%`, textX, iy);
      iy += 5;

      const wrappedSymptoms = doc.splitTextToSize(`Symptoms: ${result.treatment.symptoms}`, textWidth);
      doc.setTextColor(55, 65, 81);
      for (const line of wrappedSymptoms.slice(0, 3)) {
        doc.text(line, textX, iy);
        iy += 4.5;
      }

      y = Math.max(y + imgHeight + 8, iy + 4);
    } catch {
      y += 4;
    }
  } else {
    // No image — plain text summary
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(result.commonName, margin, y);
    y += 7;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(107, 114, 128);
    doc.text(`Species: ${result.speciesName}  |  Condition: ${result.diseaseName}  |  Confidence: ${result.confidence}%`, margin, y);
    y += 10;
  }

  doc.setTextColor(17, 24, 39);

  // Helper for sections
  const addSection = (title: string, body: string) => {
    if (!body) return;
    if (y > 258) { doc.addPage(); y = margin; }

    doc.setFillColor(249, 250, 251);
    doc.roundedRect(margin, y - 4, contentWidth, 7, 1, 1, 'F');
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(55, 65, 81);
    doc.text(title, margin + 3, y);
    y += 7;

    doc.setFontSize(9.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(75, 85, 99);
    const lines = doc.splitTextToSize(body, contentWidth - 6);
    for (const line of lines) {
      if (y > 280) { doc.addPage(); y = margin; }
      doc.text(line, margin + 3, y);
      y += 4.5;
    }
    y += 5;
  };

  const isHealthy = result.diseaseKey?.includes('healthy');

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
  y += 2;
  doc.setDrawColor(229, 231, 235);
  doc.setLineWidth(0.3);
  doc.line(margin, y, pageWidth - margin, y);
  y += 5;
  doc.setFontSize(7.5);
  doc.setTextColor(156, 163, 175);
  doc.text('Crop Disease Identifier  |  Swin Transformer V2  |  ONNX Runtime  |  100% Offline Analysis', margin, y);
  y += 3.5;
  doc.text('This report was generated entirely on-device. No data was transmitted externally.', margin, y);

  const filename = `diagnosis-${result.speciesName.toLowerCase()}-${result.diseaseName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.pdf`;
  doc.save(filename);
}

// ─── Confidence Badge ────────────────────────────────────────────────────────
function ConfidenceBadge({ confidence }: { confidence: number }) {
  let bg = 'bg-red-50 text-red-700 border-red-200';
  let label = 'Low Confidence';
  if (confidence >= 80) {
    bg = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    label = 'High Confidence';
  } else if (confidence >= 50) {
    bg = 'bg-amber-50 text-amber-700 border-amber-200';
    label = 'Moderate Confidence';
  }
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md border ${bg}`}>
      {label}: {confidence}%
    </span>
  );
}

// ─── Treatment Card ──────────────────────────────────────────────────────────
function TreatmentCard({ title, content, icon, iconBg, hoverBorder }: {
  title: string;
  content: string;
  icon: React.ReactNode;
  iconBg: string;
  hoverBorder: string;
}) {
  return (
    <div className={`bg-white rounded-xl border border-gray-200 p-5 transition-all duration-200 hover:shadow-md ${hoverBorder}`}>
      <div className="flex items-center gap-2.5 mb-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${iconBg}`}>
          {icon}
        </div>
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed">{content}</p>
    </div>
  );
}

// ─── Main App ────────────────────────────────────────────────────────────────
function App() {
  const [species, setSpecies] = useState<SpeciesInfo[]>([]);
  const [selectedSpecies, setSelectedSpecies] = useState('');
  const [appState, setAppState] = useState<AppState>('select');
  const [result, setResult] = useState<DiagnosisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch(`${API_URL}/api/species`)
      .then(res => res.json())
      .then(data => setSpecies(data.species || []))
      .catch(err => {
        console.error('Failed to load species:', err);
        setError('Could not connect to the server. Please ensure the backend is running.');
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

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    // Convert to base64 for PDF embedding
    const reader = new FileReader();
    reader.onload = () => setImageDataUrl(reader.result as string);
    reader.readAsDataURL(file);

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
          setError(`The uploaded image appears to be out of focus (sharpness: ${errData.variance}, required: ${errData.threshold}). Please upload a clearer photo.`);
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
    setImageDataUrl(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setUploadedFileName('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const isHealthy = result?.diseaseKey?.includes('healthy');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Header ── */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white">
              {Icons.leaf}
            </div>
            <span className="text-sm font-semibold text-gray-900">Crop Disease Identifier</span>
          </div>
          <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1.5 rounded-md">
            Offline
          </span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* ── Error Banner ── */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg px-4 py-3 flex items-start gap-3">
            <span className="text-red-500 mt-0.5 shrink-0">{Icons.alertTriangle}</span>
            <p className="text-sm text-red-700 flex-1">{error}</p>
            <button onClick={() => setError(null)} className="text-red-400 hover:text-red-600 shrink-0">
              {Icons.x}
            </button>
          </div>
        )}

        {/* ── Select & Upload ── */}
        {(appState === 'select' || appState === 'uploading') && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">New Diagnosis</h2>
              <p className="text-sm text-gray-500 mt-1">Select the crop type, then upload a clear photograph of the affected leaf.</p>
            </div>

            {/* Species Grid */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Crop Species</p>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                  {species.map(sp => (
                    <button
                      key={sp.key}
                      onClick={() => { setSelectedSpecies(sp.key); setError(null); }}
                      className={`px-3 py-2.5 rounded-lg border text-sm font-medium text-left transition-all duration-150 ${selectedSpecies === sp.key
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-800 ring-1 ring-emerald-600'
                        : 'border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                    >
                      {sp.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Upload */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Upload Image</p>
              </div>
              <div className="p-6">
                <div
                  onDrop={handleDrop}
                  onDragOver={e => e.preventDefault()}
                  onClick={() => {
                    if (!selectedSpecies) { setError('Please select a crop species first.'); return; }
                    fileInputRef.current?.click();
                  }}
                  className={`border-2 border-dashed rounded-xl flex flex-col items-center justify-center py-16 transition-all duration-200 ${selectedSpecies
                    ? 'border-gray-300 hover:border-emerald-400 hover:bg-emerald-50/30 cursor-pointer'
                    : 'border-gray-200 bg-gray-50/50 opacity-50 cursor-not-allowed'
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
                        <img src={previewUrl} alt="Preview" className="w-28 h-28 object-cover rounded-lg border border-gray-200" />
                      )}
                      <div className="flex items-center gap-2.5 text-emerald-700">
                        {Icons.loader}
                        <span className="text-sm font-medium">Analyzing image...</span>
                      </div>
                      <p className="text-xs text-gray-400">Running TTA ensemble inference</p>
                    </div>
                  ) : (
                    <>
                      <div className="text-gray-400 mb-3">{Icons.upload}</div>
                      <p className="text-sm font-medium text-gray-700">
                        {selectedSpecies ? 'Click to upload or drag and drop' : 'Select a crop species above'}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">JPEG, PNG, or WebP up to 10 MB</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Results ── */}
        {appState === 'results' && result && (
          <div className="space-y-6 animate-in">
            {/* Result Header */}
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md border ${isHealthy
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-red-50 text-red-700 border-red-200'
                    }`}>
                    {isHealthy ? 'Healthy' : 'Disease Detected'}
                  </span>
                  <ConfidenceBadge confidence={result.confidence} />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">{result.commonName}</h2>
                <p className="text-sm text-gray-500 mt-0.5">{result.speciesName} — {result.diseaseName}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => exportPDF(result, imageDataUrl)}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {Icons.download}
                  Export PDF
                </button>
                <button
                  onClick={handleReset}
                  className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  New Scan
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-[320px_1fr] gap-6">
              {/* Image */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                {previewUrl && (
                  <img src={previewUrl} alt="Analyzed leaf" className="w-full aspect-square object-cover" />
                )}
                <div className="px-4 py-3 border-t border-gray-100">
                  <p className="text-xs text-gray-500 font-medium truncate">{uploadedFileName}</p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Symptoms */}
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                      {Icons.search}
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900">Symptoms</h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{result.treatment.symptoms}</p>
                </div>

                {/* Treatment Cards */}
                {!isHealthy && (
                  <div className="grid sm:grid-cols-2 gap-4">
                    <TreatmentCard
                      title="Cultural Control"
                      content={result.treatment.cultural_control}
                      icon={Icons.sprout}
                      iconBg="bg-emerald-50 text-emerald-600"
                      hoverBorder="hover:border-emerald-200"
                    />
                    <TreatmentCard
                      title="Chemical Control"
                      content={result.treatment.chemical_control}
                      icon={Icons.flask}
                      iconBg="bg-violet-50 text-violet-600"
                      hoverBorder="hover:border-violet-200"
                    />
                    {result.treatment.biological_control && (
                      <TreatmentCard
                        title="Biological Control"
                        content={result.treatment.biological_control}
                        icon={Icons.microscope}
                        iconBg="bg-teal-50 text-teal-600"
                        hoverBorder="hover:border-teal-200"
                      />
                    )}
                    {result.treatment.prevention && (
                      <TreatmentCard
                        title="Prevention"
                        content={result.treatment.prevention}
                        icon={Icons.shield}
                        iconBg="bg-amber-50 text-amber-600"
                        hoverBorder="hover:border-amber-200"
                      />
                    )}
                  </div>
                )}

                {/* Healthy State */}
                {isHealthy && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-8 text-center">
                    <div className="w-14 h-14 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                      {Icons.check}
                    </div>
                    <h3 className="text-lg font-semibold text-emerald-900 mb-2">No disease detected</h3>
                    <p className="text-sm text-emerald-700 max-w-md mx-auto">{result.treatment.cultural_control}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-16 text-center text-xs text-gray-400 pb-8">
          <p>All analysis runs locally on your device. No data is transmitted externally.</p>
        </div>
      </main>
    </div>
  );
}

export default App;
