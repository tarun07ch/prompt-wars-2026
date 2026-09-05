import React, { useState } from 'react';

const LOGO = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="44" height="44" aria-hidden="true">
    <rect width="40" height="40" rx="10" fill="#1E293B" />
    <path d="M14 8 h8 l6 6 v18 h-14 z" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinejoin="round" />
    <path d="M22 8 v6 h6" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinejoin="round" />
    <line x1="18" y1="18" x2="26" y2="18" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" />
    <line x1="18" y1="23" x2="26" y2="23" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" />
    <line x1="18" y1="28" x2="23" y2="28" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

function getUsers() {
  try { return JSON.parse(localStorage.getItem('medlens_users') || '[]'); } catch { return []; }
}
function saveUsers(u) {
  localStorage.setItem('medlens_users', JSON.stringify(u));
}

export default function Login({ onLogin }) {
  const [mode, setMode]         = useState('login');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [name, setName]         = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError]       = useState(null);

  const setSession = (user) => {
    sessionStorage.setItem('medlens_auth', JSON.stringify({ email: user.email, name: user.name }));
    onLogin({ email: user.email, name: user.name });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError(null);
    const users = getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!user) { setError('Incorrect email or password. Try the demo account below.'); return; }
    setSession(user);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError(null);
    if (!name.trim()) { setError('Please enter your full name.'); return; }
    if (!email.includes('@')) { setError('Enter a valid email address.'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    const users = getUsers();
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      setError('An account with this email already exists. Sign in instead.'); return;
    }
    const newUser = { email, password, name: name.trim() };
    saveUsers([...users, newUser]);
    setSession(newUser);
  };

  const handleDemo = () => {
    const DEMO_EMAIL = 'demo@medlens.com';
    const DEMO_NAME  = 'Demo Patient';
    const demo = { email: DEMO_EMAIL, password: 'demo123', name: DEMO_NAME };
    const users = getUsers();
    if (!users.find(u => u.email === DEMO_EMAIL)) saveUsers([...users, demo]);

    // Seed demo records if not already present
    const RECORDS_KEY = `medlens_records_${DEMO_EMAIL}`;
    if (!localStorage.getItem(RECORDS_KEY)) {
      const demoRecords = [
        {
          id: '1000000000001',
          uploadedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          patientData: { name: DEMO_NAME, age: '32', sex: 'Male', symptoms: 'Annual health check-up', conditions: 'None known', allergies: 'Penicillin', medications: 'None', additional: '' },
          fileName: 'annual_checkup_2026.pdf',
          labResults: [
            { testName: 'Haemoglobin',      value: 14.1, unit: 'g/dL',      referenceRange: { low: 13.5, high: 17.5, source: 'report' }, status: 'NORMAL', source: { type: 'medical_report', document: 'annual_checkup_2026.pdf' } },
            { testName: 'Fasting Glucose',   value: 98,   unit: 'mg/dL',     referenceRange: { low: 70,   high: 99,   source: 'report' }, status: 'NORMAL', source: { type: 'medical_report', document: 'annual_checkup_2026.pdf' } },
            { testName: 'Total Cholesterol', value: 182,  unit: 'mg/dL',     referenceRange: { low: null, high: 200,  source: 'report' }, status: 'NORMAL', source: { type: 'medical_report', document: 'annual_checkup_2026.pdf' } },
            { testName: 'Vitamin D',         value: 18,   unit: 'ng/mL',     referenceRange: { low: 30,   high: 100,  source: 'report' }, status: 'LOW',    source: { type: 'medical_report', document: 'annual_checkup_2026.pdf' } },
            { testName: 'TSH',               value: 2.4,  unit: 'mIU/L',     referenceRange: { low: 0.5,  high: 5.0,  source: 'report' }, status: 'NORMAL', source: { type: 'medical_report', document: 'annual_checkup_2026.pdf' } },
          ],
          observations: ['Vitamin D level is below the sufficient range — supplementation may be advised by a healthcare professional.', 'All other parameters are within normal reference ranges.'],
        },
        {
          id: '1000000000002',
          uploadedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          patientData: { name: DEMO_NAME, age: '32', sex: 'Male', symptoms: 'Fatigue, occasional headaches', conditions: 'None known', allergies: 'Penicillin', medications: 'Vitamin D supplement', additional: '' },
          fileName: 'blood_test_report_sept.pdf',
          labResults: [
            { testName: 'Haemoglobin',      value: 13.2, unit: 'g/dL',      referenceRange: { low: 13.5, high: 17.5, source: 'report' }, status: 'LOW',    source: { type: 'medical_report', document: 'blood_test_report_sept.pdf' } },
            { testName: 'WBC Count',        value: 7.4,  unit: 'x10³/µL',  referenceRange: { low: 4.5,  high: 11.0, source: 'report' }, status: 'NORMAL', source: { type: 'medical_report', document: 'blood_test_report_sept.pdf' } },
            { testName: 'Platelet Count',   value: 245,  unit: 'x10³/µL',  referenceRange: { low: 150,  high: 400,  source: 'report' }, status: 'NORMAL', source: { type: 'medical_report', document: 'blood_test_report_sept.pdf' } },
            { testName: 'Fasting Glucose',  value: 112,  unit: 'mg/dL',    referenceRange: { low: 70,   high: 99,   source: 'report' }, status: 'HIGH',   source: { type: 'medical_report', document: 'blood_test_report_sept.pdf' } },
            { testName: 'Total Cholesterol',value: 198,  unit: 'mg/dL',    referenceRange: { low: null, high: 200,  source: 'report' }, status: 'NORMAL', source: { type: 'medical_report', document: 'blood_test_report_sept.pdf' } },
            { testName: 'LDL Cholesterol',  value: 134,  unit: 'mg/dL',    referenceRange: { low: null, high: 130,  source: 'report' }, status: 'HIGH',   source: { type: 'medical_report', document: 'blood_test_report_sept.pdf' } },
            { testName: 'HDL Cholesterol',  value: 42,   unit: 'mg/dL',    referenceRange: { low: 40,   high: null, source: 'report' }, status: 'NORMAL', source: { type: 'medical_report', document: 'blood_test_report_sept.pdf' } },
            { testName: 'Serum Creatinine', value: 0.9,  unit: 'mg/dL',    referenceRange: { low: 0.7,  high: 1.3,  source: 'report' }, status: 'NORMAL', source: { type: 'medical_report', document: 'blood_test_report_sept.pdf' } },
            { testName: 'TSH',              value: 2.1,  unit: 'mIU/L',    referenceRange: { low: 0.5,  high: 5.0,  source: 'report' }, status: 'NORMAL', source: { type: 'medical_report', document: 'blood_test_report_sept.pdf' } },
          ],
          observations: [
            'Haemoglobin is slightly below the normal reference range — may indicate mild anaemia.',
            'Fasting glucose is elevated above the normal range.',
            'LDL Cholesterol is marginally above the upper reference limit.',
            'All other parameters are within normal limits.',
          ],
        },
      ];
      localStorage.setItem(RECORDS_KEY, JSON.stringify(demoRecords));
    }

    sessionStorage.setItem('medlens_auth', JSON.stringify({ email: DEMO_EMAIL, name: DEMO_NAME }));
    setSession(demo);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 35%, #E0F2FE 65%, #F0FDFA 100%)',
        padding: 'var(--space-24)',
        position: 'relative',
        overflow: 'hidden',
      }}
      className="page-transition"
    >
      {/* Subtle background rings */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position:'absolute', top:'15%', left:'50%', transform:'translateX(-50%)', width:600, height:600, borderRadius:'50%', border:'1px solid rgba(37,99,235,0.08)' }} />
        <div style={{ position:'absolute', top:'10%', left:'50%', transform:'translateX(-50%)', width:800, height:800, borderRadius:'50%', border:'1px solid rgba(37,99,235,0.05)' }} />
        <div style={{ position:'absolute', top:'5%', left:'50%', transform:'translateX(-50%)', width:1000, height:1000, borderRadius:'50%', border:'1px solid rgba(37,99,235,0.03)' }} />
      </div>

      {/* Card */}
      <div
        style={{
          width: '100%',
          maxWidth: 420,
          background: 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: 'var(--radius-2xl)',
          border: '1px solid rgba(255,255,255,0.8)',
          boxShadow: '0 20px 60px rgba(15,23,42,0.12), 0 4px 16px rgba(15,23,42,0.06)',
          padding: 'var(--space-48) var(--space-40)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 'var(--space-32)' }}>
          {LOGO}
          <h1
            style={{
              marginTop: 'var(--space-16)',
              fontSize: 'var(--text-2xl)',
              fontWeight: 800,
              color: 'var(--color-navy)',
              letterSpacing: '-0.02em',
            }}
          >
            {mode === 'login' ? 'Sign in to MedLens' : 'Create your account'}
          </h1>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', marginTop: 'var(--space-4)', textAlign: 'center' }}>
            {mode === 'login'
              ? 'Your personal health record companion'
              : 'Store and track your medical history securely'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={mode === 'login' ? handleLogin : handleRegister} noValidate>
          {mode === 'register' && (
            <div className="form-group" style={{ marginBottom: 'var(--space-16)' }}>
              <label className="form-label" htmlFor="auth-name">Full Name</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', color:'var(--text-muted)', fontSize:15 }}>👤</span>
                <input
                  id="auth-name"
                  type="text"
                  className="form-input"
                  placeholder="e.g. Priya Sharma"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  style={{ paddingLeft: 40 }}
                  required
                />
              </div>
            </div>
          )}

          <div className="form-group" style={{ marginBottom: 'var(--space-16)' }}>
            <label className="form-label" htmlFor="auth-email">Email Address</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', color:'var(--text-muted)', fontSize:15 }}>✉</span>
              <input
                id="auth-email"
                type="email"
                className="form-input"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ paddingLeft: 40 }}
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: 'var(--space-8)' }}>
            <label className="form-label" htmlFor="auth-password">Password</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', color:'var(--text-muted)', fontSize:15 }}>🔒</span>
              <input
                id="auth-password"
                type={showPass ? 'text' : 'password'}
                className="form-input"
                placeholder={mode === 'register' ? 'At least 6 characters' : 'Your password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{ paddingLeft: 40, paddingRight: 44 }}
                required
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              />
              <button
                type="button"
                onClick={() => setShowPass(v => !v)}
                style={{
                  position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'var(--text-muted)', fontSize: 16, padding: 4,
                }}
                aria-label={showPass ? 'Hide password' : 'Show password'}
              >
                {showPass ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div
              style={{
                marginBottom: 'var(--space-16)',
                padding: 'var(--space-10) var(--space-14)',
                background: '#FEF2F2',
                border: '1px solid #FECACA',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--text-sm)',
                color: 'var(--color-red)',
              }}
            >
              ⚠ {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '16px var(--space-24)',
              background: 'var(--color-navy)',
              color: '#fff',
              border: 'none',
              borderRadius: '9999px',
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-base)',
              fontWeight: 700,
              cursor: 'pointer',
              marginTop: 'var(--space-8)',
              transition: 'background 200ms ease, transform 100ms ease',
              letterSpacing: '0.01em',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#1E3A5F'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--color-navy)'}
          >
            {mode === 'login' ? 'Sign In →' : 'Create Account →'}
          </button>
        </form>

        {/* Divider */}
        <div style={{ display:'flex', alignItems:'center', gap:'var(--space-12)', margin:'var(--space-24) 0' }}>
          <div style={{ flex:1, height:1, background:'var(--color-border)' }} />
          <span style={{ fontSize:'var(--text-xs)', color:'var(--text-muted)', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.06em' }}>or</span>
          <div style={{ flex:1, height:1, background:'var(--color-border)' }} />
        </div>

        {/* Demo */}
        <button
          type="button"
          onClick={handleDemo}
          style={{
            width: '100%',
            padding: 'var(--space-12) var(--space-24)',
            background: 'var(--color-blue-light)',
            color: 'var(--color-blue)',
            border: '1.5px solid #BFDBFE',
            borderRadius: '9999px',
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-sm)',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'background 200ms ease',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#DBEAFE'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--color-blue-light)'}
        >
          ⚡ Try Demo Account — No signup needed
        </button>

        {/* Toggle mode */}
        <p style={{ textAlign:'center', marginTop:'var(--space-24)', fontSize:'var(--text-sm)', color:'var(--text-muted)' }}>
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button
            type="button"
            onClick={() => { setMode(m => m === 'login' ? 'register' : 'login'); setError(null); }}
            style={{ background:'none', border:'none', color:'var(--color-blue)', fontWeight:700, cursor:'pointer', fontFamily:'var(--font-sans)', fontSize:'var(--text-sm)' }}
          >
            {mode === 'login' ? 'Create Account' : 'Sign In'}
          </button>
        </p>
      </div>

      {/* Bottom brand line */}
      <p
        style={{
          position: 'absolute', bottom: 'var(--space-24)', left: '50%', transform: 'translateX(-50%)',
          fontSize: 'var(--text-xs)', color: 'rgba(15,23,42,0.4)', whiteSpace: 'nowrap',
        }}
      >
        MedLens · AI-assisted clinical information extraction · Not a diagnostic tool
      </p>
    </div>
  );
}
