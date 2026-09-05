import React, { useState } from 'react';

const HEALTH_TIPS = [
  { icon: '💧', title: 'Stay Hydrated', tip: 'Aim to drink 2–3 litres (8–12 glasses) of water daily. Adequate hydration supports kidney function, joint lubrication, and cognitive performance.' },
  { icon: '🏃', title: 'Move Every Day', tip: "The WHO recommends at least 150 minutes of moderate aerobic exercise per week — that's just 22 minutes a day. A brisk walk counts." },
  { icon: '🥗', title: 'Eat the Rainbow', tip: 'Include 5 servings of fruits and vegetables daily. Different colours provide different antioxidants, vitamins and fibre your body needs.' },
  { icon: '😴', title: 'Prioritise Sleep', tip: 'Adults need 7–9 hours of quality sleep per night. Sleep deprivation raises blood pressure, cortisol and cardiovascular risk over time.' },
  { icon: '🩺', title: 'Annual Health Check', tip: 'Schedule a full blood panel at least once a year — fasting glucose, lipid profile, CBC, thyroid function. Early detection saves lives.' },
  { icon: '🧂', title: 'Watch Sodium', tip: 'Limit sodium intake to 2,300 mg/day (about 1 teaspoon of salt). High sodium is a leading driver of hypertension and stroke.' },
  { icon: '🧘', title: 'Manage Stress', tip: 'Just 5 minutes of deep breathing or mindfulness daily measurably lowers cortisol. Chronic stress damages the cardiovascular system over time.' },
  { icon: '🚭', title: 'Avoid Tobacco', tip: 'Smoking damages nearly every organ in the body. Quitting at any age rapidly reduces the risk of cancer, heart disease and stroke.' },
  { icon: '🍬', title: 'Reduce Added Sugar', tip: 'WHO recommends keeping added sugar below 25 g/day (about 6 teaspoons). Excess sugar drives obesity, type 2 diabetes and inflammation.' },
  { icon: '☀️', title: 'Get Vitamin D', tip: 'Spend 15–20 minutes in morning sunlight daily. Vitamin D deficiency is linked to fatigue, bone loss, low immunity and mood disorders.' },
  { icon: '🖥️', title: '20-20-20 Eye Rule', tip: 'Every 20 minutes of screen time, look at something 20 feet away for 20 seconds. This prevents digital eye strain and reduces headaches.' },
  { icon: '🫁', title: 'Know Your Numbers', tip: 'Track your blood pressure, fasting glucose and BMI. Normal blood pressure is below 120/80 mmHg. Know yours — it takes 2 minutes.' },
];

function getTodaysTipIndex() {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  return dayOfYear % HEALTH_TIPS.length;
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Good evening';
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function RecordCard({ record, onView, onDelete }) {
  const abnormal = (record.labResults || []).filter(r => r.status === 'HIGH' || r.status === 'LOW').length;
  const normal   = (record.labResults || []).filter(r => r.status === 'NORMAL').length;
  const total    = (record.labResults || []).length;

  return (
    <div
      className="card"
      style={{
        padding: 'var(--space-20)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-12)',
      }}
    >
      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--space-12)', flexWrap: 'wrap' }}>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-8)', flexWrap: 'wrap', marginBottom: 'var(--space-6)' }}>
            <span style={{ fontWeight: 700, fontSize: 'var(--text-base)', color: 'var(--color-navy)', whiteSpace: 'nowrap' }}>
              {record.patientData?.name || 'Unknown Patient'}
            </span>
            {record.patientData?.age && (
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-full)', padding: '2px 8px', whiteSpace: 'nowrap' }}>
                Age {record.patientData.age} · {record.patientData.sex || '—'}
              </span>
            )}
            {abnormal > 0 && <span className="status-badge status-high">{abnormal} Abnormal</span>}
            {abnormal === 0 && total > 0 && <span className="status-badge status-normal">All Normal</span>}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-12)' }}>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>📅 {formatDate(record.uploadedAt)}</span>
            {record.fileName && (
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 200 }}>
                📄 {record.fileName}
              </span>
            )}
            {total > 0 && (
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                🧪 {total} test{total !== 1 ? 's' : ''} · {normal} normal · {abnormal} abnormal
              </span>
            )}
          </div>
        </div>
        {/* Actions */}
        <div style={{ display: 'flex', gap: 'var(--space-8)', flexShrink: 0, alignItems: 'center' }}>
          <button
            className="btn btn-primary"
            onClick={() => onView(record)}
            style={{ padding: 'var(--space-8) var(--space-16)', fontSize: 'var(--text-sm)', whiteSpace: 'nowrap' }}
          >
            View
          </button>
          <button
            onClick={() => onDelete(record.id)}
            style={{
              background: 'none', border: '1px solid #FECACA', borderRadius: 'var(--radius-md)',
              color: 'var(--color-red)', cursor: 'pointer', padding: '7px 10px',
              fontSize: 'var(--text-sm)', fontFamily: 'var(--font-sans)', lineHeight: 1,
            }}
            aria-label="Delete record"
          >
            ✕
          </button>
        </div>
      </div>
      {record.patientData?.conditions && record.patientData.conditions !== 'None known' && (
        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', fontStyle: 'italic', margin: 0 }}>
          Conditions: {record.patientData.conditions}
        </p>
      )}
    </div>
  );
}

