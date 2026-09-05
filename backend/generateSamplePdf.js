const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = '/Users/tarun/Downloads/prompt-wars-2026/sample.pdf';

const doc = new PDFDocument();
const stream = fs.createWriteStream(path);
doc.pipe(stream);

doc.fontSize(20).text('Test Report', { align: 'center' });

doc.moveDown();

doc.fontSize(12).text('Patient Name: John Doe');

doc.text('Age: 45');

doc.text('Sex: Male');

doc.moveDown();

doc.text('Hemoglobin: 13.5 g/dL');

doc.text('WBC: 6.2 x10^9/L');

doc.end();

stream.on('finish', () => {
  console.log('Sample PDF generated at', path);
});
