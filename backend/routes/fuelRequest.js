const express = require("express");

const {
  getfuelRequests,
  createFuelRequest,
  updateFuelRequest,
  deleteFuelRequest,
  getFuelRequestReport,
  // updateFuelRequestStatus,
} = require("../controllers/fuelRequest");

const backupDeletedDocument = require("../middleware/backupdeleted");
const { Auth, Authorize } = require("../middleware/auth");
const FuelRequest = require("../models/fuelRequest");
const advancedResult = require("../middleware/advancedResult");

const router = express.Router({ mergeParams: true });
router.use(Auth);

router.post("/fuel", createFuelRequest);
router.get("/fuel", advancedResult(FuelRequest, ""), getfuelRequests);
router.put("/fuel/:id", updateFuelRequest);
router.delete("/fuel/:id", deleteFuelRequest);
router.patch("/fuel/backup/:id", backupDeletedDocument(FuelRequest));
router.get('/fuelRequests/report/:duration', getFuelRequestReport);
module.exports = router;
