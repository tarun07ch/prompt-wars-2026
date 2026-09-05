import React from 'react';
import Header from './components/Header';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PatientForm from './components/PatientForm';
import ReportUpload from './components/ReportUpload';
import Results from './pages/Results';
import HowItWorks from './pages/HowItWorks';
import './designTokens.css';
import './background.css';

// ── Helpers ──────────────────────────────────────────────
function loadAuth() {
  try { return JSON.parse(sessionStorage.getItem('medlens_auth') || 'null'); } catch { return null; }
}
function loadRecords(email) {
  if (!email) return [];
  try { return JSON.parse(localStorage.getItem(`medlens_records_${email}`) || '[]'); } catch { return []; }
}
function saveRecords(email, records) {
  localStorage.setItem(`medlens_records_${email}`, JSON.stringify(records));
}

// appStep: 0=Dashboard, 1=HowItWorks, 2=PatientForm, 3=Upload, 4=Results, 5=ViewRecord
export default function App() {
  const [user, setUser]                         = React.useState(loadAuth);
  const [records, setRecords]                   = React.useState(() => loadRecords(loadAuth()?.email));
  const [appStep, setAppStep]                   = React.useState(0);
  const [patientData, setPatientData]           = React.useState(null);
  const [extractionResult, setExtractionResult] = React.useState(null);
  const [viewedRecord, setViewedRecord]         = React.useState(null);
  const [uploadedFileName, setUploadedFileName] = React.useState(null);
  const [lastSavedAt, setLastSavedAt]           = React.useState(null);

  // Scroll to top on page change
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [appStep]);

  // ── Auth handlers ────────────────────────────────────
  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    const recs = loadRecords(loggedInUser.email);
    setRecords(recs);
    setAppStep(0);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('medlens_auth');
    setUser(null);
    setRecords([]);
    setPatientData(null);
    setExtractionResult(null);
    setViewedRecord(null);
    setAppStep(0);
  };

  // ── Navigation helpers ───────────────────────────────
  const goToDashboard = () => {
    setAppStep(0);
    setPatientData(null);
    setExtractionResult(null);
    setViewedRecord(null);
    setUploadedFileName(null);
  };

  // ── Flow handlers ────────────────────────────────────
  const handlePatientSave = (data) => {
    setPatientData(data);
    setAppStep(3);
  };

  const handleExtractionResult = (result, fileName) => {
    setExtractionResult(result);
    setUploadedFileName(fileName || null);

    // Auto-save to records
    const newRecord = {
      id: Date.now().toString(),
      uploadedAt: new Date().toISOString(),
      patientData,
      fileName: fileName || null,
      labResults: result.labResults || [],
      observations: result.observations || [],
    };
    const updated = [...records, newRecord];
    setRecords(updated);
    if (user?.email) saveRecords(user.email, updated);
    setLastSavedAt(newRecord.uploadedAt);
    setAppStep(4);
  };

  const handleViewRecord = (record) => {
    setViewedRecord(record);
    setAppStep(5);
  };

  const handleDeleteRecord = (id) => {
    const updated = records.filter(r => r.id !== id);
    setRecords(updated);
    if (user?.email) saveRecords(user.email, updated);
  };

  // ── Not logged in → Login page ───────────────────────
  if (!user) {
    return (
      <>
        <div
          style={{
            position: 'fixed', top: 20, left: 20, zIndex: 100,
            display: 'flex', alignItems: 'center', gap: 8,
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="28" height="28" aria-hidden="true">
            <rect width="40" height="40" rx="8" fill="#1E293B" />
            <path d="M14 8 h8 l6 6 v18 h-14 z" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinejoin="round" />
            <path d="M22 8 v6 h6" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinejoin="round" />
            <line x1="18" y1="23" x2="26" y2="23" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span style={{ fontFamily:'var(--font-sans)', fontWeight:800, color:'var(--color-navy)', fontSize:'var(--text-base)' }}>
            MedLens
          </span>
        </div>
        <Login onLogin={handleLogin} />
      </>
    );
  }

  // ── Logged in ────────────────────────────────────────
  return (
    <div id="app" style={{ minHeight:'100vh', display:'flex', flexDirection:'column' }}>
      <Header
        goHome={goToDashboard}
        goHowItWorks={() => setAppStep(1)}
        currentStep={appStep}
        user={user}
        onLogout={handleLogout}
      />

      <main className="app-main" style={{ flex: 1 }}>
        <div key={appStep} className="page-transition">
          {appStep === 0 && (
            <Dashboard
              user={user}
              records={records}
              onAddReport={() => setAppStep(2)}
              onViewRecord={handleViewRecord}
              onDeleteRecord={handleDeleteRecord}
            />
          )}
          {appStep === 1 && (
            <HowItWorks
              onStart={() => setAppStep(2)}
              onBack={goToDashboard}
            />
          )}
          {appStep === 2 && (
            <PatientForm
              onSave={handlePatientSave}
              onBack={goToDashboard}
            />
          )}
          {appStep === 3 && (
            <ReportUpload
              patient={patientData}
              onResult={handleExtractionResult}
              onBack={() => setAppStep(2)}
            />
          )}
          {appStep === 4 && extractionResult && (
            <Results
              data={extractionResult}
              patientName={patientData?.name}
              fileName={uploadedFileName}
              savedAt={lastSavedAt}
              onNewAnalysis={() => setAppStep(2)}
              onBackToDashboard={goToDashboard}
            />
          )}
          {appStep === 5 && viewedRecord && (
            <Results
              data={{ labResults: viewedRecord.labResults, observations: viewedRecord.observations }}
              patientName={viewedRecord.patientData?.name}
              fileName={viewedRecord.fileName}
              savedAt={viewedRecord.uploadedAt}
              viewMode
              onBackToDashboard={goToDashboard}
              onNewAnalysis={() => setAppStep(2)}
            />
          )}
        </div>
      </main>

      <footer
        style={{
          borderTop: '1px solid var(--color-border)',
          backgroundColor: 'var(--color-surface)',
          padding: 'var(--space-24) var(--space-32)',
          textAlign: 'center',
        }}
      >
        <p style={{ fontSize:'var(--text-sm)', color:'var(--text-muted)', margin:0 }}>
          © 2026 MedLens · AI-assisted clinical information extraction · Not a diagnostic tool
        </p>
      </footer>
    </div>
  );
}
