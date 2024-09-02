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
    const result = await branch.findOne({ branchCode: Number(req.params.code) });
    if (result != null) {
      const data = await branch.findOneAndUpdate(
        { branchCode: req.params.code },
        req.body
      );
      res.status(200).json({ "Message": "Branch Updated" });
    }
    else {
      res.status(409).json({ "Message": "Not a valid branch Code" });
    }
    // return res;
  } catch (err) {
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
