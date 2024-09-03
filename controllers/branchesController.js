// const MongoClient = require("mongodb").MongoClient;

// Replace the uri string with your connection string.
// const uri = "mongodb://localhost:27017/";
// const client = new MongoClient(uri);
// const database = client.db("classic");
// const branches = database.collection("branches");

const branch = require("../models/branchModel");

async function readAllBranch(req, res) {
  try {
    const result = await branch.find();
    if (!result) {
      res.status(400).json({ "Message": "Data not found" });
    }
    else {
      res.status(200).json(result);
    }
    // return res;
  } finally {
  }
}

async function readOneBranch(req, res) {
  try {
    const result = await branch.findOne({ branchCode: Number(req.params.code) });
    if (!result) {
      res.status(400).json({ "Message": "Data not found" });
    } else {
      res.status(200).json(result);
    }
    // return res;
  } finally {
  }
}


async function deleteBranch(req, res) {
  try {
    const output = await branch.findOne({ branchCode: Number(req.params.code) });
    if (!output) {
      res.status(400).json({ "Message": "Data not found" });
    } else {
      const result = await branch.findOneAndDelete({
        branchCode: req.params.code,
      });
      res.status(200).json({ "Message": "Data Deleted" });
    }
    // return res;
  } finally {
  }
}


async function createBranch(req, res) {
  try {
    const result = await branch.findOne({ branchCode: Number(req.body.branchCode) });
    if (!result) {
      const newBranch = new branch(req.body);
      newBranch.save();
      res.status(200).json({ "Message": "Branch Created" });
    }
    else {
      res.status(409).json({ "Message": "Duplicate Entry" });
    }
    // return res;
  } catch (err) {
    res.status(401).json({ "Message": err })
  }
  finally {
  }
}

async function updateBranch(req, res) {
  try {
    const body = req.body;

    // Filter to find the document to update
    const filter = { branchCode: req.params.code };

    // Update operation
    const update = 
    {
      $set:
      {               
        "branchName": body.branchName,
        "address": body.address,
        "gstNo": body.gstNo,
        "tinNo": body.tinNo,
        "otherNo": body.otherNo,
        "license1": body.license1,
        "license1Exp": body.license1Exp,
        "license2": body.license2,
        "license2Exp": body.license2Exp,
        "license3": body.license3,
        "license3Exp": body.license3Exp,
        "license4": body.license4,
        "license4Exp": body.license4Exp,
        "license5": body.license5,
        "license5Exp": body.license5Exp,
        "mobileNo": body.mobileNo
      }
    };
    // Options for the update operation
    const options = {
      new: true, // Return the updated document
      upsert: false // Create a new document if no matching document is found
    };

    const result = await branch.findOne({ branchCode: Number(req.params.code) });
    if (result != null) {      
      const data = await branch.findOneAndUpdate(filter, update, options);
      if (!data) {
        res.status(401).json({ "Message": "Branch Not Updated" });      }
      else {           
        res.status(201).json({ "Message": "Branch Updated Successfully" });
      }
    }
    else {
      res.status(409).json({ "Message": "Not a valid branch Code" });
    }
    // return res;
  } catch (err) {
    console.log(err);
    res.status(401).json({ "Message": err })
  } 
    finally {
  }
}

module.exports = {
  readAllBranch,
  createBranch,
  readOneBranch,
  updateBranch,
  deleteBranch,
};
