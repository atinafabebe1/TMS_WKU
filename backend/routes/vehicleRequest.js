const express = require("express");

const {
  getvehicleRequests,
  createvehicleRequest,
  updatevehicleRequest,
  deleteVehicleRequest,
  approveVehicleRequeststatus,
  rejectVehicleRequeststatus,
} = require("../controllers/vehicleRequestController");
const backupDeletedDocument = require("../middleware/backupdeleted");
const { Auth, Authorize } = require("../middleware/auth");
const VehicleRequest = require("../models/vehicleRequest");
const advancedResult = require("../middleware/advancedResult");

const router = express.Router({ mergeParams: true });
router.use(Auth);

router.post("/vehicle", createvehicleRequest);
router.get(
  "/vehicle",
  advancedResult(VehicleRequest, "vehicle user"),
  getvehicleRequests
);
router.put("/vehicle/:id", updatevehicleRequest);
router.delete("/vehicle/:id", deleteVehicleRequest);
router.put("/vehicle/:id/approve", approveVehicleRequeststatus);
router.put("/vehicle/:id/reject", rejectVehicleRequeststatus);
router.patch("/transfer/backup/:id", backupDeletedDocument(VehicleRequest));

module.exports = router;
