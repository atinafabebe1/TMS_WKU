const express = require("express");

const {
  getRegisteredVehicles,
  registerVehicle,
  updateVehicleRecord,
  deleteVehicle,
  uploadVehicleImage,
  getVehicleImage,
  getRegisteredVehicle,
} = require("../controllers/registerVehicleController");
const backupDeletedDocument = require("../middleware/backupdeleted");
const { Auth, Authorize } = require("../middleware/auth");
const advancedResult = require("../middleware/advancedResult");
const RegisteredVehicle = require("../models/registerVehicle");
const vehicleRequest = require("./vehicleRequest");
const vehicleTransfer = require("./vehicleTransfer");

const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
let path = require("path");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({ storage, fileFilter });

router.use(Auth);

// router.use("/:vehicleId/request/vehiclerequest", vehicleRequest);
// router.use("/:vehicleId/request/vehicleTransfer", vehicleTransfer);

router.post("/", Authorize("ROLE_HEADOFDEPLOYMENT"), registerVehicle);
router.get(
  "/",
  advancedResult(RegisteredVehicle, "VehicleRequest"),
  getRegisteredVehicles
);
router.get(
  "/:id",
  advancedResult(RegisteredVehicle, "VehicleRequest"),
  getRegisteredVehicle
);
router.put("/:id", updateVehicleRecord);
router.delete("/:id", deleteVehicle);
router.patch("/backup/:id", backupDeletedDocument(RegisteredVehicle));
router.put("/:id/image", upload.single("photo"), uploadVehicleImage);
router.get("/:id/image", getVehicleImage);

module.exports = router;
