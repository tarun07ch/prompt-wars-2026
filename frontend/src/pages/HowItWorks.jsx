import React from 'react';

const BACK_ARROW = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const STEPS = [
  {
    number: '01',
    title: 'Enter Patient Information',
    summary: 'Provide basic patient context before uploading a report.',
    detail: 'You start by entering foundational patient details — name, age, sex, current symptoms, known conditions, allergies, and medications. This information is never stored or transmitted anywhere. It stays only in your browser session and helps contextualise the extracted data.',
    note: 'Required fields are marked. Only name, age, and sex are mandatory.',
    color: '#EFF6FF',
    border: '#BFDBFE',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <circle cx="14" cy="10" r="5" stroke="#2563EB" strokeWidth="2"/>
        <path d="M5 23c0-5 4-8 9-8s9 3 9 8" stroke="#2563EB" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Upload Your Medical Report',
    summary: 'Drag and drop or select your PDF report file.',
    detail: 'Upload a PDF of the medical report you want to analyse. The file is sent to the local MedLens backend server running on your machine. It is not uploaded to any external cloud storage and is not retained after processing completes.',
    note: 'Supported format: PDF. Maximum recommended size: 20 MB.',
    color: '#F0FDFA',
    border: '#99F6E4',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M6 5h11l7 7v13a1 1 0 01-1 1H6a1 1 0 01-1-1V6a1 1 0 011-1z" stroke="#0D9488" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M17 5v7h7" stroke="#0D9488" strokeWidth="2" strokeLinejoin="round"/>
        <line x1="10" y1="16" x2="18" y2="16" stroke="#0D9488" strokeWidth="2" strokeLinecap="round"/>
        <line x1="10" y1="20" x2="15" y2="20" stroke="#0D9488" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Text Extraction',
    summary: 'MedLens extracts raw text from the PDF.',
    detail: 'The backend uses a PDF parsing library to extract all readable text from your document. This text is the raw material that gets sent to the AI model. If your PDF contains scanned images rather than embedded text, extraction quality will depend on the scan quality.',
    note: 'Text-based PDFs work best. Image-only scans may have reduced accuracy.',
    color: '#FFFBEB',
    border: '#FDE68A',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="4" y="4" width="20" height="20" rx="3" stroke="#D97706" strokeWidth="2"/>
        <line x1="9" y1="10" x2="19" y2="10" stroke="#D97706" strokeWidth="2" strokeLinecap="round"/>
        <line x1="9" y1="14" x2="19" y2="14" stroke="#D97706" strokeWidth="2" strokeLinecap="round"/>
        <line x1="9" y1="18" x2="14" y2="18" stroke="#D97706" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: '04',
    title: 'AI-Powered Extraction',
    summary: 'Gemini reads the text and structures laboratory results.',
    detail: 'The extracted text is sent to Google Gemini with a strict prompt instructing it to identify laboratory test results, their values, units, and any reference ranges explicitly present in the report. The AI is explicitly instructed NOT to invent reference ranges, NOT to diagnose, and NOT to recommend treatment.',
    note: 'Gemini only uses reference ranges printed in the report — never from external databases.',
    color: '#EFF6FF',
    border: '#BFDBFE',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <circle cx="14" cy="14" r="9" stroke="#2563EB" strokeWidth="2"/>
        <path d="M10 14l3 3 5-6" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    number: '05',
    title: 'Structured Results',
    summary: 'Results are presented in a clear, readable table.',
    detail: 'The structured extraction is displayed as a table showing each test, its value, unit, reference range (only if provided in the report), and a status indicator (NORMAL / HIGH / LOW / NOT DETERMINED). Every row shows its source as "Medical Report" so you always know where the data came from.',
    note: 'Status is determined only by comparing the reported value with the range stated in the report.',
    color: '#F0FDFA',
    border: '#99F6E4',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="4" y="4" width="20" height="20" rx="3" stroke="#0D9488" strokeWidth="2"/>
        <line x1="4" y1="11" x2="24" y2="11" stroke="#0D9488" strokeWidth="2"/>
        <line x1="4" y1="17" x2="24" y2="17" stroke="#0D9488" strokeWidth="2"/>
        <line x1="12" y1="11" x2="12" y2="24" stroke="#0D9488" strokeWidth="2"/>
      </svg>
    ),
  },
  {
    number: '06',
    title: 'Human Review',
    summary: 'You review the results — MedLens never acts on your behalf.',
    detail: 'MedLens stops at extraction. It presents information from your report in a structured format so that you — or a healthcare professional — can review it accurately. MedLens does not make decisions, recommendations, or diagnoses. It is an information organisation tool.',
    note: 'Always consult a qualified healthcare professional before making any medical decisions.',
    color: '#FEF2F2',
    border: '#FECACA',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M14 4l2.5 5 5.5.8-4 3.9.9 5.5L14 17l-4.9 2.2.9-5.5L6 9.8 11.5 9z" stroke="#DC2626" strokeWidth="2" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

const FAQ = [
  {
    q: 'Does MedLens store my medical report?',
    a: 'No. The PDF is processed in memory on the local backend server and is never written to disk or transmitted to external storage. Once the response is sent, the data is gone.',
  },
  {
    q: 'Can MedLens diagnose a condition?',
    a: 'No. MedLens is an information extraction tool. It structures information already present in your report. It does not interpret results clinically, does not diagnose conditions, and does not recommend medications or treatments.',
  },
  {
    q: 'What if my report has no reference ranges?',
    a: 'If the report does not explicitly provide a reference range for a test, MedLens marks the status as NOT DETERMINED. It never uses external or assumed reference ranges.',
  },
  {
    q: 'What types of PDFs work best?',
    a: 'Text-based PDFs (where you can select and copy text) work best. Image-only scans (photographed or faxed documents) may have reduced accuracy because PDF text extraction depends on embedded text characters.',
  },
  {
    q: 'Is my data sent to Google?',
    a: 'The extracted text from your PDF is sent to the Google Gemini API for AI analysis. No patient names or personal identifiers are sent — only the clinical text content of the report. Please review Google\'s data usage policies for the Gemini API.',
  },
];

export default function HowItWorks({ onStart, onBack }) {
  const [openFaq, setOpenFaq] = React.useState(null);

  return (
    <div>
      {/* ── Page Header ────────────────────────────────────── */}
      <div
        style={{
          background: 'var(--color-navy)',
          padding: 'var(--space-80) 0 var(--space-64)',
        }}
      >
        <div className="container">
          <button
            onClick={onBack}
            className="btn btn-ghost"
            style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 'var(--space-24)', display: 'flex', alignItems: 'center', gap: 'var(--space-8)', padding: 0 }}
          >
            {BACK_ARROW} Back to Home
          </button>
          <span
            style={{
              display: 'inline-block',
              fontSize: 'var(--text-xs)',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#93C5FD',
              marginBottom: 'var(--space-16)',
            }}
          >
            How It Works
          </span>
          <h1
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 800,
              color: '#fff',
              letterSpacing: '-0.03em',
              marginBottom: 'var(--space-16)',
              maxWidth: 640,
            }}
          >
            A transparent, step-by-step pipeline you can trust.
          </h1>
          <p
            style={{
              fontSize: 'var(--text-lg)',
              color: 'rgba(255,255,255,0.65)',
              maxWidth: 560,
              lineHeight: 1.7,
            }}
          >
            MedLens follows a clear, auditable process. Nothing is hidden. Here is exactly what happens when you upload a report.
          </p>
        </div>
      </div>

      {/* ── Steps ──────────────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--color-bg)' }}>
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-24)' }}>
            {STEPS.map((s, idx) => (
              <div
                key={s.number}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '80px 1fr',
                  gap: 'var(--space-32)',
                  alignItems: 'start',
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-xl)',
                  padding: 'var(--space-32)',
                  boxShadow: 'var(--shadow-card)',
                  transition: 'box-shadow 250ms ease',
                }}
                className="card-hover"
              >
                {/* Step number + icon */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-12)' }}>
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 'var(--radius-lg)',
                      background: s.color,
                      border: `1.5px solid ${s.border}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {s.icon}
                  </div>
                  {idx < STEPS.length - 1 && (
                    <div style={{ width: 2, height: 32, background: 'var(--color-border)', borderRadius: 2 }} />
                  )}
                </div>

                {/* Content */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-12)', marginBottom: 'var(--space-8)' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-xs)',
                        fontWeight: 700,
                        color: 'var(--text-muted)',
                        letterSpacing: '0.08em',
                      }}
                    >
                      STEP {s.number}
                    </span>
                  </div>
                  <h3
                    style={{
                      fontSize: 'var(--text-xl)',
                      fontWeight: 700,
                      color: 'var(--color-navy)',
                      marginBottom: 'var(--space-8)',
                    }}
                  >
                    {s.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 'var(--text-base)',
                      fontWeight: 600,
                      color: 'var(--text-secondary)',
                      marginBottom: 'var(--space-12)',
                    }}
                  >
                    {s.summary}
                  </p>
                  <p
                    style={{
                      fontSize: 'var(--text-sm)',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.8,
                      marginBottom: 'var(--space-12)',
                    }}
                  >
                    {s.detail}
                  </p>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 'var(--space-8)',
                      padding: 'var(--space-8) var(--space-12)',
                      background: s.color,
                      border: `1px solid ${s.border}`,
                      borderRadius: 'var(--radius-md)',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.5,
                    }}
                  >
                    <span style={{ opacity: 0.6 }}>ℹ</span>
                    {s.note}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────── */}
      <section
        className="section"
        style={{
          background: 'var(--color-surface)',
          borderTop: '1px solid var(--color-border)',
        }}
      >
        <div className="container" style={{ maxWidth: 720 }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-48)' }}>
            <span className="eyebrow">FAQ</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>
            {FAQ.map((item, i) => (
              <div
                key={i}
                style={{
                  background: 'var(--color-bg)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 'var(--space-20) var(--space-24)',
                    background: 'none',
                    border: 'none',
                    color: 'var(--color-navy)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--text-base)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textAlign: 'left',
                    gap: 'var(--space-16)',
                    transition: 'background-color 150ms ease',
                  }}
                >
                  <span>{item.q}</span>
                  <span
                    style={{
                      fontSize: 20,
                      fontWeight: 400,
                      color: 'var(--color-blue)',
                      flexShrink: 0,
                      transition: 'transform 250ms ease',
                      transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0)',
                      display: 'inline-block',
                      lineHeight: 1,
                    }}
                  >
                    +
                  </span>
                </button>
                {openFaq === i && (
                  <div
                    style={{
                      padding: '0 var(--space-24) var(--space-20)',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.8,
                      borderTop: '1px solid var(--color-border)',
                      paddingTop: 'var(--space-16)',
                    }}
                  >
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────── */}
      <section
        style={{
          background: 'var(--color-navy)',
          padding: 'var(--space-64) 0',
        }}
      >
        <div className="container" style={{ textAlign: 'center' }}>
          <h2
            style={{
              fontSize: 'var(--text-3xl)',
              fontWeight: 800,
              color: '#fff',
              marginBottom: 'var(--space-16)',
            }}
          >
            Ready to try it?
          </h2>
          <p
            style={{
              fontSize: 'var(--text-lg)',
              color: 'rgba(255,255,255,0.6)',
              marginBottom: 'var(--space-32)',
            }}
          >
            Upload your medical report and get a structured breakdown in seconds.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-16)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              className="btn btn-primary btn-lg"
              onClick={onStart}
              style={{ fontSize: 'var(--text-base)' }}
            >
              Get Started →
            </button>
            <button
              className="btn btn-secondary btn-lg"
              onClick={onBack}
              style={{ fontSize: 'var(--text-base)', color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}
            >
              {BACK_ARROW} Back to Home
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
