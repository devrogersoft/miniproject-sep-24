const validateBody = async (req, res, next) => {

    var isJsonString_result = JSON.stringify(req.body);
    if (isJsonString_result === '{}') {
        res.status(400).json({
            "Message": "Error in request body"
        });
    } else {
        if (req.body.branchCode === undefined || req.body.branchCode === "") {
            res.status(400).json({
                "Message": "Enter branch Code"
            });
        } else {
            console.log(req.body.dateFrom);
            if (req.body.dateFrom === undefined || req.body.dateFrom === "") {
                res.status(400).json({
                    "Message": "Enter Date From"
                });
            } else {
                if (req.body.dateTo === undefined || req.body.dateTo === "") {
                    res.status(400).json({
                        "Message": "Enter Date To"
                    });
                }
            }
        }
        next();
    }
};

module.exports = {
    validateBody
};