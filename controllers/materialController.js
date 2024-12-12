const Material = require("../models/materialModel");

const insertMaterila = (req, res) => {
  const newMaterial = new Material(req.body);
  try {
    newMaterial.save();
    res.status(201).json("Material Inserted");
  } catch (error) {
    console.log(error);
  }
};
const getAllmaterial = async (req, res) => {
  try {
    const data = await Material.find();
    if (data.length > 0) {
      res.status(200).json(data);
    } else {
      res.status(404).json("Not Found");
    }
  } catch (error) {
    console.log(error);
  }
};
const getMaterial = async (req, res) => {
  try {
    const data = await Material.find({ materialCode: req.params.id });
    if (data.length > 0) {
      res.status(200).json(data);
    } else {
      res.status(404).json("Not Found");
    }
  } catch (error) {
    console.log(error);
  }
};
const updateMaterial = async (req, res) => {
  try {
    const data = await Material.findOneAndUpdate(
      { materialCode: req.params.id },
      req.body
    );

    if (data == null) {
      res.status(404).json("Not Found");
    } else {
      res.status(200).json("Material Updated");
    }
  } catch (error) {
    console.log(error);
  }
};
const deleteMaterial = async (req, res) => {
  try {
    const data = await Material.findOneAndDelete({
      materialCode: req.params.id,
    });

    if (data == null) {
      res.status(404).json("Not Found");
    } else {
      res.status(200).send("delete Material");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  insertMaterila,
  getAllmaterial,
  getMaterial,
  updateMaterial,
  deleteMaterial,
};
