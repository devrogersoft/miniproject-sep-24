const dailySales = require("../models/dailyModel");
const Material = require("../models/materialModel");
const { getMaterial } = require("../controllers/materialController");

async function salesInvoice(req, res) {
  try {
    let payload = {};
    payload = req.body;
    console.log("before validation");
    const message = await validation(payload);
    if (message != null) {
      res.status(410).json(message);
    } else {
      const docCount = await dailySales.countDocuments({}).exec();
      payload.invoiceNo = docCount + 1;
      const daily = new dailySales(payload);
      daily.save();
      console.log("after validation");
      res.status(200).json({
        "Message": "Sales Created Sucessfully",
        "Invoice No": payload.invoiceNo
      });
    }
  } catch (err) {
    res.status(401).json({ "Message": err })
  }
  finally {
  }
}

async function validation(payload) {
  // validate fields
  var error = null;
  if (!payload.branchCode) {
    error = { "message": "branchcode missing" }
  }
  if (!payload.salesDate) {
    error = { "message": "sales Date missing" }
  }
  if (!payload.custCode) {
    error = { "message": "Customer Code missing" }
  }
  if (!payload.orderType) {
    error = { "message": "Order Type missing" }
  } else {
    if (payload.orderType === 'OR' || payload.orderType === 'RE') {
    } else {
      error = { "message": "Invalid Order Type" };
    }
  }
  if (payload.orderType === 'RE') {
    if (!payload.returnRef) {
      error = { "message": "Enter Return Reference No" }
    }
  }
  if (!payload.totalAmount) {
    error = { "message": "Total Amount missing" }
  }

  for (let index = 0; index < payload.productDetails.length; index++) {
    const element = payload.productDetails[index];
    if (!element.material) {
      error = { "message": "Material missing " + index }
    }
    else {
      const value = await Material.find({ materialCode: element.material });
       if (value.length > 0 ) {  
      }
      else{
         error = { "message": "Wrong Material Code "}
      }
    }
  }


  // if (!element.qunatity) {
  //   error = { "message": "Qunatity missing " + i }
  // }
  // if (!element.value) {
  //   error = { "message": "Value missing " + i }
  // }
  // if (!element.total) {
  //   error = { "message": "Total missing " + i }
  // }
  // if (!element.taxPercentage) {
  //   error = { "message": "Tax Percentage missing " + i }
  // }
  // if (!element.taxAmount) {
  //   error = { "message": "Tax Amount missing " + i }
  // }
  // if (!element.netAmount) {
  //   error = { "message": "Net Amount missing " + i }
  // }

  // Validate customer


  // validate material
  // validate branchcode



  return error;
}




module.exports = {
  salesInvoice,
};
