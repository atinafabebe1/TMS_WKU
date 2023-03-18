const express = require("express");

const { createServiceSchedule } = require("../controllers/serviceSchedule");
const advancedResult = require("../middleware/advancedResult");
const { Auth, Authorize } = require("../middleware/auth");
const { ROLE_HEADOFDEPLOYMENT } = require("../constants");
const router = express.Router();
// router.use(Auth);

router.post(
  "/work-day",
  // Authorize(ROLE_HEADOFDEPLOYMENT),
  createServiceSchedule
);

module.exports = router;
