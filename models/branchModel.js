const mongoose = require("mongoose");

const branchSchema = new mongoose.Schema(
    {

        branchCode: {
            type: Number,
            required: true,
            
        },
        branchName: { type: String, required: true, },
        address: { type: String, required: true, },
        gstNo: { type: String, required: true, },
        tinNo: { type: String, required: false, },
        otherNo: { type: String, required: false, },
        license1: { type: String, required: false, },
        license1Exp: { type: String, required: false, },
        license2: { type: String, required: false, },
        license2Exp: { type: String, required: false, },
        license3: { type: String, required: false, },
        license3Exp: { type: String, required: false, },
        license4: { type: String, required: false, },
        license4Exp: { type: String, required: false, },
        license5: { type: String, required: false, },
        license5Exp: { type: String, required: false, },
        mobileNo: { type: String, required: true, },
        createdDate: { type: String, required: false, },
        createdUser: { type: String, required: false, },
        updatedDate: { type: String, required: false, },
        updatedUser: { type: String, required: false, },
    },
    {
        timestamps: true,
    }
);

const branches = mongoose.model("branches", branchSchema);
module.exports = branches;
