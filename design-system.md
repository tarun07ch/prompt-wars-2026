# MedLens Design System (`design-system.md`)

## 1. DESIGN PHILOSOPHY

The MedLens visual identity communicates precision, trust, and calm transparency. Because medical data is sensitive and can induce anxiety, the interface must prioritize clarity and structure over aesthetic flair. Form strictly follows function; every design decision serves to make dense clinical information easier to read, verify, and trace to its source without assuming the role of a diagnostician.

## 2. BRAND PERSONALITY

- Clinical
- Trustworthy
- Restrained
- Precise
- Calm
- Transparent
- Accessible

## 3. COLOR SYSTEM

The palette is grounded in muted slate blues and cool grays, avoiding the high-saturation colors typical of generic SaaS tools.

- **Primary:** Slate Navy — `#1E293B` — Main brand color, primary buttons, active states. Use for navigation and primary CTAs. Do not use for large backgrounds.
- **Primary hover:** Deep Slate — `#0F172A` — Hover state for primary buttons.
- **Secondary/accent:** Clinical Blue — `#E0F2FE` — Subtle highlighting such as selected rows and active tabs. Do not use for text or critical alerts.
- **Background:** Wash — `#F8FAFC` — Main application background.
- **Surface:** Surface — `#FFFFFF` — Cards, modals, tables, and content containers.
- **Primary text:** Ink — `#0F172A` — Headings, body text, and medical values.
- **Secondary text:** Graphite — `#475569` — Metadata, timestamps, and supporting text.
- **Border:** Rule — `#E2E8F0` — Cards, table dividers, and inputs.
- **Success:** Calm Green — `#059669` — Successful system feedback.
- **Warning/review:** Amber — `#D97706` — Attention, missing ranges, and review states.
- **Error/critical:** Muted Red — `#DC2626` — Failed uploads and validation errors.

**Medical status colors:**
- **LOW:** `#2563EB` (Blue), always paired with `↓ LOW`.
- **NORMAL:** `#059669` (Green), always paired with `✓ NORMAL`.
- **HIGH:** `#DC2626` (Red), always paired with `↑ HIGH`.
- **NOT DETERMINED:** Neutral gray treatment with the exact text `NOT DETERMINED`.

LOW/NORMAL/HIGH may be used only when the source report provides enough information to determine the status from its reference range. Never invent or infer a reference range. Medical status must never rely on color alone.

## 4. TYPOGRAPHY

**Primary Font:** Inter.  
**Secondary Font for medical values:** Roboto Mono.

- Page heading: Inter / 24px / 600 / 1.2
- Section heading: Inter / 18px / 600 / 1.3
- Card heading: Inter / 16px / 600 / 1.4
- Body: Inter / 14px / 400 / 1.5
- Supporting text: Inter / 13px / 400 / 1.4
- Labels: Inter / 12px / 500 / 1.4, standard case, not all-caps
- Buttons: Inter / 14px / 500 / 1.0
- Table text: Inter / 14px / 400 / 1.5
- Medical values/numbers: Roboto Mono / 14px / 500 / 1.5

## 5. SPACING SYSTEM

Use a strict 4px grid:
- `2px`: Micro-adjustments
- `4px`: Icon-to-text spacing
- `8px`: Closely related items
- `16px`: Standard component padding
- `24px`: Section spacing
- `32px`: Major section breaks
- `48px`: Page padding
- `64px`: Empty-state padding

## 6. BORDER RADIUS

- Buttons: 4px
- Inputs: 4px
- Cards: 8px
- Modals: 8px
- Badges/status indicators: 4px
- Do not use fully rounded pills for generic UI elements.

## 7. SHADOWS

Use shadows only to communicate elevation:
- Cards: `0 1px 2px 0 rgba(15, 23, 42, 0.05)`
- Hover: `0 4px 6px -1px rgba(15, 23, 42, 0.1)`
- Modals/dropdowns: `0 10px 15px -3px rgba(15, 23, 42, 0.1)`

## 8. LAYOUT SYSTEM

- Maximum content width: **1200px**
- Minimum viewport width: `320px`
- Desktop: 64px top navigation; centered main content
- Tablet: 24px page padding
- Mobile: 16px page padding; full-width cards
- Prefer top navigation to preserve horizontal space for medical data
- Main hierarchy: Breadcrumbs → Page Title → Global Actions → Main Content
- Export/Print actions should only appear if those features are actually implemented.

## 9. COMPONENT DESIGN RULES

