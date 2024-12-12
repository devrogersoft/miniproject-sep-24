const express = require("express");
const {
  insertMaterila,
  getMaterial,
  updateMaterial,
  deleteMaterial,
  getAllmaterial,
} = require("../controllers/materialController");
const router = express.Router();

router.get("/", getAllmaterial);              // http://localhost:3000/materials
router.get("/:id", getMaterial);             // http://localhost:3000/materials/203
router.post("/", insertMaterila);           // http://localhost:3000/materials
router.put("/:id", updateMaterial);        // http://localhost:3000/materials/203
router.delete("/:id", deleteMaterial);    // http://localhost:3000/materials/203

module.exports = router;
