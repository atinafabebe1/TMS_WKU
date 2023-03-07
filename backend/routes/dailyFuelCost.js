const express = require("express");

const {
  getDailyFuelCostRecords,
  updateDailyFuelCost,
  deleteDailyFuelCost,
  createDailyFuelCost,
} = require("../controllers/dailyFuelCostRecord");
const advancedResult = require("../middleware/advancedResult");
const DailyFuelCost = require("../models/dailyFuelCostRecording");
const { Auth, Authorize } = require("../middleware/auth");
const router = express.Router();
router.use(Auth);

router.post("/daily-fuel-costs", createDailyFuelCost);
router.get(
  "/daily-fuel-costs",
  advancedResult(DailyFuelCost, ""),
  getDailyFuelCostRecords
);
router.put("/daily-fuel-costs/:id", updateDailyFuelCost);
router.delete("/daily-fuel-costs/:id", deleteDailyFuelCost);

module.exports = router;
