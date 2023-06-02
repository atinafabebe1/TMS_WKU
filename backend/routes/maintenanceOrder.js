const express = require("express");

const {
  updateMaintenanceOrderStatusByPlateNumber,
  getMaintenanceOrderById,
  getMaintenanceOrders,
  createMaintenanceOrder,
  updateMaintenanceOrder,
  deleteMaintenanceOrder,
  deleteMaintenanceTask,
  updateMaintenanceOrderStatus,
  addMaintenanceTask,
} = require("../controllers/maintenanceOrder");

const backupDeletedDocument = require("../middleware/backupdeleted");
const { Auth, Authorize } = require("../middleware/auth");
const MaintenanceOrder = require("../models/maintenanceOrder");
const advancedResult = require("../middleware/advancedResult");

const router = express.Router({ mergeParams: true });
router.use(Auth);

router.post("/", createMaintenanceOrder);
router.get(
  "/",
  advancedResult(MaintenanceOrder, "vehicle"),
  getMaintenanceOrders
);
router.get("/:id", getMaintenanceOrderById);
router.patch("/:id", updateMaintenanceOrderStatus);
router.patch("/plate:plateNumber", updateMaintenanceOrderStatusByPlateNumber);
router.put("/task/:maintenanceOrderId", addMaintenanceTask);
router.put("/:id", updateMaintenanceOrder);
router.delete("/:id", deleteMaintenanceOrder);
router.delete("/:maintenanceOrderId/:maintenanceTaskId", deleteMaintenanceTask);
router.get("/:maintenanceOrderId/:maintenanceTaskId", deleteMaintenanceTask);
router.patch("/backup/:id", backupDeletedDocument(MaintenanceOrder));
module.exports = router;
