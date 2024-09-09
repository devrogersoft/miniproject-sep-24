const dailySales = require("../models/dailyModel");




async function getInvoice(req, res) {
    try {
        const payload = [];




        var query = {
            branchCode: req.body.branchCode,
            salesDate: {
                $gte: req.body.dateFrom,
                $lte: req.body.dateTo
            },
            custCode: req.body.custCode || {
                $gte: 0
            },
        };

        const result = await dailySales.find(query);

        if (result.length > 0) {
            if (req.body.cancelled === false) {

                for (let index = 0; index < result.length; index++) {
                    const element = result[index];
                    if (element.returnRef != "") {
                        // delete result[index];                       
                    } else {
                        payload.push({
                            invoiceNo: element.invoiceNo,
                            branchCode: element.branchCode,
                            salesAmount: element.salesAmount,
                            salesDate: element.salesDate,
                            custCode: element.custCode
                        });
                    }
                }
            } else {
                for (let index = 0; index < result.length; index++) {
                    const element = result[index];
                    payload.push({
                        invoiceNo: element.invoiceNo,
                        invoicetype : element.orderType,
                        branchCode: element.branchCode,
                        salesAmount: element.salesAmount,
                        salesDate: element.salesDate,
                        custCode: element.custCode
                    });

                }
            }

            res.status(200).json(payload);
        } else {
            res.status(400).json({
                "Message": "No sales on the Specified Selection"
            });
        }
    } catch (error) {
        console.log(error);
    } finally {

    }
}



module.exports = {
    getInvoice,
}