- **Buttons:** Flat backgrounds, 1px border, no gradients or inner shadows.
- **Inputs:** White background, `#E2E8F0` border; focus uses `#2563EB` and `0 0 0 2px #BFDBFE`.
- **Cards:** White background, 1px `#E2E8F0` border, subtle shadow.
- **Tables:** Horizontal dividers only; left-align text and right-align numbers.
- **Medical result rows:** Unified grid; no zebra striping; subtle bottom borders.
- **Status indicators:** 4px radius, icon + explicit text; support LOW, NORMAL, HIGH, NOT DETERMINED.
- **Alerts:** 4px left border with a pale intent-matching background.
- **Loading:** Simple spinner or static skeleton with clear progress text.
- **Empty states:** Explain what is missing and provide a next action.
- **Errors:** Explain the problem and provide a recovery action when possible.

## 10. MEDICAL DATA VISUALIZATION

Example:

**Hemoglobin — 11.2 g/dL — Reference: 12.0–15.5 g/dL — LOW — Source: Blood_Report.pdf**

Desktop hierarchy:
1. Test name: Inter, 14px, medium
2. Value: Roboto Mono, 14px; unit remains visually distinct
3. Status: Light-blue badge with `↓ LOW`
4. Reference range: Graphite, 13px
5. Source: Document icon + `Blood_Report.pdf`, 12px

If the source report does not provide a reference range, display **`Not provided`** and status **`NOT DETERMINED`**. Never invent or infer a range.

The source should open or display the relevant source document when available. Exact PDF text highlighting is optional and must NOT be implemented if it risks the core MVP timeline.

On mobile, stack the result as a card: test name/status → value → reference range → source.

## 11. PROVENANCE DESIGN

Every medical fact should be traceable to its origin without clutter.

- **User-provided:** User icon + `Entered by user`
- **Report-extracted:** Document icon + `From report: [filename]`
- **AI-generated:** Distinct bordered card with `AI-Generated Summary — Please verify with original reports.`
- **Needs verification:** Dashed amber border + `Review & Confirm`

## 12. SAFETY / REVIEW STATES

- **Information conflict:** Pale amber/yellow treatment with `Conflict detected — human verification required`.
- **Missing reference range:** `Not provided` + `NOT DETERMINED`.
- **Uncertain extraction:** Amber non-color-only indicator + `Needs review`.
- **Human verification:** Amber treatment + `Review & Confirm`.

MedLens must never resolve a medical conflict by guessing which information is correct.

## 13. RESPONSIVE DESIGN

- Desktop (>1024px): Multi-column tables; side-by-side source/extracted views when practical.
- Tablet (768–1023px): Tables where readable; source view can become a toggle/modal.
- Mobile (<767px): Convert tables to stacked cards; core medical data must wrap naturally without horizontal scrolling.

## 14. ACCESSIBILITY

- All normal text must meet WCAG AA contrast (4.5:1).
- All interactive elements require a visible 2px `#2563EB` focus ring with 2px offset.
- Use semantic `<th>` and `<td>` for tables.
- Meaningful icon buttons need accessible labels; decorative icons should be hidden from screen readers.
- Never rely on color alone for medical status.
- Every input needs a visible label or accessible equivalent.
- Validation errors must identify the field and explain correction.
- Maintain sufficiently large mobile touch targets.

## 15. MOTION / ANIMATION

Keep motion minimal.
- Animate: hover/focus feedback, modal fades, dropdown opening/closing.
- Do not animate: page transitions, decorative AI effects, or typing effects for summaries.
- Default duration: `150ms ease-in-out`.
- Respect reduced-motion preferences.

## 16. ICONOGRAPHY

- Use Phosphor Icons or Lucide, line style.
- Prefer 1.5px stroke.
- 16px inline icons; 24px empty-state icons.
- Use icons for meaning, not decoration.

## 17. DESIGN TOKENS

```css
--color-primary: #1E293B;
--color-primary-hover: #0F172A;
--color-accent: #E0F2FE;
--color-bg: #F8FAFC;
--color-surface: #FFFFFF;
--color-border: #E2E8F0;

--text-primary: #0F172A;
--text-secondary: #475569;

--color-success: #059669;
--color-warning: #D97706;
--color-error: #DC2626;

--status-low-bg: #DBEAFE;
--status-low-text: #1D4ED8;
--status-normal-bg: #D1FAE5;
--status-normal-text: #047857;
--status-high-bg: #FEE2E2;
--status-high-text: #B91C1C;
--status-unknown-bg: #F1F5F9;
--status-unknown-text: #475569;

--font-sans: 'Inter', system-ui, sans-serif;
--font-mono: 'Roboto Mono', monospace;

--space-2: 2px;
--space-4: 4px;
--space-8: 8px;
--space-16: 16px;
--space-24: 24px;
--space-32: 32px;
--space-48: 48px;
--space-64: 64px;

--radius-sm: 4px;
--radius-md: 8px;

--shadow-card: 0 1px 2px 0 rgba(15,23,42,0.05);
--shadow-hover: 0 4px 6px -1px rgba(15,23,42,0.1);
--shadow-modal: 0 10px 15px -3px rgba(15,23,42,0.1);
--transition-fast: 150ms ease-in-out;
```

