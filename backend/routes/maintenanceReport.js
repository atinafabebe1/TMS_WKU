const express = require("express");

const {
  createMaintenanceReport,
  getMaintenanceReports,
  updateMaintenanceReport,
  deleteMaintenanceReport,
} = require("../controllers/maintenanceReport");
const backupDeletedDocument = require("../middleware/backupdeleted");
const { Auth, Authorize } = require("../middleware/auth");
const MaintenanceReport = require("../models/maintenanceReport");
const advancedResult = require("../middleware/advancedResult");

const router = express.Router({ mergeParams: true });
router.use(Auth);

//@desc      to get All Maintenance Report
//@route     GET /http://localhost:3500/MaintenanceReport
//@access    GARAGEDIRECTOR
router.get("/", Authorize("ROLE_MECHANIC", "ROLE_GARAGEDIRECTOR"), advancedResult(MaintenanceReport, ""), getMaintenanceReports);

//@desc      to get Maintenance Reports based on duration
//@route     GET /http://localhost:3500/MaintenanceReport/maintenance-reports/:duration
//@access    MECHANIC, GARAGEDIRECTOR
router.get("/maintenance-reports/:duration", Authorize("ROLE_MECHANIC", "ROLE_GARAGEDIRECTOR","ROLE_HEADOFDEPLOYMENT"), getMaintenanceReports);

//@desc      to Create Maintenance Report
//@route     POST /http://localhost:3500/MaintenanceReport
//@access    MECHANIC
router.post("/", Authorize("ROLE_MECHANIC"), createMaintenanceReport);

//@desc      to Update single Maintenance Report
//@route     PUT /http://localhost:3500/MaintenanceReport/:ID
//@access    MECHANIC
router.put("/:id", updateMaintenanceReport);

//@desc      to Delete single Maintenance Report
//@route     DELETE /http://localhost:3500/MaintenanceReport/:ID
//@access    MECHANIC/GARAGEDIRECTOR
router.delete("/:id", deleteMaintenanceReport);

//@desc      to Backup deleted Maintenance Report
//@route     PATCH /http://localhost:3500/MaintenanceReport/backup/:ID
//@access    MECHANIC/GARAGEDIRECTOR
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
