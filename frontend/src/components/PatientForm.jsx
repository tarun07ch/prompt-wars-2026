import React, { useState } from 'react';

function PatientForm({ onSave }) {
  const [form, setForm] = useState({
    name: '',
    age: '',
    sex: '',
    symptoms: '',
    conditions: '',
    allergies: '',
    medications: '',
    additional: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Patient name is required';
    if (!form.age.trim()) newErrors.age = 'Age is required';
    else if (!/^[0-9]+$/.test(form.age)) newErrors.age = 'Age must be a number';
    if (!form.sex) newErrors.sex = 'Sex is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length) {
      setErrors(validation);
      return;
    }
    const typedData = {
      ...form,
      source: 'User-provided',
    };
    onSave(typedData);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2 style={{ marginBottom: 'var(--space-16)' }}>Patient Information</h2>
      <label htmlFor="name">Patient Name *</label>
      <input id="name" name="name" type="text" value={form.name} onChange={handleChange} />
      {errors.name && <div className="error">{errors.name}</div>}

      <label htmlFor="age">Age *</label>
      <input id="age" name="age" type="text" value={form.age} onChange={handleChange} />
      {errors.age && <div className="error">{errors.age}</div>}

      <label htmlFor="sex">Sex *</label>
      <select id="sex" name="sex" value={form.sex} onChange={handleChange}>
        <option value="">Select…</option>
        <option value="Female">Female</option>
        <option value="Male">Male</option>
        <option value="Other">Other</option>
      </select>
      {errors.sex && <div className="error">{errors.sex}</div>}

      <label htmlFor="symptoms">Symptoms</label>
      <textarea id="symptoms" name="symptoms" rows={3} value={form.symptoms} onChange={handleChange} />

      <label htmlFor="conditions">Existing Conditions</label>
      <textarea id="conditions" name="conditions" rows={3} value={form.conditions} onChange={handleChange} />

      <label htmlFor="allergies">Allergies</label>
      <textarea id="allergies" name="allergies" rows={3} value={form.allergies} onChange={handleChange} />

      <label htmlFor="medications">Medications</label>
      <textarea id="medications" name="medications" rows={3} value={form.medications} onChange={handleChange} />

      <label htmlFor="additional">Additional Information</label>
      <textarea id="additional" name="additional" rows={3} value={form.additional} onChange={handleChange} />

      <button type="submit" style={{ marginTop: 'var(--space-24)' }}>
        Save &amp; Continue
      </button>
    </form>
  );
}

export default PatientForm;
