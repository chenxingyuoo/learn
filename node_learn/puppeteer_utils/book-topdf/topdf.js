const fs = require("fs");
const PDFDocument = require('pdfkit');


// let WStream = fs.createWriteStream('Aim.pdf')

// let readStream = fs.createReadStream('1.png');

// readStream.pipe(WStream, {end: false})


// pdfo.pipe(readStream)


const doc = new PDFDocument();


doc.pipe(fs.createWriteStream('output.pdf'))

const opts = {
  width: 550,
  height: 3000
  // align: 'center',
  // valign: 'center'
}
doc.image('public/images/chrome-dev/1.png',opts);
doc.image('public/images/chrome-dev/2.png',opts);
// doc.image('public/images/chrome-dev/3.png', opts);

doc.end();