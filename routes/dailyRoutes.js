const express = require("express");
const app = express();
const fm = require("../controllers/dailyController");
const router = express.Router();


router.post('/', fm.salesInvoice);
module.exports = router;
