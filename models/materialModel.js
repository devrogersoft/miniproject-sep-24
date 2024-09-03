const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema(
  {
    materialCode: {
      type: String,
      required: true,
    },
    materialName: {
      type: String,
      required: true,
    },
    defaultPrice: {
      type: Number,
      required: true,
    },
    defaultUnit: {
      type: String,
      required: true,
    },
    createdUser: {
      type: String,
      required: true,
    },
    userUpdated: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Material = mongoose.model("Material", materialSchema);
module.exports = Material;
