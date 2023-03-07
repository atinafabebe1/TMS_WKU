const express = require("express");

const { getmonthlyReports } = require("../controllers/monthlyReport.js");

const { Auth, Authorize } = require("../middleware/auth");

const router = express.Router();
const MonthlyReport = require("../models/monthlyReport");
const advancedResult = require("../middleware/advancedResult");
router.use(Auth);

router.get("/monthly", advancedResult(MonthlyReport, ""), getmonthlyReports);

module.exports = router;
