import React from 'react';

const FEATURES = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
        <rect x="9" y="3" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="1.75"/>
        <line x1="9" y1="12" x2="15" y2="12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
        <line x1="9" y1="16" x2="13" y2="16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Structured Extraction',
    desc: 'Complex medical reports are converted into organized, clearly labelled fields — test names, values, units and reference ranges all in one view.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.75"/>
        <path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Reference-Range Awareness',
    desc: 'Values are compared only against the reference ranges printed in your report — never against external or assumed ranges.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="13 2 13 9 20 9" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Traceable Information',
    desc: 'Every extracted data point stays connected to the source document so you always know exactly where the information came from.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
        <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.75"/>
      </svg>
    ),
    title: 'Patient-Friendly Insights',
    desc: 'Extracted information is presented in plain language so patients and caregivers can understand their results without medical training.',
  },
];

const WORKFLOW_STEPS = [
  { label: 'Patient Information', desc: 'Enter basic patient context to help organise the record.' },
  { label: 'Medical Report', desc: 'Upload a PDF of the medical report for processing.' },
  { label: 'AI Extraction', desc: 'Gemini reads and structures the clinical content.' },
  { label: 'Structured Record', desc: 'Lab results and observations are presented clearly.' },
  { label: 'Human Review', desc: 'You review the extracted data before any action is taken.' },
];

// Scientific Hero SVG — DNA-inspired composition
function HeroVisual() {
  return (
    <div className="hero-visual" aria-hidden="true">
      <svg
        viewBox="0 0 480 440"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%', maxWidth: 480 }}
      >
        {/* Soft gradient background blob */}
        <defs>
          <radialGradient id="blob1" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#EFF6FF" stopOpacity="0.9"/>
            <stop offset="100%" stopColor="#F8FAFC" stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="blob2" cx="70%" cy="70%" r="40%">
            <stop offset="0%" stopColor="#F0FDFA" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#F8FAFC" stopOpacity="0"/>
          </radialGradient>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        <ellipse cx="240" cy="200" rx="200" ry="180" fill="url(#blob1)"/>
        <ellipse cx="340" cy="320" rx="130" ry="110" fill="url(#blob2)"/>

        {/* Central document card */}
        <rect x="160" y="120" width="160" height="200" rx="12" fill="white" stroke="#E2E8F0" strokeWidth="1.5" filter="url(#softGlow)"/>
        <rect x="175" y="140" width="80" height="8" rx="4" fill="#E2E8F0"/>
        <rect x="175" y="156" width="110" height="8" rx="4" fill="#2563EB" opacity="0.7"/>
        <rect x="175" y="172" width="95" height="8" rx="4" fill="#E2E8F0"/>
        <rect x="175" y="196" width="60" height="8" rx="4" fill="#E2E8F0"/>
        <rect x="175" y="212" width="100" height="8" rx="4" fill="#0D9488" opacity="0.6"/>
        <rect x="175" y="228" width="80" height="8" rx="4" fill="#E2E8F0"/>
        <rect x="175" y="252" width="110" height="8" rx="4" fill="#2563EB" opacity="0.5"/>
        <rect x="175" y="268" width="70" height="8" rx="4" fill="#E2E8F0"/>
        {/* Doc corner fold */}
        <path d="M296 120 L320 144 L296 144 Z" fill="#F1F5F9" stroke="#E2E8F0" strokeWidth="1"/>

        {/* Floating status badges */}
        <rect x="60" y="175" width="80" height="28" rx="14" fill="#F0FDFA" stroke="#0D9488" strokeWidth="1"/>
        <text x="100" y="194" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0D9488">NORMAL</text>

        <rect x="340" y="155" width="70" height="28" rx="14" fill="#FEF2F2" stroke="#DC2626" strokeWidth="1"/>
        <text x="375" y="174" textAnchor="middle" fontSize="11" fontWeight="700" fill="#DC2626">HIGH</text>

        <rect x="348" y="255" width="80" height="28" rx="14" fill="#FFFBEB" stroke="#D97706" strokeWidth="1"/>
        <text x="388" y="274" textAnchor="middle" fontSize="11" fontWeight="700" fill="#D97706">REVIEW</text>

        {/* Connection lines from doc to badges */}
        <line x1="160" y1="196" x2="140" y2="189" stroke="#0D9488" strokeWidth="1" strokeDasharray="4 3" opacity="0.5"/>
        <line x1="320" y1="168" x2="340" y2="169" stroke="#DC2626" strokeWidth="1" strokeDasharray="4 3" opacity="0.5"/>
        <line x1="320" y1="268" x2="348" y2="269" stroke="#D97706" strokeWidth="1" strokeDasharray="4 3" opacity="0.5"/>

        {/* Orbiting data nodes — top arc */}
        <circle cx="240" cy="80" r="6" fill="#2563EB" opacity="0.7" className="node-pulse"/>
        <circle cx="290" cy="68" r="4" fill="#0D9488" opacity="0.5" className="node-pulse" style={{animationDelay:'0.6s'}}/>
        <circle cx="190" cy="72" r="4" fill="#2563EB" opacity="0.4" className="node-pulse" style={{animationDelay:'1.2s'}}/>
        <path d="M190 72 Q240 50 290 68" stroke="#2563EB" strokeWidth="1" strokeDasharray="3 3" fill="none" opacity="0.3" className="helix-line"/>

        {/* Bottom arc nodes */}
        <circle cx="240" cy="370" r="5" fill="#0D9488" opacity="0.6" className="node-pulse" style={{animationDelay:'0.9s'}}/>
        <circle cx="300" cy="355" r="3.5" fill="#2563EB" opacity="0.4" className="node-pulse" style={{animationDelay:'0.3s'}}/>
        <circle cx="180" cy="360" r="3.5" fill="#0D9488" opacity="0.4" className="node-pulse" style={{animationDelay:'1.5s'}}/>
        <path d="M180 360 Q240 380 300 355" stroke="#0D9488" strokeWidth="1" strokeDasharray="3 3" fill="none" opacity="0.3" className="helix-line"/>

        {/* Outer orbit ring */}
        <circle cx="240" cy="220" r="155" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="6 6" fill="none" className="orbit-ring" opacity="0.5"/>
        <circle cx="240" cy="220" r="180" stroke="#EFF6FF" strokeWidth="1" strokeDasharray="4 8" fill="none" className="orbit-ring" style={{animationDirection:'reverse', animationDuration:'30s'}} opacity="0.4"/>

        {/* Small scattered dots */}
        <circle cx="90" cy="110" r="3" fill="#2563EB" opacity="0.2"/>
        <circle cx="400" cy="320" r="3" fill="#0D9488" opacity="0.2"/>
        <circle cx="420" cy="130" r="2" fill="#2563EB" opacity="0.15"/>
        <circle cx="70" cy="340" r="2" fill="#0D9488" opacity="0.15"/>
      </svg>
    </div>
  );
}

