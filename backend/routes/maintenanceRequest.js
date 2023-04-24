const express = require("express");

const {
  createMaintenanceRequest,
  getMaintenanceRequest,
  getMaintenanceRequests,
  updateMaintenanaceStatus,
  updateMaitenacneRequest,
  deleteMaintenanceRequest,
  getPendingRequest,
} = require("../controllers/maintenanceRequest");
const backupDeletedDocument = require("../middleware/backupdeleted");
const MaintenanceRequest = require("../models/maintenanceRequest");
const advancedResult = require("../middleware/advancedResult");
const { Auth, Authorize } = require("../middleware/auth");
const router = express.Router();

router.use(Auth);

router.post("/maintenance", Authorize("ROLE_DRIVER"), createMaintenanceRequest);
router.get("/maintenance/:id", getMaintenanceRequest);
router.get(
  "/maintenance",
  advancedResult(MaintenanceRequest, "vehicle"),
  getMaintenanceRequests
);
router.get(
  "/maintenances/pending",
  advancedResult(MaintenanceRequest, ""),
  Authorize("ROLE_DRIVER", "ROLE_HEADOFDEPLOYMENT"),
  getPendingRequest
);
router.put(
  "/maintenance/:id",
  Authorize("ROLE_DRIVER","ROLE_HEADOFDEPLOYMENT"),
  updateMaitenacneRequest
);
router.delete(
  "/maintenance/:id",
  Authorize("ROLE_DRIVER"),
  deleteMaintenanceRequest
);
router.patch(
  "/maintenance/:id",
  Authorize("ROLE_HEADOFDEPLOYMENT"),
  updateMaintenanaceStatus
);
router.patch(
  "/maintenance/backup/:id",
  backupDeletedDocument(MaintenanceRequest)
);
router.patch(
  "/maintenance/backup/:id",
  backupDeletedDocument(MaintenanceRequest)
);

module.exports = router;

