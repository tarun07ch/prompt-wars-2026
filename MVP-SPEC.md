# MedLens MVP Specification

## 1. PROJECT IDENTITY

**Project Name:** MedLens

**Project Title:** MedLens — AI-Powered Clinical Information Intelligence

**Project Type:** AI-powered clinical information organization and review application

**Primary Goal:**

MedLens collects patient information and processes medical reports to create a structured, understandable, reviewable patient record.

The application is designed to reduce the difficulty of reviewing scattered medical information by organizing patient-provided information, report-extracted information, reference-range status, source/provenance information, and a patient-friendly AI-generated summary in one interface.

---

## 2. PROBLEM WE ARE SOLVING

Medical information can be scattered across:

- Patient history
- Prescriptions
- Laboratory reports
- Previous medical records
- Other provided medical documents

This makes information difficult to organize and review efficiently.

MedLens addresses this problem by turning provided medical information into a structured record that is easier to understand and verify.

The application must prioritize:

- Structured information
- Traceability
- Source awareness
- Reference-range awareness
- Human review
- Clear communication
- Responsible AI behavior

---

## 3. MVP OBJECTIVE

The MVP must demonstrate one complete working journey:

```text
Create Patient
      ↓
Enter Patient Information
      ↓
Upload Medical Report
      ↓
Process Report
      ↓
Extract Structured Medical Information
      ↓
Determine Reference-Range Status
      ↓
Display Source / Provenance
      ↓
Generate Patient-Friendly AI Summary
      ↓
Review Information