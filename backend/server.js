const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { PDFParse } = require('pdf-parse');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/', (req, res) => {
  res.send('MedLens backend is running');
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
        error: 'No file uploaded.',
      });
    }

    const mime = req.file.mimetype || '';

    if (mime !== 'application/pdf') {
      return res.status(400).json({
        success: false,
        error: 'Only PDF files are accepted.',
      });
    }

    // Verify that the uploaded file is actually a PDF.
    const pdfSignature = req.file.buffer.subarray(0, 4).toString();

    if (pdfSignature !== '%PDF') {
      return res.status(400).json({
        success: false,
        error: 'The uploaded file is not a valid PDF.',
      });
    }

    // Extract text using the installed pdf-parse API.
    const parser = new PDFParse({
      data: req.file.buffer,
    });

    const result = await parser.getText();
    const extractedText = (result.text || '').trim();

    await parser.destroy();

    if (!extractedText) {
      return res.status(422).json({
        success: false,
        error: 'No readable text was found in this PDF.',
      });
    }

    return res.json({
      success: true,
      document: {
        fileName: req.file.originalname,
        type: 'medical_report',
      },
      text: extractedText,
    });
  } catch (error) {
    console.error('Report processing error:', error.message);

    return res.status(500).json({
      success: false,
      error: 'The medical report could not be processed.',
    });
  }
});

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({
        success: false,
        error: 'The PDF must be 5 MB or smaller.',
      });
    }

    return res.status(400).json({
      success: false,
      error: 'The uploaded file could not be processed.',
    });
  }

  console.error('Unexpected server error:', err.message);

  return res.status(500).json({
    success: false,
    error: 'An unexpected server error occurred.',
  });
});

app.listen(PORT, () => {
  console.log(`MedLens backend listening on port ${PORT}`);
});