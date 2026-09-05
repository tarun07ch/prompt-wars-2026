import React, { useState } from 'react';
import ProgressStepper from './ProgressStepper';

const STEPS = ['Patient Details', 'Upload Report', 'Processing', 'Results'];

const FIELDS_LEFT = [
  { id: 'name',    label: 'Full Name',           type: 'input',    placeholder: 'e.g. Priya Sharma',          required: true },
  { id: 'age',     label: 'Age',                 type: 'input',    placeholder: 'e.g. 34',                    required: true },
  { id: 'sex',     label: 'Biological Sex',      type: 'select',   options: ['Female','Male','Other'],        required: true },
  { id: 'symptoms',label: 'Presenting Symptoms', type: 'textarea', placeholder: 'e.g. fatigue, mild fever…', required: false },
];

const FIELDS_RIGHT = [
  { id: 'conditions',  label: 'Known Conditions',    type: 'textarea', placeholder: 'e.g. Type 2 diabetes, hypertension…' },
  { id: 'allergies',   label: 'Allergies',           type: 'textarea', placeholder: 'e.g. Penicillin, sulfa drugs…' },
  { id: 'medications', label: 'Current Medications', type: 'textarea', placeholder: 'e.g. Metformin 500mg daily…' },
  { id: 'additional',  label: 'Additional Notes',    type: 'textarea', placeholder: 'Any other relevant information…' },
];

function FieldGroup({ field, value, onChange, error }) {
  const commonClass = field.type === 'textarea' ? 'form-textarea' : 'form-input';
  return (
    <div className="form-group" style={{ marginBottom: 'var(--space-20)' }}>
      <label
        htmlFor={field.id}
        className={`form-label${field.required ? ' required' : ''}`}
      >
        {field.label}
      </label>
      {field.type === 'select' ? (
        <select
          id={field.id}
          name={field.id}
          value={value}
          onChange={onChange}
          className="form-select"
          aria-required={field.required}
        >
          <option value="">Select…</option>
          {field.options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : field.type === 'textarea' ? (
        <textarea
          id={field.id}
          name={field.id}
          value={value}
          onChange={onChange}
          className={commonClass}
          placeholder={field.placeholder}
          rows={3}
          aria-required={field.required}
        />
      ) : (
        <input
          id={field.id}
          name={field.id}
          type="text"
          value={value}
          onChange={onChange}
          className={commonClass}
          placeholder={field.placeholder}
          aria-required={field.required}
        />
      )}
      {error && <span className="form-error">⚠ {error}</span>}
    </div>
  );
}

export default function PatientForm({ onSave, onBack }) {
  const [form, setForm] = useState({
    name: '', age: '', sex: '', symptoms: '',
    conditions: '', allergies: '', medications: '', additional: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim())        errs.name = 'Patient name is required';
    if (!form.age.trim())         errs.age  = 'Age is required';
    else if (!/^\d+$/.test(form.age)) errs.age = 'Age must be a whole number';
    if (!form.sex)                errs.sex  = 'Please select a biological sex';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onSave({ ...form, source: 'User-provided' });
  };

  return (
    <div
      style={{
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
        padding: 'var(--space-48) var(--space-32)',
      }}
    >
      <ProgressStepper steps={STEPS} current={1} />

      <div style={{ marginBottom: 'var(--space-40)' }}>
        <span className="eyebrow">New Report · Step 1 of 3</span>
        <h2
          style={{
            fontSize: 'var(--text-3xl)',
            fontWeight: 800,
            color: 'var(--color-navy)',
            marginBottom: 'var(--space-8)',
          }}
        >
          Patient Information
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-base)' }}>
          Provide basic patient details to help contextualise the extracted report data.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'var(--space-32)',
            alignItems: 'start',
          }}
        >
          {/* Left column — primary fields */}
          <div className="card" style={{ padding: 'var(--space-32)' }}>
            <h3
              style={{
                fontSize: 'var(--text-base)',
                fontWeight: 700,
                color: 'var(--color-navy)',
                marginBottom: 'var(--space-24)',
                paddingBottom: 'var(--space-16)',
                borderBottom: '1px solid var(--color-border)',
              }}
            >
              Primary Details
            </h3>
            {FIELDS_LEFT.map(f => (
              <FieldGroup
                key={f.id}
                field={f}
                value={form[f.id]}
                onChange={handleChange}
                error={errors[f.id]}
              />
            ))}
          </div>

          {/* Right column — supporting fields + why panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-24)' }}>
            <div className="card" style={{ padding: 'var(--space-32)' }}>
              <h3
                style={{
                  fontSize: 'var(--text-base)',
                  fontWeight: 700,
                  color: 'var(--color-navy)',
                  marginBottom: 'var(--space-24)',
                  paddingBottom: 'var(--space-16)',
                  borderBottom: '1px solid var(--color-border)',
                }}
              >
                Medical Context
              </h3>
              {FIELDS_RIGHT.map(f => (
                <FieldGroup
                  key={f.id}
                  field={f}
                  value={form[f.id]}
                  onChange={handleChange}
                  error={errors[f.id]}
                />
              ))}
            </div>

            {/* "Why these details?" panel */}
            <div
              style={{
                background: 'var(--color-blue-light)',
                border: '1px solid #BFDBFE',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--space-24)',
              }}
            >
              <h4
                style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: 700,
                  color: 'var(--color-blue)',
                  marginBottom: 'var(--space-16)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}
              >
                Why these details?
              </h4>
              {[
                { title: 'Better context', body: 'Patient details help present the extracted information in a meaningful clinical context.' },
                { title: 'Clearer records', body: 'A named, dated record is easier to review than raw extracted data alone.' },
                { title: 'You stay in control', body: 'Information is never stored or shared. Everything happens in your browser session.' },
              ].map(item => (
                <div key={item.title} style={{ marginBottom: 'var(--space-16)' }}>
                  <p style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--color-navy)', marginBottom: 'var(--space-4)' }}>
                    {item.title}
                  </p>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Submit */}
        <div
          style={{
            marginTop: 'var(--space-32)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 'var(--space-16)',
          }}
        >
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onBack}
            style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-8)' }}
          >
            ← Back
          </button>
          <button type="submit" className="btn btn-primary btn-lg">
            Save &amp; Continue →
          </button>
        </div>
      </form>
    </div>
  );
}
