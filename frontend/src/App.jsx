import React from 'react';
import Header from './components/Header';
import PatientForm from './components/PatientForm';
import ReportUpload from './components/ReportUpload';
import './designTokens.css';

function App() {
  const [step, setStep] = React.useState(1);
  const [patientData, setPatientData] = React.useState(null);

  const handlePatientSave = (data) => {
    setPatientData(data);
    setStep(2);
  };

  return (
    <div className="app" style={{fontFamily: 'var(--font-sans)'}}>
      <Header />
      <main style={{padding: 'var(--space-24)', maxWidth: '1200px', margin: '0 auto'}}>
        {step === 1 && <PatientForm onSave={handlePatientSave} />}
        {step === 2 && <ReportUpload patient={patientData} />}
      </main>
    </div>
  );
}

export default App;
