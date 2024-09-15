const dailySales = require("../models/dailyModel");
const Material = require("../models/materialModel");
const branch = require("../models/branchModel");
//const {  json } = require("generate-schema");

async function getInvoice(req, res) {
  try {
    const invoiceNo = Number(req.params.invoiceNo);
    let result = await dailySales.findOne({
      invoiceNo: invoiceNo
    }, {
      createdDate: 0,
      updatedAt: 0,
      _id: 0,
      __v: 0,
      numberDecimal: 0,
    });

    if (result != undefined) {
      const stringResult = JSON.parse(JSON.stringify(result));
      delete stringResult._id;
      delete stringResult.id;
      for (const element of stringResult.productDetails) {
        delete element.id;
        delete element._id;
      }
      res.status(200).json(stringResult);
    } else {
      res.status(401).json({
        "Message": "Wrong Invoice No"
      });
    }
  } catch (err) {
    res.status(401).json({
      "Message": err
    });
    console.log(err);
  } finally {}
}


async function cancelInvoice(req, res) {
  try {
    let payload = {};
    let item = {};
    let items = [];
    const invoiceNo = Number(req.params.invoiceNo);
    if (invoiceNo != null) {
      let result = await dailySales.findOne({
        invoiceNo: invoiceNo
      }, {
        _id: 0
      });
      if (result != undefined) {
        if (result.returnRef === "") { //check reversed doc
          const docCount = await dailySales.countDocuments({}).exec();
          payload.invoiceNo = docCount + 1;
          payload.orderType = "RE";
          payload.returnRef = payload.invoiceNo;
          payload.salesDate = Date();
          payload.branchCode = result.branchCode;
          payload.custCode = result.custCode;
          payload.poRef = result.poRef;
          payload.comment = result.comment;
          payload.driverDetails = result.driverDetails;
          payload.driverCommision = result.driverCommision;
          payload.totalAmount = result.totalAmount;
          payload.productDetails = result.productDetails;
          payload.totalAmount = result.totalAmount;
          for (let i = 0; i < result.productDetails.length; i++) {
            const element = result.productDetails[i];
            item.material = element.material;
            item.qunatity = element.qunatity;
            item.value = element.value;
            item.total = element.total;
            item.taxPercentage = element.taxPercentage;
            item.taxAmount = element.taxAmount;
            item.netAmount = element.netAmount;
            items.push(item);
          }
          payload.productDetails = items;
          result.returnRef = payload.invoiceNo;

          const filter = {
            invoiceNo: invoiceNo
          };
          const update1 = {
            returnRef: Number(payload.invoiceNo)
          };
          doc = await dailySales.findOneAndUpdate(filter, update1);

          const daily = new dailySales(payload);
          await daily.save();
          result = await dailySales.findOne({
            invoiceNo: payload.invoiceNo
          });
          res.status(200).json({
            "Invoice Reversed with No": payload.invoiceNo
          });
        } else {
          res.status(200).json({
            "Message": "Invoice already reversed"
          });
        }
      } else {
        res.status(401).json({
          "Message": "wrong Invoice No"
        });
      }
    }
  } catch (err) {
    res.status(401).json({
      "Message": err
    });
    console.log(err);
  } finally {}
}
async function salesInvoice(req, res) {
  try {
    let payload = {};
    payload = req.body;
    const message = await validation(payload);
    if (message != null) {
      res.status(410).json(message);
    } else {
      const docCount = await dailySales.countDocuments({}).exec();
      payload.invoiceNo = docCount + 1;
      const daily = new dailySales(payload);
      daily.save();
      res.status(200).json({
        "Message": "Sales Created Sucessfully",
        "Invoice No": payload.invoiceNo
      });
    }
  } catch (err) {
    res.status(401).json({
      "Message": err
    })
  } finally {}
}

async function validation(payload) {
  // validate fields
  try {
    var error = null;
    if (!payload.branchCode) {
      error = {
        "message": "branchcode missing"
      }
    }
    if (!payload.salesDate) {
      error = {
        "message": "sales Date missing"
      }
    }
    if (!payload.custCode) {
      error = {
        "message": "Customer Code missing"
      }
    }
    if (!payload.orderType) {
      error = {
        "message": "Order Type missing"
      }
    } else {
      if (payload.orderType === 'OR' || payload.orderType === 'RE') {} else {
        error = {
          "message": "Invalid Order Type"
        };
      }
    }
    if (payload.orderType === 'RE') {
      if (!payload.returnRef) {
        error = {
          "message": "Enter Return Reference No"
        }
      }
    }
    if (!payload.totalAmount) {
      error = {
        "message": "Total Amount missing"
      }
    }

    for (let i = 0; i < payload.productDetails.length; i++) {
      const element = payload.productDetails[i];
      if (!element.material) {
        error = {
          "message": "Material missing " + i
        }
      } else {
        // validate material
        const value = await Material.find({
          materialCode: element.material
        });

        if (value.length > 0) {} else {
          error = {
            "message": "Wrong Material Code "
          }
        }
      }
      if (!element.qunatity) {
        error = {
          "message": "Qunatity missing " + i
        }
      }
      if (!element.value) {
        error = {
          "message": "Value missing " + i
        }
      }
      if (!element.total) {
        error = {
          "message": "Total missing " + i
        }
      }
      if (!element.taxPercentage) {
        error = {
          "message": "Tax Percentage missing " + i
        }
      }
      if (!element.taxAmount) {
        error = {
          "message": "Tax Amount missing " + i
        }
      }
      if (!element.netAmount) {
        error = {
          "message": "Net Amount missing " + i
        }
      }
    }
    //Validate customer

    const branchCode = await branch.find({
      branchCode: Number(payload.branchCode)
    });

    if (branchCode.length > 0) {} else {
      error = {
        "message": "Wrong Branch Code "
      }
    }

    // validate branchcode
    return error;
  } catch (err) {
    console.log(err);
  }
}


module.exports = {
  salesInvoice,
  cancelInvoice,
  getInvoice,
};