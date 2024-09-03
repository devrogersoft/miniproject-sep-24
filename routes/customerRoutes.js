const express = require("express");
const {
  insertCustomer,
  findCustomer,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customerController");

const router = express.Router();

router.post("/", insertCustomer); // Create a new customer
router.get("/:id", findCustomer); // Get customer by customerCode
router.put("/:id", updateCustomer); // Update customer by customerCode
router.delete("/:id", deleteCustomer); // Delete customer by customerCode

module.exports = router;
