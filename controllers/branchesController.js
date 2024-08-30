const MongoClient = require("mongodb").MongoClient;

// Replace the uri string with your connection string.
const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);
const database = client.db("classic");
const branches = database.collection("branches");

async function read_all(req, res) {
  try {
    const result = await branches.find().toArray();
    res.status(200).json(result);
    // return res;
  } finally {
  }
}

async function read_one(req, res) {
    try {s
      const result = await branches.findOne({branchCode : Number(req.params.code)});
      res.status(200).json(result);
      // return res;
    } finally {
    }
  }

async function write(req, res) {
  try {
    const result = await branches.insertOne(req.body);
    res.status(200).json(result);
    // return res;
  } finally {
  }
}



module.exports = {
  read_all,
  write,
  read_one,
};
