require('dotenv').config({
  path: require('path').join(__dirname, '.env'),
});

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { PDFParse } = require('pdf-parse');
const { GoogleGenAI } = require('@google/genai');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/', (req, res) => {
  res.json({
    name: 'MedLens Backend',
    status: 'running',
  });
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

app.post('/api/reports/process', upload.single('report'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No report file provided.',
      });
    }

    if (req.file.mimetype !== 'application/pdf') {
      return res.status(400).json({
        success: false,
        error: 'Only PDF files are supported.',
      });
    }

    const parser = new PDFParse({ data: req.file.buffer });
    const result = await parser.getText();
    const extractedText = (result.text || '').trim();

    return res.json({
      success: true,
      document: {
        fileName: req.file.originalname,
        type: 'medical_report',
      },
      text: extractedText,
    });
  } catch (error) {
    console.error('PDF processing failed:', error.message);

    return res.status(500).json({
      success: false,
      error: 'Unable to process the medical report.',
    });
  }
});

app.post('/api/reports/extract', async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || typeof text !== 'string' || !text.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Medical report text is required.',
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        success: false,
        error: 'Gemini API key is not configured.',
      });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const schema = {
      type: 'object',
      properties: {
        labResults: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              testName: { type: 'string' },
              value: { type: 'number' },
              unit: { type: 'string' },
              referenceRange: {
                anyOf: [
                  {
                    type: 'object',
                    properties: {
                      low: { type: 'number' },
                      high: { type: 'number' },
                      source: { type: 'string', enum: ['report'] },
                    },
                    required: ['low', 'high', 'source'],
                  },
                  { type: 'null' },
                ],
              },
              status: {
                type: 'string',
                enum: [
                  'LOW',
                  'NORMAL',
                  'HIGH',
                  'NOT_DETERMINED',
                ],
              },
              source: {
                type: 'object',
                properties: {
                  type: {
                    type: 'string',
                    enum: ['medical_report'],
                  },
                  document: { type: 'string' },
                },
                required: ['type', 'document'],
              },
            },
            required: [
              'testName',
              'value',
              'unit',
              'referenceRange',
              'status',
              'source',
            ],
          },
        },
        observations: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
      },
      required: ['labResults', 'observations'],
    };

    const prompt = `
You are the MedLens medical information extraction engine.

Extract structured information ONLY from the medical report text provided below.

STRICT SAFETY RULES:
- Do not diagnose.
- Do not recommend treatment.
- Do not recommend or change medication dosage.
- Do not invent medical values.
- Do not invent reference ranges.
- Use reference ranges ONLY when explicitly present in the report.
- If a reference range is absent, referenceRange MUST be null and status MUST be "NOT_DETERMINED".
- Determine LOW, NORMAL, or HIGH only by comparing the reported value with the reference range explicitly provided in the report.
- Do not infer missing information.
- This is information extraction, not medical diagnosis.

For every extracted laboratory result, preserve its source as:
type = "medical_report"
document = "provided_report"

Return ONLY valid JSON matching the requested schema.

MEDICAL REPORT:
${text}
`;

    const interaction = await ai.interactions.create({
      model: 'gemini-3.6-flash',
      input: prompt,
      response_format: {
        type: 'text',
        mime_type: 'application/json',
        schema,
      },
    });

    const rawOutput = interaction.output_text;

    if (!rawOutput) {
      return res.status(502).json({
        success: false,
        error: 'Gemini returned no structured output.',
      });
    }

    let data;

    try {
      data = JSON.parse(rawOutput);
    } catch {
      return res.status(502).json({
        success: false,
        error: 'Gemini returned invalid JSON.',
      });
    }

    if (
      !data ||
      !Array.isArray(data.labResults) ||
      !Array.isArray(data.observations)
    ) {
      return res.status(502).json({
        success: false,
        error: 'Gemini returned an invalid MedLens structure.',
      });
    }

    const validStatuses = new Set([
      'LOW',
      'NORMAL',
      'HIGH',
      'NOT_DETERMINED',
    ]);

    for (const result of data.labResults) {
      if (
        !result ||
        typeof result.testName !== 'string' ||
        typeof result.value !== 'number' ||
        typeof result.unit !== 'string' ||
        !validStatuses.has(result.status) ||
        !result.source ||
        result.source.type !== 'medical_report'
      ) {
        return res.status(502).json({
          success: false,
          error: 'Gemini returned an invalid laboratory result.',
        });
      }

      if (result.referenceRange === null) {
        if (result.status !== 'NOT_DETERMINED') {
          return res.status(502).json({
            success: false,
            error: 'Invalid status for missing reference range.',
          });
        }
      } else {
        if (
          typeof result.referenceRange.low !== 'number' ||
          typeof result.referenceRange.high !== 'number' ||
          result.referenceRange.source !== 'report'
        ) {
          return res.status(502).json({
            success: false,
            error: 'Invalid reference range.',
          });
        }
      }
    }

    return res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error('AI extraction failed:', error.message);

    return res.status(500).json({
      success: false,
      error: 'Unable to extract structured information from the report.',
    });
  }
});

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        error: 'PDF file must be 5 MB or smaller.',
      });
    }
  }

  console.error('Unhandled backend error:', err.message);

  return res.status(500).json({
    success: false,
    error: 'Unexpected server error.',
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});