const express = require("express");
const app = express();
const fm = require("../controllers/salesReportController");
const router = express.Router();
const { validateBody }  = require("../utils/validate");

router.post('/',validateBody, fm.getInvoice);

module.exports = router;

