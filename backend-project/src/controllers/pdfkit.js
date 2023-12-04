const PDFDocument = require("pdfkit");
const Product = require('../models/productModel');

async function buildPDF(dataCallback, endCallback) {
  const doc = new PDFDocument();

  doc.on("data", dataCallback);
  doc.on("end", endCallback);

  const products = await Product.find({ available: false });

  doc.fontSize(16).text("Factura de Inventario", { align: 'center' });


  doc.text(`Cantidad de productos agotados ${products.length}`);

  doc.end();
}

const getPDFReport = async (req, res) => {
  const stream = res.writeHead(200, {
    "Content-Type": "application/pdf",
    "Content-Disposition": "attachment; filename=invoice.pdf",
  });

  buildPDF(
    (data) => stream.write(data),
    () => stream.end()
  );

/*   res.send("invoice"); */
};

module.exports = {
  getPDFReport,
};
