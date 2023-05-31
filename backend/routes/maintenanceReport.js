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
router.get("/", Authorize("ROLE_MECHANIC"),advancedResult(MaintenanceReport, ""), getMaintenanceReports);
router.put("/:id", updateMaintenanceReport);
router.delete("/:id", deleteMaintenanceReport);
router.patch("/backup/:id", backupDeletedDocument(MaintenanceReport));

module.exports = router;


// const express = require('express');
// const router = express.Router();
// const maintenanceReportController = require('../controllers/maintenanceReport');
// const { Auth, Authorize } = require('../middleware/auth');

// router.use(Auth); // Apply the Auth middleware to all routes in this router

// // Create a maintenance report (requires ROLE_MECHANIC authorization)
// router.post('/maintenance-reports', Authorize('ROLE_MECHANIC'), maintenanceReportController.create);

// // Get all maintenance reports (requires ROLE_MECHANIC authorization)
// router.get('/maintenance-reports', Authorize('ROLE_MECHANIC'), maintenanceReportController.getAll);

// // Get a maintenance report by ID
// router.get('/maintenance-reports/:id', maintenanceReportController.getById);

// // Update a maintenance report
// router.put('/maintenance-reports/:id', maintenanceReportController.update);

// // Update the status of a maintenance report
// router.patch('/maintenance-reports/:id/status', maintenanceReportController.updateStatus);

// module.exports = router;
