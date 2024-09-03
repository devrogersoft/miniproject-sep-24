const Customer = require("../models/customerModel");

// Insert a new customer
const insertCustomer = async (req, res) => {
  try {
    const newCustomer = new Customer(req.body);
    await newCustomer.save();
    res.status(201).json({ message: "Customer Created" });
  } catch (error) {
    console.error("ERROR for creating customer:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Find a customer by customerCode
const findCustomer = async (req, res) => {
  try {
    const customer = await Customer.findOne({ customerCode: req.params.id });
    if (customer) {
      res.status(200).json(customer);
    } else {
      res.status(404).json({ message: "Customer not found" });
    }
  } catch (error) {
    console.error("Error finding customer:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a customer by customerCode
const updateCustomer = async (req, res) => {
  try {
    const updatedCustomer = await Customer.findOneAndUpdate(
      { customerCode: req.params.id },
      req.body,
      { new: true } // Return the updated document
    );
    if (updatedCustomer) {
      res.status(200).json({ message: "Customer updated"});
    } else {
      res.status(404).json({ message: "Customer not found" });
    }
  } catch (error) {
    console.error("Error updating customer:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a customer by customerCode
const deleteCustomer = async (req, res) => {
  try {
    const deletedCustomer = await Customer.findOneAndDelete({ customerCode: req.params.id });
    if (deletedCustomer) {
      res.status(200).json({ message: "Customer deleted" });
    } else {
      res.status(404).json({ message: "Customer not found" });
    }
  } catch (error) {
    console.error("Error deleting customer:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  insertCustomer,
  findCustomer,
  updateCustomer,
  deleteCustomer,
};
