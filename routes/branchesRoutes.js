const express = require("express");
const app = express();
const fm = require("../controllers/branchesController");
const router = express.Router();


router.get('/', fm.readAllBranch);
router.post('/', fm.createBranch);
router.get('/:code', fm.readOneBranch);
router.delete('/:code', fm.deleteBranch);
router.put('/:code', fm.updateBranch);

module.exports = router;
