const express = require("express");
const app = express();
const fm = require("../controllers/dailyController");
const router = express.Router();


router.post('/', fm.salesInvoice);
router.delete('/:invoiceNo', fm.cancelInvoice);
router.get('/:invoiceNo', fm.getInvoice);
module.exports = router;