export default function Dashboard({ user, records, onAddReport, onViewRecord, onDeleteRecord }) {
  const [tipIdx, setTipIdx] = useState(getTodaysTipIndex);

  const totalTests    = records.reduce((s, r) => s + (r.labResults?.length || 0), 0);
  const totalNormal   = records.reduce((s, r) => s + (r.labResults?.filter(x => x.status === 'NORMAL').length || 0), 0);
  const totalAbnormal = records.reduce((s, r) => s + (r.labResults?.filter(x => x.status === 'HIGH' || x.status === 'LOW').length || 0), 0);

  const prevTip = () => setTipIdx(i => (i - 1 + HEALTH_TIPS.length) % HEALTH_TIPS.length);
  const nextTip = () => setTipIdx(i => (i + 1) % HEALTH_TIPS.length);
  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: 'var(--space-40) var(--space-24) var(--space-80)' }}>

      {/* ── Welcome ─────────────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-16)', marginBottom: 'var(--space-32)' }}>
        <div>
          <span className="eyebrow">Patient Dashboard</span>
          <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, var(--text-3xl))', fontWeight: 800, color: 'var(--color-navy)', marginBottom: 'var(--space-4)' }}>
            {getGreeting()}, {user?.name?.split(' ')[0]} 👋
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>{today}</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={onAddReport}
          style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-8)', whiteSpace: 'nowrap', flexShrink: 0 }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M8 5v6M5 8h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Add New Report
        </button>
      </div>

      {/* ── Stats row — auto-fit collapses on small screens ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: 'var(--space-14)',
          marginBottom: 'var(--space-32)',
        }}
      >
        {[
          { label: 'Total Reports',    value: records.length, icon: '📋', color: 'var(--color-blue)', bg: 'var(--color-blue-light)' },
          { label: 'Normal Results',   value: totalNormal,    icon: '✅', color: '#059669', bg: '#ECFDF5' },
          { label: 'Abnormal Results', value: totalAbnormal,  icon: '⚠️', color: 'var(--color-red)', bg: '#FEF2F2' },
        ].map(stat => (
          <div key={stat.label} className="card" style={{ padding: 'var(--space-16)', textAlign: 'center' }}>
            <div style={{ width: 36, height: 36, borderRadius: 'var(--radius-md)', background: stat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-8)', fontSize: 16 }}>
              {stat.icon}
            </div>
            <p style={{ fontSize: 'clamp(1.4rem, 3vw, var(--text-2xl))', fontWeight: 800, color: stat.color, lineHeight: 1, marginBottom: 'var(--space-4)' }}>
              {stat.value}
            </p>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', lineHeight: 1.3 }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* ── Main layout: flex-wrap so sidebar drops below on narrow screens ── */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-24)', alignItems: 'start', marginBottom: 'var(--space-40)' }}>

        {/* Records — grows to fill available space, min 280px */}
        <div style={{ flex: '1 1 280px', minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-16)' }}>
            <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--color-navy)' }}>Your Medical Records</h2>
            {records.length > 0 && (
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
                {records.length} record{records.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>

          {records.length === 0 ? (
            <div className="card" style={{ padding: 'var(--space-48)', textAlign: 'center' }}>
              <div style={{ fontSize: 40, marginBottom: 'var(--space-12)' }}>📂</div>
              <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--color-navy)', marginBottom: 'var(--space-8)' }}>No records yet</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-20)', lineHeight: 1.7 }}>
                Upload your first medical report to get started. MedLens will extract and store your results here.
              </p>
              <button className="btn btn-primary" onClick={onAddReport}>Upload First Report →</button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>
              {[...records].reverse().map(record => (
                <RecordCard key={record.id} record={record} onView={onViewRecord} onDelete={onDeleteRecord} />
              ))}
            </div>
          )}
        </div>

        {/* Sidebar — fixed 300px, drops below records when screen < ~620px */}
        <div style={{ flex: '0 0 300px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-16)' }}>

          {/* Health Tip card */}
          <div style={{ background: 'linear-gradient(135deg, var(--color-navy) 0%, #1E3A5F 100%)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-24)', color: '#fff', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-14)' }}>
              <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' }}>
                Daily Health Tip
              </span>
              <div style={{ display: 'flex', gap: 'var(--space-6)' }}>
                <button onClick={prevTip} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', borderRadius: 'var(--radius-sm)', width: 26, height: 26, cursor: 'pointer', fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>‹</button>
                <button onClick={nextTip} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', borderRadius: 'var(--radius-sm)', width: 26, height: 26, cursor: 'pointer', fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>›</button>
              </div>
            </div>
            <div style={{ fontSize: 30, marginBottom: 'var(--space-10)' }}>{HEALTH_TIPS[tipIdx].icon}</div>
            <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 700, marginBottom: 'var(--space-8)', color: '#fff' }}>
              {HEALTH_TIPS[tipIdx].title}
            </h3>
            <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.65, color: 'rgba(255,255,255,0.72)' }}>
              {HEALTH_TIPS[tipIdx].tip}
            </p>
            <p style={{ marginTop: 'var(--space-12)', fontSize: 10, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.02em' }}>
              General wellness information · Not medical advice
            </p>
            {/* Dot indicators — wrap if needed */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 'var(--space-14)', justifyContent: 'center' }}>
              {HEALTH_TIPS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTipIdx(i)}
                  style={{
                    width: i === tipIdx ? 18 : 7, height: 7, borderRadius: 4,
                    background: i === tipIdx ? '#60A5FA' : 'rgba(255,255,255,0.2)',
                    border: 'none', cursor: 'pointer', transition: 'all 250ms ease', padding: 0,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card" style={{ padding: 'var(--space-20)' }}>
            <h3 style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--color-navy)', marginBottom: 'var(--space-12)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
              Quick Actions
            </h3>
            <button
              onClick={onAddReport}
              style={{
                display: 'flex', alignItems: 'center', gap: 'var(--space-10)',
                width: '100%', background: 'var(--color-surface)', border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)', padding: 'var(--space-12) var(--space-14)',
                cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)',
                fontWeight: 600, color: 'var(--color-navy)', transition: 'background 150ms ease',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#EFF6FF'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--color-surface)'}
            >
              <span style={{ fontSize: 16 }}>📤</span> Upload New Report
            </button>
          </div>

          {/* Last report info */}
          {records.length > 0 && (
            <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-16)' }}>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 'var(--space-6)' }}>Last Report</p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-navy)', fontWeight: 600 }}>
                {formatDate(records[records.length - 1].uploadedAt)}
              </p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {records[records.length - 1].fileName || 'Unknown file'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
