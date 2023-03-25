const express = require("express");

const {
  createServiceSchedule,
  getServiceSchedule,
} = require("../controllers/serviceSchedule");
const advancedResult = require("../middleware/advancedResult");
const { Auth, Authorize } = require("../middleware/auth");
const ServiceSchedule = require("../models/serviceSchedule");
const { ROLE_HEADOFDEPLOYMENT } = require("../constants");
const router = express.Router();
router.use(Auth);

router.post(
  "/work-day",
  Authorize(ROLE_HEADOFDEPLOYMENT),
  createServiceSchedule
);

router.get(
  "/work-day",
  advancedResult(ServiceSchedule, ""),
  getServiceSchedule
);

module.exports = router;
