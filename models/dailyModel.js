
const mongoose = require("mongoose");
const salesSchema = new mongoose.Schema(
  {     
        invoiceNo: { type: Number, required: true,unique : true},
        branchCode: { type: Number, required: true, },
        salesDate: { type: Date, required: true, },
        custCode: { type: Number, require: true },
        orderType: { type: String, required: true },       
        returnRef: { type: String, required: false },
        poRef: { type: String, required: false },
        comment: { type: String, required: false },
        driverDetails: { type: String, required: false },
        totalAmount:{type: mongoose.Types.Decimal128, required: true},
        productDetails: [{  
            material: { type: Number, required: true },
            qunatity:{ type : mongoose.Types.Decimal128, required: true},
            value: { type: mongoose.Types.Decimal128, required: true },
            total:{ type : mongoose.Types.Decimal128, required:true },
            taxPercentage: { type: mongoose.Types.Decimal128, required: true },
            taxAmount: { type: mongoose.Types.Decimal128, required: true },
            netAmount:{type: mongoose.Types.Decimal128, required: true}
        }]    
    },
{
    timestamps: true,
    }
);
salesSchema.index({invoiceNo: 1},{unique :true});

const dailySales = mongoose.model("sales", salesSchema);
module.exports = dailySales;




