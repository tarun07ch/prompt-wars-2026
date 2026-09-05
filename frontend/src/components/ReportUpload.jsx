import React, { useState } from 'react';

function ReportUpload({ patient }) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      if (selected.type !== 'application/pdf') {
        setError('Only PDF files are accepted');
        setFile(null);
        return;
      }
      setFile(selected);
      setError(null);
    }
  };

  const handleRemove = () => {
    setFile(null);
    setError(null);
    setResult(null);
  };

  const handleSubmit = async () => {
    if (!file) return;
    setProcessing(true);
    setError(null);
    setResult(null);
    try {
      const formData = new FormData();
      formData.append('report', file);
      const response = await fetch('/api/reports/process', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        setResult(data.text);
      } else {
        setError(data.error || 'Processing failed');
      }
    } catch (e) {
      setError('Network error while processing');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <section>
      <h2 style={{ marginBottom: 'var(--space-16)' }}>Upload Medical Report</h2>
      <p>Supported format: PDF</p>
      <div style={{ border: '2px dashed var(--color-border)', padding: 'var(--space-24)', textAlign: 'center', marginTop: 'var(--space-16)' }}>
        {!file && !processing && (
          <>
            <label htmlFor="report-upload" style={{ cursor: 'pointer', color: 'var(--color-primary)' }}>
              Click to select a PDF file or drag here
            </label>
            <input
              id="report-upload"
              type="file"
              accept="application/pdf"
              style={{ display: 'none' }}
              onChange={handleChange}
            />
          </>
        )}
        {file && !processing && (
          <div>
            <p>Selected file: <strong>{file.name}</strong></p>
            <button type="button" onClick={handleRemove} style={{ marginRight: 'var(--space-8)' }}>
              Remove / Replace
            </button>
            <button type="button" onClick={handleSubmit} disabled={!file}>
              Ready to Process
            </button>
          </div>
        )}
        {processing && (
          <p>Processing… please wait.</p>
        )}
        {error && <div className="error" style={{ marginTop: 'var(--space-8)' }}>{error}</div>}
        {result && (
          <div style={{ marginTop: 'var(--space-8)', whiteSpace: 'pre-wrap', textAlign: 'left' }}>
            <h3>Extracted Text</h3>
            <p>{result}</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default ReportUpload;
