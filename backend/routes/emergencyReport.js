const express = require("express");

const {
  getemergencyReports,
  createEmergencyReport,
  updateEmergencyReport,
  deleteEmergencyReport,
} = require("../controllers/emergencyReport");

const backupDeletedDocument = require("../middleware/backupdeleted");
const { Auth, Authorize } = require("../middleware/auth");
const EmergencyReport = require("../models/emergencyReport");
const advancedResult = require("../middleware/advancedResult");

const router = express.Router({ mergeParams: true });
router.use(Auth);

router.post("/", Authorize("ROLE_DRIVER"), createEmergencyReport);
router.get("/", advancedResult(EmergencyReport, ""), getemergencyReports);
router.put("/:id", updateEmergencyReport);
router.delete("/:id", deleteEmergencyReport);
router.patch("/backup/:id", backupDeletedDocument(EmergencyReport));

module.exports = router;
