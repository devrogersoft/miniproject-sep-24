const dailySales = require("../models/dailyModel");

async function salesInvoice(req, res) {
  try {
    let payload = {};
    payload = req.body;
    const docCount = await dailySales.countDocuments({}).exec();
    payload.invoiceNo = docCount + 1;
    const daily = new dailySales(payload);
    daily.save();
    res.status(200).json({ "Message": "Sales Created Sucessfully",
      "Invoice No" :payload.invoiceNo });
  } catch (err) {
    res.status(401).json({ "Message": err })
  }
  finally {
  }
}

module.exports = {
  salesInvoice,
};