export default function Landing({ start, onHowItWorks }) {
  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section
        style={{
          padding: 'var(--space-96) 0 var(--space-80)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'var(--space-64)',
              alignItems: 'center',
            }}
          >
            {/* Left: Copy */}
            <div className="fade-in-up">
              <span className="eyebrow">AI-Powered Clinical Information Intelligence</span>
              <h1
                style={{
                  fontSize: 'clamp(2.25rem, 4vw, 3.5rem)',
                  fontWeight: 800,
                  lineHeight: 1.1,
                  color: 'var(--color-navy)',
                  marginBottom: 'var(--space-24)',
                  letterSpacing: '-0.03em',
                }}
              >
                Turn Medical Reports Into Clear, Structured Information.
              </h1>
              <p
                style={{
                  fontSize: 'var(--text-lg)',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.8,
                  marginBottom: 'var(--space-40)',
                  maxWidth: '500px',
                }}
              >
                MedLens extracts, structures and presents key clinical information from your medical reports — preserving every data point's source so you always know where it came from.
              </p>
              <div style={{ display: 'flex', gap: 'var(--space-16)', flexWrap: 'wrap' }}>
                <button
                  className="btn btn-primary btn-lg"
                  onClick={start}
                >
                  Get Started →
                </button>
                <button
                  className="btn btn-secondary btn-lg"
                  onClick={onHowItWorks}
                >
                  How It Works
                </button>
              </div>
              {/* Trust note */}
              <div
                style={{
                  marginTop: 'var(--space-32)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-8)',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1L9.96 5.67 15 6.18 11.35 9.55 12.42 14.5 8 11.85 3.58 14.5 4.65 9.55 1 6.18 6.04 5.67 8 1Z" fill="#D97706"/>
                </svg>
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
                  AI-assisted extraction — always reviewed by a human
                </span>
              </div>
            </div>

            {/* Right: Scientific visual */}
            <div className="fade-in-up fade-in-up-2" style={{ position: 'relative' }}>
              <HeroVisual />
            </div>
          </div>
        </div>
      </section>

      {/* ── Features Grid ────────────────────────────────────── */}
      <section
        className="section"
        style={{ background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}
      >
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-56)' }}>
            <span className="eyebrow">What MedLens Does</span>
            <h2 className="section-title" style={{ margin: '0 auto var(--space-16)' }}>
              Every report. Clearly structured.
            </h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Clinical reports contain dense, complex information. MedLens makes that information legible, organised and traceable.
            </p>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 'var(--space-24)',
            }}
          >
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                className={`card card-hover fade-in-up fade-in-up-${i + 1}`}
                style={{ padding: 'var(--space-32)' }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 'var(--radius-lg)',
                    backgroundColor: 'var(--color-blue-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-blue)',
                    marginBottom: 'var(--space-20)',
                    flexShrink: 0,
                  }}
                >
                  {f.icon}
                </div>
                <h3
                  style={{
                    fontSize: 'var(--text-lg)',
                    fontWeight: 700,
                    marginBottom: 'var(--space-10)',
                    color: 'var(--color-navy)',
                  }}
                >
                  {f.title}
                </h3>
                <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Workflow Section ─────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'var(--space-80)',
              alignItems: 'start',
            }}
          >
            {/* Left: Explanation */}
            <div>
              <span className="eyebrow">How It Works</span>
              <h2
                className="section-title"
                style={{ marginBottom: 'var(--space-20)' }}
              >
                Simple process.<br />Transparent results.
              </h2>
              <p
                style={{
                  fontSize: 'var(--text-base)',
                  lineHeight: 1.8,
                  color: 'var(--text-secondary)',
                  marginBottom: 'var(--space-32)',
                }}
              >
                MedLens follows a straightforward pipeline that keeps humans in control at every step. Nothing is sent anywhere without your action.
              </p>
              <button className="btn btn-primary" onClick={start}>
                Start Now →
              </button>
              <button className="btn btn-secondary" onClick={onHowItWorks} style={{ marginTop: 'var(--space-12)' }}>
                Read Full Walkthrough
              </button>
            </div>

            {/* Right: Workflow steps */}
            <div>
              {WORKFLOW_STEPS.map((step, idx) => (
                <div key={step.label}>
                  <div
                    style={{
                      display: 'flex',
                      gap: 'var(--space-16)',
                      alignItems: 'flex-start',
                      padding: 'var(--space-20) 0',
                    }}
                  >
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        backgroundColor: idx === 2 ? 'var(--color-blue)' : 'var(--color-blue-light)',
                        color: idx === 2 ? '#fff' : 'var(--color-blue)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: 'var(--text-sm)',
                        flexShrink: 0,
                      }}
                    >
                      {idx + 1}
                    </div>
                    <div>
                      <p
                        style={{
                          fontWeight: 700,
                          color: 'var(--color-navy)',
                          marginBottom: 'var(--space-4)',
                          fontSize: 'var(--text-base)',
                        }}
                      >
                        {step.label}
                      </p>
                      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        {step.desc}
                      </p>
                    </div>
                  </div>
                  {idx < WORKFLOW_STEPS.length - 1 && (
                    <div
                      style={{
                        marginLeft: 18,
                        borderLeft: '2px dashed var(--color-border)',
                        height: 'var(--space-16)',
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────── */}
      <section
        style={{
          background: 'var(--color-navy)',
          padding: 'var(--space-80) 0',
        }}
      >
        <div className="container" style={{ textAlign: 'center' }}>
          <h2
            style={{
              fontSize: 'var(--text-4xl)',
              fontWeight: 800,
              color: '#fff',
              marginBottom: 'var(--space-16)',
              letterSpacing: '-0.02em',
            }}
          >
            Ready to understand your report?
          </h2>
          <p
            style={{
              fontSize: 'var(--text-lg)',
              color: 'rgba(255,255,255,0.65)',
              marginBottom: 'var(--space-40)',
              maxWidth: 520,
              margin: '0 auto var(--space-40)',
            }}
          >
            Upload your medical report and get a structured, readable breakdown in seconds.
          </p>
          <button
            className="btn btn-primary btn-lg"
            onClick={start}
            style={{ fontSize: 'var(--text-base)', padding: 'var(--space-16) var(--space-40)' }}
          >
            Get Started — It's Free
          </button>
          <p
            style={{
              marginTop: 'var(--space-20)',
              fontSize: 'var(--text-sm)',
              color: 'rgba(255,255,255,0.4)',
            }}
          >
            No account required. No data stored.
          </p>
        </div>
      </section>
    </div>
  );
}
