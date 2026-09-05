import React, { useEffect, useState } from 'react';

const LOGO_SVG = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="32" height="32" aria-hidden="true">
    <rect width="40" height="40" rx="8" fill="#F8FAFC" />
    <path d="M14 8 h8 l6 6 v18 h-14 z" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M22 8 v6 h6" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinejoin="round" />
    <line x1="18" y1="18" x2="26" y2="18" stroke="#E2E8F0" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="18" y1="23" x2="26" y2="23" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="18" y1="28" x2="23" y2="28" stroke="#E2E8F0" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

function getInitials(name) {
  if (!name) return '?';
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

export default function Header({ goHome, goHowItWorks, currentStep, user, onLogout }) {
  const [bgMode, setBgMode] = useState(() => localStorage.getItem('bgMode') || 'clinical');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.classList.remove('bg-dna', 'bg-network', 'bg-clinical');
    document.body.classList.add(`bg-${bgMode}`);
    localStorage.setItem('bgMode', bgMode);
  }, [bgMode]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { label: 'Dashboard',    action: goHome,         activeStep: 0 },
    { label: 'How It Works', action: goHowItWorks,   activeStep: 1 },
  ];

  return (
    <header
      className="header"
      style={{
        boxShadow: scrolled ? 'var(--shadow-md)' : 'none',
        transition: 'box-shadow 250ms ease',
      }}
    >
      <div className="header-inner">
        {/* Logo */}
        <button
          className="logo-mark"
          onClick={goHome}
          aria-label="Go to MedLens dashboard"
          style={{ background:'none', border:'none', padding:0, cursor:'pointer', display:'flex', alignItems:'center', gap:10 }}
        >
          {LOGO_SVG}
          <span className="logo-wordmark">Med<span>Lens</span></span>
        </button>

        {/* Navigation */}
        <nav aria-label="Main navigation">
          <ul className="nav-list">
            {navItems.map((item) => (
              <li
                key={item.label}
                className={`nav-item${currentStep === item.activeStep ? ' active' : ''}`}
              >
                <button
                  className="nav-item-btn"
                  onClick={item.action}
                  style={{ cursor: 'pointer' }}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right side: theme + user */}
        <div className="header-actions" style={{ gap: 'var(--space-16)' }}>
          {/* Theme selector */}
          <div style={{ display:'flex', alignItems:'center', gap:'var(--space-8)' }}>
            <label
              htmlFor="bg-mode-select"
              style={{ fontSize:'var(--text-xs)', fontWeight:600, color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'0.06em', whiteSpace:'nowrap' }}
            >
              Theme
            </label>
            <select
              id="bg-mode-select"
              value={bgMode}
              onChange={(e) => setBgMode(e.target.value)}
              className="bg-select"
              aria-label="Background theme"
            >
              <option value="clinical">Clinical</option>
              <option value="dna">DNA</option>
              <option value="network">Network</option>
            </select>
          </div>

          {/* Divider */}
          <div style={{ width:1, height:24, background:'var(--color-border)' }} />

          {/* User pill */}
          {user && (
            <div style={{ display:'flex', alignItems:'center', gap:'var(--space-10)' }}>
              <div
                style={{
                  width:34, height:34, borderRadius:'50%',
                  background:'var(--color-blue)', color:'#fff',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontWeight:700, fontSize:'var(--text-xs)', letterSpacing:'0.04em',
                  flexShrink:0,
                }}
                title={user.name}
              >
                {getInitials(user.name)}
              </div>
              <span style={{ fontSize:'var(--text-sm)', fontWeight:600, color:'var(--color-navy)', maxWidth:120, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                {user.name}
              </span>
              <button
                onClick={onLogout}
                style={{
                  background:'none', border:'1px solid var(--color-border)',
                  borderRadius:'var(--radius-md)', padding:'4px 12px',
                  fontSize:'var(--text-xs)', color:'var(--text-muted)', cursor:'pointer',
                  fontFamily:'var(--font-sans)', fontWeight:600, transition:'all 150ms ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-red)'; e.currentTarget.style.borderColor = '#FECACA'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--color-border)'; }}
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
