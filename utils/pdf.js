const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");
const Handlebars = require("handlebars");

const compileTemplateToHtml = async (templateName, data ) => {
  try {

    const templateFilePath = path.join("utils", `${templateName}.hbs`);

    const fileData = fs.readFileSync(templateFilePath, "utf8");
    console.log(data);

    data = {
        headers: {
          printDate: '2024-9-16',
          from: '2024-01-01',
          to: '2024-09-10',
          branchName: {
            name: 'Friends Ice',
            Address: 'Eramalloor, Alappuzha ',
            Address1: '7510343813',
            Address2: '',
            TIN: '5525252521',
            GSTIN: 'D152251515215125'
          },
          total: {
            qty: 120,
            tax: 465,
            avgPrice: 81.375,
            totalSale: 9765
          }
        },
        items: [{
            invoiceNo: 14,
            invoicetype: 'Sales',
            custCode: 'XYZ Cor',
            salesDate: '2024-3-9',
            taxAmount: 77.5,
            quantity: 20,
            totalPrice: 1627.5
          },
          {
            invoiceNo: 16,
            invoicetype: 'Sales',
            custCode: 'XYZ Cor',
            salesDate: '2024-3-9',
            taxAmount: 155,
            quantity: 40,
            totalPrice: 1627.5
          },
          {
            invoiceNo: 17,
            invoicetype: 'Sales',
            custCode: 'XYZ Cor',
            salesDate: '2024-3-9',
            taxAmount: 232.5,
            quantity: 60,
            totalPrice: 1627.5
          },
          {
            invoiceNo: 18,
            invoicetype: 'Sales',
            custCode: 'XYZ Cor',
            salesDate: '2024-3-9',
            taxAmount: 310,
            quantity: 80,
            totalPrice: 1627.5
          },
          {
            invoiceNo: 19,
            invoicetype: 'Sales',
            custCode: 'XYZ Cor',
            salesDate: '2024-3-9',
            taxAmount: 387.5,
            quantity: 100,
            totalPrice: 1627.5
          },
          {
            invoiceNo: 20,
            invoicetype: 'Sales',
            custCode: 'XYZ Cor',
            salesDate: '2024-3-9',
            taxAmount: 465,
            quantity: 120,
            totalPrice: 1627.5
          }
        ]
      };
   
    return Handlebars.compile(fileData)(data);
  } catch (error) {
    throw error;
  }
};
const generateHtmlToPdf = async (htmlContent) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      ignoreDefaultArgs: ["--disable-extensions"],
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--hide-scrollbars",
        "--disable-gpu",
        "--mute-audio",
        "--disable-dev-shm-usage",
      ],
    });
    const page = await browser.newPage();
    await page.setContent(htmlContent);
    const pdf = await page.pdf({
      landscape: true,
    });
    browser.close();
    return pdf;
  } catch (error) {
    
    console.log(error);
    throw error;
  }
};

module.exports = {
  compileTemplateToHtml,
  generateHtmlToPdf,
};
