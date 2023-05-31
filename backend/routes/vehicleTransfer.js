const express = require("express");

const {
  getVehicleTransfers,
  createVehicleTransfer,
  deletevehicleTransfer,
  updateVehicleTransfer,
} = require("../controllers/VehicleTransfer");
const { Auth, Authorize } = require("../middleware/auth");
const backupDeletedDocument = require("../middleware/backupdeleted");
const VehicleTransfer = require("../models/VehicleTransfer");
const advancedResult = require("../middleware/advancedResult");

const router = express.Router();

router.use(Auth);

router.get(
  "/transfer",
  advancedResult(VehicleTransfer, ""),
  getVehicleTransfers
);
router.post("/transfer", Authorize("ROLE_DRIVER"), createVehicleTransfer);
router.delete("/transfer/:id", Authorize("ROLE_DRIVER"), deletevehicleTransfer);
router.put("/transfer/:id", updateVehicleTransfer);
router.patch("/transfer/backup/:id", backupDeletedDocument(VehicleTransfer));

module.exports = router;
