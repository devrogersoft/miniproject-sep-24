const mongoose = require("mongoose");


const salesSchema = new mongoose.Schema({
    invoiceNo: {
        type: Number,
        required: true,
        unique: true
    },
    branchCode: {
        type: Number,
        required: true,
    },
    salesDate: {
        type: Date,
        required: true,
    },
    custCode: {
        type: Number,
        require: true
    },
    orderType: {
        type: String,
        required: true
    },
    returnRef: {
        type: String,
        required: false
    },
    poRef: {
        type: String,
        required: false
    },
    comment: {
        type: String,
        required: false
    },
    driverDetails: {
        type: String,
        required: false
    },
    driverCommision: {
        type: Boolean,
        required: true
    },
    totalAmount: {
        type: mongoose.Types.Decimal128,
        get: getCosts,
        required: true
    },
    productDetails: [{
        material: {
            type: Number,
            required: true
        },
        qunatity: {
            type: mongoose.Types.Decimal128,
            get: getCosts,
            required: true
        },
        value: {
            type: mongoose.Types.Decimal128,
            get: getCosts,
            required: true
        },
        total: {
            type: mongoose.Types.Decimal128,
            get: getCosts,
            required: true
        },
        taxPercentage: {
            type: mongoose.Types.Decimal128,
            get: getCosts,
            required: true
        },
        taxAmount: {
            type: mongoose.Types.Decimal128,
            get: getCosts,
            required: true
        },
        netAmount: {
            type: mongoose.Types.Decimal128,
            get: getCosts,
            required: true
        }
    }]
}, {
    toJSON: {
        getters: true
    }
}, {
    timestamps: {
        createdAt: 'createdDate',
    }
});


function getCosts(value) {
    if (typeof value !== 'undefined') {
        return parseFloat(value.toString());
    }
    return value;
};


salesSchema.pre('save', function (next) {
    if (this.isNew) {
        this.createdDate = this.createdDate || new Date();
    } else {}

    next();
});

const dailySales = mongoose.model("sales", salesSchema);



module.exports = dailySales;