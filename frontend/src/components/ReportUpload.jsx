import React, { useState, useRef, useCallback } from 'react';
import ProgressStepper from './ProgressStepper';
import API_BASE from '../apiConfig';

const STEPS = ['Patient Details', 'Upload Report', 'Processing', 'Results'];

const PDF_ICON = (
  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true">
    <rect width="56" height="56" rx="14" fill="#EFF6FF"/>
    <path d="M18 12h14l10 10v22a2 2 0 01-2 2H18a2 2 0 01-2-2V14a2 2 0 012-2z"
      fill="none" stroke="#2563EB" strokeWidth="2" strokeLinejoin="round"/>
    <path d="M32 12v10h10" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinejoin="round"/>
    <line x1="22" y1="30" x2="34" y2="30" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round"/>
    <line x1="22" y1="36" x2="34" y2="36" stroke="#2563EB" strokeWidth="2" strokeLinecap="round"/>
    <line x1="22" y1="42" x2="28" y2="42" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const FILE_ICON = (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
    <rect width="40" height="40" rx="10" fill="#F0FDFA"/>
    <path d="M12 9h11l9 9v17a1.5 1.5 0 01-1.5 1.5h-18A1.5 1.5 0 0110 35V10.5A1.5 1.5 0 0112 9z"
      fill="none" stroke="#0D9488" strokeWidth="1.75" strokeLinejoin="round"/>
    <path d="M23 9v9h9" fill="none" stroke="#0D9488" strokeWidth="1.75" strokeLinejoin="round"/>
  </svg>
);

const PROCESSING_MESSAGES = [
  'Document uploaded…',
  'Extracting text from PDF…',
  'Analysing medical information…',
  'Structuring extracted results…',
  'Preparing patient record…',
];

function ProcessingScreen() {
  const [msgIdx, setMsgIdx] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => {
      setMsgIdx(i => (i < PROCESSING_MESSAGES.length - 1 ? i + 1 : i));
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      style={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--space-32)',
        padding: 'var(--space-64) var(--space-32)',
      }}
    >
      {/* Scientific ring decoration */}
      <div style={{ position: 'relative', width: 120, height: 120 }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '2px dashed #E2E8F0',
            animation: 'orbitSpin 12s linear infinite',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 12,
            borderRadius: '50%',
            border: '2px dashed #BFDBFE',
            animation: 'orbitSpin 8s linear infinite reverse',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div className="processing-spinner" />
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <h2
          style={{
            fontSize: 'var(--text-2xl)',
            fontWeight: 700,
            color: 'var(--color-navy)',
            marginBottom: 'var(--space-12)',
          }}
        >
          Analysing Your Report
        </h2>
        <p
          key={msgIdx}
          className="processing-pulse"
          style={{
            fontSize: 'var(--text-base)',
            color: 'var(--color-blue)',
            fontWeight: 500,
            minHeight: 24,
          }}
        >
          {PROCESSING_MESSAGES[msgIdx]}
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-10)',
          width: '100%',
          maxWidth: 360,
        }}
      >
        {PROCESSING_MESSAGES.map((msg, i) => (
          <div
            key={msg}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-12)',
              fontSize: 'var(--text-sm)',
              color: i <= msgIdx ? 'var(--color-teal)' : 'var(--text-muted)',
              transition: 'color 0.4s ease',
            }}
          >
            <span style={{ fontSize: 16 }}>
              {i < msgIdx ? '✓' : i === msgIdx ? '○' : '·'}
            </span>
            {msg}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ReportUpload({ patient, onResult, onBack }) {
  const [file, setFile]           = useState(null);
  const [error, setError]         = useState(null);
  const [processing, setProcessing] = useState(false);
  const [dragOver, setDragOver]   = useState(false);
  const inputRef = useRef(null);

  const acceptFile = useCallback((selected) => {
    if (!selected) return;
    if (selected.type !== 'application/pdf') {
      setError('Only PDF files are accepted. Please choose a .pdf file.');
      setFile(null);
      return;
    }
    setFile(selected);
    setError(null);
  }, []);

  const handleChange   = (e)  => acceptFile(e.target.files[0]);
  const handleRemove   = ()   => { setFile(null); setError(null); };
  const handleDragOver = (e)  => { e.preventDefault(); setDragOver(true); };
  const handleDragLeave= ()   => setDragOver(false);
  const handleDrop     = (e)  => {
    e.preventDefault();
    setDragOver(false);
    acceptFile(e.dataTransfer.files[0]);
  };

  const handleSubmit = async () => {
    if (!file) return;
    setProcessing(true);
    setError(null);
    try {
      // Step 1 — extract text from PDF
      const formData = new FormData();
      formData.append('report', file);
      const processRes  = await fetch(`${API_BASE}/api/reports/process`, { method: 'POST', body: formData });
      const processData = await processRes.json();
      if (!processData.success) { setError(processData.error || 'PDF processing failed'); return; }

      // Step 2 — AI extraction
      const extractRes  = await fetch(`${API_BASE}/api/reports/extract`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: processData.text }),
      });
      const extractData = await extractRes.json();
      if (!extractData.success) { setError(extractData.error || 'AI extraction failed'); return; }

      onResult(extractData.data, file.name);
    } catch {
      setError('A network error occurred while processing your report. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  if (processing) {
    return (
      <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: 'var(--space-48) var(--space-32)' }}>
        <ProgressStepper steps={STEPS} current={3} />
        <ProcessingScreen />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: 'var(--space-48) var(--space-32)' }}>
      <ProgressStepper steps={STEPS} current={2} />

      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-40)' }}>
          <span className="eyebrow">Step 2 of 4</span>
          <h2
            style={{
              fontSize: 'var(--text-3xl)',
              fontWeight: 800,
              color: 'var(--color-navy)',
              marginBottom: 'var(--space-8)',
            }}
          >
            Upload Medical Report
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-base)' }}>
            Upload the PDF medical report you would like MedLens to analyse.
            {patient?.name && (
              <> Patient: <strong style={{ color: 'var(--color-navy)' }}>{patient.name}</strong>.</>
            )}
          </p>
        </div>

        <div className="card" style={{ padding: 'var(--space-40)' }}>
          {/* Drop zone */}
          {!file && (
            <div
              className={`dropzone${dragOver ? ' drag-over' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
              role="button"
              tabIndex={0}
              aria-label="Upload PDF file"
              onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
            >
              <div style={{ marginBottom: 'var(--space-20)' }}>{PDF_ICON}</div>
              <h3
                style={{
                  fontSize: 'var(--text-lg)',
                  fontWeight: 700,
                  color: 'var(--color-navy)',
                  marginBottom: 'var(--space-8)',
                }}
              >
                Drag &amp; drop your medical report here
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-20)' }}>
                or click to browse your files
              </p>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
              >
                Choose PDF File
              </button>
              <p
                style={{
                  marginTop: 'var(--space-16)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--text-muted)',
                }}
              >
                Supported format: PDF · Max recommended size: 20 MB
              </p>
              <input
                ref={inputRef}
                id="report-upload"
                type="file"
                accept="application/pdf"
                style={{ display: 'none' }}
                onChange={handleChange}
              />
            </div>
          )}

          {/* Selected file state */}
          {file && (
            <div
              className="dropzone dropzone-file"
              style={{ cursor: 'default' }}
            >
              <div style={{ marginBottom: 'var(--space-16)' }}>{FILE_ICON}</div>
              <h3
                style={{
                  fontSize: 'var(--text-base)',
                  fontWeight: 700,
                  color: 'var(--color-navy)',
                  marginBottom: 'var(--space-4)',
                  wordBreak: 'break-all',
                }}
              >
                {file.name}
              </h3>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-24)' }}>
                {(file.size / 1024 / 1024).toFixed(2)} MB · PDF
              </p>
              <div style={{ display: 'flex', gap: 'var(--space-12)', justifyContent: 'center' }}>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={handleRemove}
                  style={{ color: 'var(--color-red)', border: '1px solid #FECACA', borderRadius: 'var(--radius-md)' }}
                >
                  Remove
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  Analyse Report →
                </button>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div
              style={{
                marginTop: 'var(--space-16)',
                padding: 'var(--space-12) var(--space-16)',
                backgroundColor: 'var(--color-red-light)',
                border: '1px solid #FECACA',
                borderRadius: 'var(--radius-md)',
                color: 'var(--color-red)',
                fontSize: 'var(--text-sm)',
              }}
            >
              ⚠ {error}
            </div>
          )}
        </div>

        {/* Security note */}
        <p
          style={{
            textAlign: 'center',
            marginTop: 'var(--space-20)',
            fontSize: 'var(--text-xs)',
            color: 'var(--text-muted)',
          }}
        >
          Your report is sent only to the local MedLens processing server and is not stored.
        </p>

        {/* Back navigation */}
        <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: 'var(--space-24)' }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onBack}
            style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-8)' }}
          >
            ← Back to Patient Details
          </button>
        </div>
      </div>
    </div>
  );
}
