const dailySales = require("../models/dailyModel");
const branch = require("../models/branchModel");
const Customer = require("../models/customerModel");
const { compileTemplateToHtml, generateHtmlToPdf } = require("../utils/pdf");

let qty;
let tax;
let avgPrice;
let totalitem;

async function getInvoice(req, res) {
  try {
    const payload = []; // items
    const headers = {};
    const total = {};
    const branchName = {};
    const final = {};
    var query = {
      branchCode: req.body.branchCode,
      salesDate: {
        $gte: req.body.dateFrom,
        $lte: req.body.dateTo,
      },
      custCode: req.body.custCode || {
        $gte: 0,
      },
    };

    const result = await dailySales.find(query);
    let date_time = new Date();
    let date = date_time.getDate();
    let month = date_time.getMonth() + 1;
    let year = date_time.getFullYear();

    headers.printDate = year + "-" + month + "-" + date;
    headers.from = req.body.dateFrom;
    headers.to = req.body.dateTo;


    const branch_data = await branch.findOne({
      branchCode: Number(req.body.branchCode)
    });
    branchName.name = branch_data.branchName;
    branchName.Address = branch_data.address;
    branchName.Address1 = branch_data.mobileNo;
    branchName.Address2 = "";
    branchName.TIN = branch_data.tinNo;
    branchName.GSTIN = branch_data.gstNo;

    headers.branchName = req.body.branchCode;
    headers.branchName = branchName;

    if (result.length > 0) {
      if (req.body.cancelled === false) {
        qty = "";
        tax = "";
        avgPrice = "";
        totalitem = "";
        for (let index = 0; index < result.length; index++) {
          const element = result[index];
          if (element.orderType === 'OR') {
            var lv_invoicetype = "Sales"
          } else {
            lv_invoicetype = "Return"
          }
          lv_date = element.salesDate;
          date = lv_date.getDate();
          month = lv_date.getMonth() + 1;
          year = lv_date.getFullYear();
          const customer = await Customer.findOne({
            customerCode: element.custCode
          });
          if (element.returnRef != "") {

          } else {
            element.productDetails.forEach(items => {

              const jsonData = JSON.parse(JSON.stringify(items));             
              qty = parseFloat(qty + jsonData.qunatity);          
              tax =  parseFloat( tax + jsonData.taxAmount);
              totalitem = parseFloat(totalitem + jsonData.netAmount);
            });

            payload.push({
              invoiceNo: element.invoiceNo,
              invoicetype: lv_invoicetype,
              custCode: customer.customerName,
              salesDate: year + "-" + month + "-" + date,
              taxAmount: tax,
              quantity: qty,
              totalPrice: element.totalAmount,
            });
          }
        }
      } else {

        qty = "";
        tax = "";
        avgPrice = "";
        totalitem = "";
        for (let index = 0; index < result.length; index++) {
          const element = result[index];

          if (element.orderType === 'OR') {
            var lv_invoicetype = "Sales";
          } else {
            lv_invoicetype = "Return";
          }
          element.productDetails.forEach(items => {
            const jsonData = JSON.parse(JSON.stringify(items));             
            qty = parseFloat(qty + jsonData.qunatity);          
            tax =  parseFloat( tax + jsonData.taxAmount);
            totalitem = parseFloat(totalitem + jsonData.netAmount);
          });
          lv_date = element.salesDate;
          date = lv_date.getDate();
          month = lv_date.getMonth() + 1;
          year = lv_date.getFullYear();
          const customer = await Customer.findOne({
            customerCode: element.custCode
          });

          payload.push({
            invoiceNo: element.invoiceNo,
            invoicetype: lv_invoicetype,
            salesDate: year + "-" + month + "-" + date,
            totalPrice: element.totalAmount,
            custCode: customer.customerName,
          });
        }


      }

      total.qty = qty;
      total.tax = tax;
      total.avgPrice = totalitem / qty;
      total.totalSale = totalitem;

      headers.total = total;
      final.headers = headers;
      final.items = payload;     
      
      const html = await compileTemplateToHtml("template",final);
      const pdf = await generateHtmlToPdf(html);
      const buf = Buffer.from(pdf);
      console.log(buf);
      res.set({
        "Content-Type": "application/pdf",
        "Content-Length": pdf.length,
      });
      res.send(buf);

      // res.status(200).json(final);
    } else {
      res.status(400).json({
        Message: "No sales on the Specified Selection",
      });
    }
  } catch (error) {
    console.log(error);
  } finally {}
}

module.exports = {
  getInvoice,
};