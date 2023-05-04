const express = require("express");

const {
  getMaintenanceReports,
  createMaintenanceReport,
  updateMaintenanceReport,
  deleteMaintenanceReport,
} = require("../controllers/maintenanceReport");
const backupDeletedDocument = require("../middleware/backupdeleted");
const { Auth, Authorize } = require("../middleware/auth");
const MaintenanceReport = require("../models/maintenanceReport");
const advancedResult = require("../middleware/advancedResult");

const router = express.Router({ mergeParams: true });
router.use(Auth);

router.post("/",Authorize("ROLE_MECHANIC"), createMaintenanceReport);
router.get("/", Authorize("ROLE_MECHANIC","ROLE_GARAGEDIRECTOR"),advancedResult(MaintenanceReport, ""), getMaintenanceReports);
router.put("/:id", updateMaintenanceReport);
router.delete("/:id", deleteMaintenanceReport);
router.patch("/backup/:id", backupDeletedDocument(MaintenanceReport));

module.exports = router;
