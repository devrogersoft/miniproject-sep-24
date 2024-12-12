const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    customerCode: {
      type: Number,
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    customerAddress: {
      type: String,
      required: true,
    },
    GSTNo: {
      type: String,
      required: true,
    },
    TINNo: {
      type: String,
      required: true,
    },
    OtherNo: {
      type: String,
      required: true,
    },
    ContactPerson: {
      type: String,
      required: true,
    },
    ContactNumber: {
      type: Number,
      required: true,
    },
    GSTbill: {
      type: Boolean,
      required: true,
    },
    CreditLimit: {
      type: Number,
      required: true,
    },
    CustomerOutstanding: {
      type: Number,
      required: true,
    },
    CreatedUser: {
      type: String,
      required: true,
    },
    UserUpdated: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: {
      createdAt: 'createdDate',
      updatedAt: 'lastUpdatedDate'
    }
  }
);

// Ensure `createdDate` doesn't change on update
customerSchema.pre('save', function (next) {
  if (this.isNew) {
    this.createdDate = this.createdDate || new Date();
  } else {
    this.lastUpdatedDate = new Date();
  }
  next();
});

// For updates, prevent `createdDate` from being changed
customerSchema.pre('findOneAndUpdate', function (next) {
  this._update.$set = this._update.$set || {};
  this._update.$set.lastUpdatedDate = new Date();
  delete this._update.createdDate; // Ensure `createdDate` is not modified
  next();
});

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;