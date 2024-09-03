// const MongoClient = require("mongodb").MongoClient;

// Replace the uri string with your connection string.
// const uri = "mongodb://localhost:27017/";
// const client = new MongoClient(uri);
// const database = client.db("classic");
// const branches = database.collection("branches");

const dailySales = require("../models/dailyModel");

async function salesInvoice(req, res) {
  try {
    let payload = {};
    payload = req.body;    
    console.log("dataOk");
    const daily = new dailySales(payload);
    daily.save();
    res.status(200).json({ "Message": "Sales Created" });    
  } catch (err) {
    console.log(err);
    res.status(401).json({ "Message": err })
  }
  finally {
  }
}

module.exports = {
  salesInvoice,
};