## 18. PAGE-LEVEL VISUAL HIERARCHY

### A. Dashboard
- Primary focus: Processed patient records
- Main CTA: `New Patient Intake`

### B. Patient Information Intake
- Primary focus: Clean single-column form
- Main CTA: `Save & Continue`
- Supporting elements: Labels, validation, user-provided source indicator

### C. Medical Report Upload
- Primary focus: Large dashed dropzone
- Supporting elements: Accepted file types and concise privacy notice
- Main CTA: `Upload Report`

### D. Processing State
- Primary focus: Clear processing status
- Supporting text: `Extracting laboratory values...`, `Identifying reference ranges...`
- Never imply completion before processing actually completes

### E. Structured Patient Record
- Primary focus: Structured medical data
- Secondary: Patient header and provenance
- Main CTA: `Review Values`
- Optional `Export Record` only if implemented

### F. AI Summary
- Primary focus: Short patient-friendly summary
- Required disclaimer: `Non-diagnostic summary. Verify all values with source reports.`
- Never diagnose, prescribe, recommend dosage changes, or present uncertainty as fact

### G. Review / Conflicts
- Primary focus: Conflicting or uncertain information
- Secondary: Source information needed for verification
- Main CTA: `Review & Confirm` / `Edit`
- Never automatically choose between conflicting medical facts

## 19. UI COPY STYLE

Voice: clear, calm, professional, human, patient-friendly, non-diagnostic.

Examples:
- Buttons: `Upload Report`, `Review Values`, `Save & Continue`
- Empty: `No laboratory results found in this report.`
- Loading: `Processing document...`
- Error: `Reference range not detected. Status cannot be verified.`
- Success: `Document processed successfully.`
- Review: `This information differs from another provided source. Please review and confirm.`

Avoid phrases such as `AI is working its magic`, `Unlock insights`, or other hype-driven copy.

## 20. DESIGN ANTI-PATTERNS

1. No glowing purple/blue AI gradients.
2. No unnecessary charts or analytics widgets.
3. No heavy floating-card shadows.
4. No excessive pill shapes.
5. No entire rows colored red/green for medical status.
6. No huge marketing-style headers or tight tracking.
7. No decorative complexity that does not improve understanding.
8. No generic AI marketing copy.
9. No unnecessary animations.
10. No UI that makes medical information look like a diagnosis.

## 21. FINAL IMPLEMENTATION RULES

1. Strictly limit the color palette.
2. Favor Flexbox for components and Grid for page layouts.
3. Every medical fact must have provenance or a clearly stated source category.
4. Never infer a missing reference range.
5. Keep values and units visually distinct.
6. Status badges support LOW, NORMAL, HIGH, and NOT DETERMINED.
7. Do not truncate clinically important text.
8. Use monospace for laboratory values and reference ranges.
9. Show AI disclaimers wherever AI-generated information appears, especially the AI Summary.
10. Optimize for high-density scanning without sacrificing readability or accessibility.

## 22. PRIVACY-SENSITIVE UI RULES

MedLens handles potentially sensitive medical information. The interface must communicate privacy and responsible handling clearly without making unsupported security claims.

1. Never display API keys, secrets, tokens, or credentials in the interface.
2. Never display sensitive medical information in developer-facing UI such as debug panels or visible console output.
3. Do not expose unnecessary patient information in URLs.
4. Avoid displaying more patient information than is necessary for the current screen.
5. Privacy notices must use clear, plain language.
6. Do not claim that data is `100% secure`, `HIPAA compliant`, or similarly certified unless that has actually been established.
7. When showing uploaded documents, clearly identify the document and its source.
8. Patient-provided information, report-extracted information, and AI-generated information must remain visually distinguishable.
9. Destructive actions such as deleting a patient record or uploaded report must require deliberate user confirmation.
10. The interface must never imply that MedLens replaces a qualified healthcare professional.
