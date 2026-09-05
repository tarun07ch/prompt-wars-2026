import React from 'react';
import ProgressStepper from '../components/ProgressStepper';

const STEPS = ['Patient Details', 'Upload Report', 'Processing', 'Results'];

function statusMeta(status) {
  switch (status) {
    case 'HIGH':           return { label: 'HIGH',           cls: 'status-badge status-high' };
    case 'LOW':            return { label: 'LOW',            cls: 'status-badge status-low' };
    case 'NORMAL':         return { label: 'NORMAL',         cls: 'status-badge status-normal' };
    case 'NOT_DETERMINED': return { label: 'NOT DETERMINED', cls: 'status-badge status-not-determined' };
    default:               return { label: status || '—',    cls: 'status-badge status-not-determined' };
  }
}

function formatRange(referenceRange) {
  if (!referenceRange) return 'Reference range not provided';
  const lo = referenceRange.low  ?? null;
  const hi = referenceRange.high ?? null;
  if (lo === null && hi === null) return 'Reference range not provided';
  if (lo !== null && hi !== null) return `${lo} – ${hi}`;
  if (lo !== null) return `≥ ${lo}`;
  return `≤ ${hi}`;
}

export default function Results({ data, patientName, fileName, onNewAnalysis, savedAt, viewMode, onBackToDashboard }) {
  const { labResults = [], observations = [] } = data || {};
  const hasResults      = labResults.length > 0;
  const hasObservations = observations.length > 0;

  const abnormalCount = labResults.filter(r => r.status === 'HIGH' || r.status === 'LOW').length;
  const normalCount   = labResults.filter(r => r.status === 'NORMAL').length;

  return (
    <div
      style={{
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
        padding: 'var(--space-48) var(--space-32) var(--space-80)',
      }}
    >
      {/* ── Saved banner ─────────────────────────────────────── */}
      {savedAt && (
        <div
          style={{
            display: 'flex', alignItems: 'center', gap: 'var(--space-12)',
            padding: 'var(--space-12) var(--space-20)',
            background: '#ECFDF5', border: '1px solid #6EE7B7',
            borderRadius: 'var(--radius-lg)', marginBottom: 'var(--space-24)',
          }}
        >
          <span style={{ fontSize: 18 }}>✅</span>
          <span style={{ fontSize: 'var(--text-sm)', color: '#065F46', fontWeight: 600 }}>
            {viewMode ? 'Viewing saved record from' : 'Saved to your medical records on'}{' '}
            {new Date(savedAt).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}
          </span>
          {onBackToDashboard && (
            <button
              onClick={onBackToDashboard}
              style={{
                marginLeft: 'auto', background: 'none', border: '1px solid #6EE7B7',
                borderRadius: 'var(--radius-md)', padding: '4px 14px',
                fontSize: 'var(--text-xs)', fontWeight: 700, color: '#065F46',
                cursor: 'pointer', fontFamily: 'var(--font-sans)',
              }}
            >
              ← Dashboard
            </button>
          )}
        </div>
      )}

      {!viewMode && <ProgressStepper steps={STEPS} current={4} />}

      {/* ── Page header ─────────────────────────────────────── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 'var(--space-24)',
          marginBottom: 'var(--space-40)',
        }}
      >
        <div>
          <span className="eyebrow">Step 4 of 4</span>
          <h2
            style={{
              fontSize: 'var(--text-3xl)',
              fontWeight: 800,
              color: 'var(--color-navy)',
              marginBottom: 'var(--space-8)',
            }}
          >
            Structured Medical Record
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-base)' }}>
            Information extracted from the provided medical report.
            {patientName && (
              <> Patient: <strong style={{ color: 'var(--color-navy)' }}>{patientName}</strong>.</>
            )}
          </p>
        </div>

        {/* Summary pills */}
        <div style={{ display: 'flex', gap: 'var(--space-12)', flexWrap: 'wrap', alignItems: 'center' }}>
          {hasResults && (
            <>
              <div
                style={{
                  padding: 'var(--space-8) var(--space-16)',
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                }}
              >
                {labResults.length} Tests
              </div>
              {normalCount > 0 && (
                <span className="status-badge status-normal">
                  {normalCount} Normal
                </span>
              )}
              {abnormalCount > 0 && (
                <span className="status-badge status-high">
                  {abnormalCount} Abnormal
                </span>
              )}
            </>
          )}
        </div>
      </div>

      {/* ── Source / provenance strip ─────────────────────────── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-12)',
          padding: 'var(--space-12) var(--space-20)',
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          marginBottom: 'var(--space-32)',
        }}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path d="M4 2h7l5 5v9a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="#2563EB" strokeWidth="1.5" strokeLinejoin="round"/>
          <path d="M11 2v5h5" stroke="#2563EB" strokeWidth="1.5" strokeLinejoin="round"/>
        </svg>
        <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', fontWeight: 500 }}>
          Source:
        </span>
        <span className="source-pill">
          Medical Report{fileName ? ` — ${fileName}` : ''}
        </span>
        <span
          style={{
            marginLeft: 'auto',
            fontSize: 'var(--text-xs)',
            color: 'var(--text-muted)',
          }}
        >
          All values extracted directly from uploaded document
        </span>
      </div>

      {/* ── Lab Results Table ─────────────────────────────────── */}
      <section style={{ marginBottom: 'var(--space-32)' }}>
        <h3
          style={{
            fontSize: 'var(--text-xl)',
            fontWeight: 700,
            color: 'var(--color-navy)',
            marginBottom: 'var(--space-16)',
          }}
        >
          Laboratory Results
        </h3>

        {hasResults ? (
          <div
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <div style={{ overflowX: 'auto' }}>
              <table className="results-table" style={{ minWidth: 820 }}>
                <thead>
                  <tr>
                    <th>Test</th>
                    <th style={{ textAlign: 'right' }}>Value</th>
                    <th>Unit</th>
                    <th>Reference Range</th>
                    <th style={{ textAlign: 'center' }}>Status</th>
                    <th>Source</th>
                  </tr>
                </thead>
                <tbody>
                  {labResults.map((lr, idx) => {
                    const { label, cls } = statusMeta(lr.status);
                    return (
                      <tr key={`${lr.testName || 'r'}-${idx}`}>
                        <td style={{ fontWeight: 600, color: 'var(--color-navy)' }}>
                          {lr.testName || 'Not available'}
                        </td>
                        <td className="col-value">
                          {lr.value !== undefined && lr.value !== null ? lr.value : '—'}
                        </td>
                        <td style={{ color: 'var(--text-secondary)' }}>
                          {lr.unit || '—'}
                        </td>
                        <td
                          style={{
                            fontSize: 'var(--text-xs)',
                            fontFamily: 'var(--font-mono)',
                            color: 'var(--text-secondary)',
                          }}
                        >
                          {formatRange(lr.referenceRange)}
                        </td>
                        <td className="col-status">
                          <span className={cls}>{label}</span>
                        </td>
                        <td>
                          <span className="source-pill" style={{ fontSize: '0.7rem' }}>
                            Medical Report
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div
            className="card"
            style={{ padding: 'var(--space-40)', textAlign: 'center', color: 'var(--text-secondary)' }}
          >
            <p>No laboratory results were found in the provided report.</p>
          </div>
        )}
      </section>

      {/* ── Observations ─────────────────────────────────────── */}
      {hasObservations && (
        <section style={{ marginBottom: 'var(--space-32)' }}>
          <h3
            style={{
              fontSize: 'var(--text-xl)',
              fontWeight: 700,
              color: 'var(--color-navy)',
              marginBottom: 'var(--space-16)',
            }}
          >
            Report Observations
          </h3>
          <div
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            {observations.map((obs, i) => (
              <div key={i} className="observation-item">
                <div className="observation-dot" />
                <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.7, color: 'var(--text-primary)' }}>
                  {obs}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Patient-Friendly Summary header ──────────────────── */}
      <section style={{ marginBottom: 'var(--space-32)' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-12)',
            marginBottom: 'var(--space-16)',
          }}
        >
          <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--color-navy)' }}>
            Patient-Friendly Summary
          </h3>
          <span
            style={{
              padding: 'var(--space-4) var(--space-10)',
              background: '#EFF6FF',
              border: '1px solid #BFDBFE',
              borderRadius: 'var(--radius-full)',
              fontSize: 'var(--text-xs)',
              fontWeight: 700,
              color: 'var(--color-blue)',
              letterSpacing: '0.04em',
            }}
          >
            AI-Generated
          </span>
        </div>
        <div
          className="card"
          style={{ padding: 'var(--space-24)', background: 'var(--color-surface-raised)' }}
        >
          {hasResults ? (
            <p style={{ fontSize: 'var(--text-base)', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
              {abnormalCount > 0
                ? `This report contains ${labResults.length} test result${labResults.length > 1 ? 's' : ''}. ${abnormalCount} result${abnormalCount > 1 ? 's are' : ' is'} outside the reference range provided in the report. ${normalCount > 0 ? `${normalCount} result${normalCount > 1 ? 's' : ''} fall within the normal reference range.` : ''} Please review the results above with a qualified healthcare professional.`
                : `This report contains ${labResults.length} test result${labResults.length > 1 ? 's' : ''}, all of which fall within the reference ranges provided in the report.`}
            </p>
          ) : (
            <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)' }}>
              No structured lab results were extracted from this report. Please review the observations section or consult the original document.
            </p>
          )}
        </div>
      </section>

      {/* ── Disclaimer ───────────────────────────────────────── */}
      <div className="disclaimer">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, marginTop: 1 }} aria-hidden="true">
          <path d="M10 2L2 17h16L10 2z" stroke="#D97706" strokeWidth="1.5" strokeLinejoin="round"/>
          <line x1="10" y1="8" x2="10" y2="12" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="10" cy="14.5" r="0.75" fill="#D97706"/>
        </svg>
        <p style={{ margin: 0, color: 'inherit' }}>
          <strong>Important:</strong> AI-generated information is for information extraction and review only and does not constitute a diagnosis or treatment recommendation. Always consult a qualified healthcare professional before making any medical decisions.
        </p>
      </div>

      {/* ── Actions ──────────────────────────────────────────── */}
      <div
        style={{
          marginTop: 'var(--space-40)',
          padding: 'var(--space-32)',
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-xl)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 'var(--space-16)',
        }}
      >
        <div>
          <p style={{ fontWeight: 700, color: 'var(--color-navy)', marginBottom: 'var(--space-4)', fontSize: 'var(--text-base)' }}>
            What would you like to do next?
          </p>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', margin: 0 }}>
            Return to your dashboard or start a fresh analysis.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-12)', flexWrap: 'wrap' }}>
          {onBackToDashboard && (
            <button
              className="btn btn-secondary btn-lg"
              onClick={onBackToDashboard}
              style={{ whiteSpace: 'nowrap' }}
            >
              ← Dashboard
            </button>
          )}
          <button
            className="btn btn-primary btn-lg"
            onClick={onNewAnalysis}
            style={{ whiteSpace: 'nowrap' }}
          >
            ＋ New Analysis
          </button>
        </div>
      </div>
    </div>
  );
}