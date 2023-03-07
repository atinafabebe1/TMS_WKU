const express = require("express");

const {
  getvehicleRequests,
  createvehicleRequest,
  updatevehicleRequest,
  deleteVehicleRequest,
  updateVehicleRequeststatus,
} = require("../controllers/vehicleRequestController");
const backupDeletedDocument = require("../middleware/backupdeleted");
const { Auth, Authorize } = require("../middleware/auth");
const VehicleRequest = require("../models/vehicleRequest");
const advancedResult = require("../middleware/advancedResult");

const router = express.Router({ mergeParams: true });
// router.use(Auth);

router.post("/vehicle/", createvehicleRequest);
router.get("/vehicle", advancedResult(VehicleRequest, ""), getvehicleRequests);
router.put("/vehicle/:id", updatevehicleRequest);
router.delete("/vehicle/:id", deleteVehicleRequest);
router.patch("/vehicle/:id", updateVehicleRequeststatus);
router.patch("/transfer/backup/:id", backupDeletedDocument(VehicleRequest));

module.exports = router;
