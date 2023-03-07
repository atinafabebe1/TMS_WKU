const MaintenanceOrder = require("../models/maintenanceOrder");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

//@desc       to get all Maintenance Orders
//@routee     GET/http://localhost:3500/MaintenanceOrder
//@access     GARAGEDIRECTOR
const getMaintenanceOrders = asyncHandler(async (req, res) => {
  res.status(200).json(res.advancedResults);
});

//@desc       to Create Maintenance Order
//@routee     POST/http://localhost:3500/MaintenanceOrder
//@access     GARAGEDIRECTOR
const createMaintenanceOrder = asyncHandler(async (req, res, next) => {
  const {
    plateNumber,
    typeOfVehicle,
    assignedWorkflow,
    kilometerOnCounter,
    crashType,
    reciever,
  } = req.body;
  req.body.user = req.user.id;
  const vehicle = await MaintenanceOrder.getVehicleByPlateNumber(plateNumber);

  if (!vehicle) {
    return next(
      new ErrorResponse(
        `Vehicle not found with plate number of ${plateNumber}`,
        404
      )
    );
  }

  req.body.vehicle = vehicle._id;

  const totalCost = MaintenanceOrder.calculateTotalCost(
    req.body.maintenanceTasks
  );

  const { totalBirr, totalCoin, maintenanceTasks } = totalCost;

  const order = new MaintenanceOrder({
    user: req.user.id,
    vehicle: vehicle._id,
    reciever,
    plateNumber,
    typeOfVehicle,
    assignedWorkflow,
    kilometerOnCounter,
    crashType,
    maintenanceTasks,
    totalCost: totalBirr + totalCoin,
  });

  await order.save();

  res.status(200).json({
    id: order._id,
    totalCost: order.totalCost,
  });
});

const updateMaintenanceOrderStatus = asyncHandler(async (req, res, next) => {
  const requestId = req.params.id;
  const { status } = req.body;

  if (!requestId || !status) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  const validStatuses = ["pending", "in-progress", "completed", "canceled"];
  if (!validStatuses.includes(status)) {
    return next(new ErrorResponse(`Invalid status: ${status}`, 400));
  }
  const maintenanceOrder = await MaintenanceOrder.findOne({
    _id: requestId,
    isDeleted: false,
    receiver: req.user.id,
  });

  if (!maintenanceOrder) {
    return next(
      new ErrorResponse(
        `Maintenance order not found with id of ${requestId}`,
        404
      )
    );
  }

  if (
    maintenanceOrder.status === "canceled" ||
    maintenanceOrder.status === "completed"
  ) {
    return next(
      new ErrorResponse(
        `Maintenance order with id of ${requestId} is not pending or in-progress`,
        400
      )
    );
  }

  // Get vehicle ID if status is approved
  let vehicleId;
  if (status === "pending") {
    const vehicle = await MaintenanceOrder.getVehicleByPlateNumber(
      maintenanceOrder.plateNumber
    );
    vehicleId = vehicle.id;
  }

  // Update fuel request
  await MaintenanceOrder.findOneAndUpdate(
    { _id: requestId },
    { status, ...(vehicleId && { vehicle: vehicleId }) },
    { new: true }
  );

  // Return updated fuel request
  res.status(200).json({ message: `Maintenance Request ${status} ` });
});

const addMaintenanceTask = asyncHandler(async (req, res, next) => {
  const maintenanceOrder = await MaintenanceOrder.findById(
    req.params.maintenanceOrderId
  );

  if (maintenanceOrder.status !== "in-progress") {
    return next(
      new ErrorResponse(
        `maintenance order with ${req.params.maintenanceOrderId} is not in progress`,
        401
      )
    );
  }
  if (!maintenanceOrder) {
    return res.status(404).json({ message: "Maintenance order not found" });
  }

  maintenanceOrder.maintenanceTasks.push(req.body);

  const totalCost = MaintenanceOrder.calculateTotalCost(
    maintenanceOrder.maintenanceTasks
  );

  const { totalBirr, totalCoin, maintenanceTasks } = totalCost;

  await MaintenanceOrder.findOneAndUpdate(
    { _id: req.params.maintenanceOrderId },
    {
      maintenanceTasks: maintenanceTasks,
      totalCost: totalBirr + totalCoin,
    },
    { new: true } // return the updated document
  );

  res.status(200).json({ message: "Successfully Added" });
});

//@desc       to Update single Maintenance Order
//@routee     PUT/http://localhost:3500/MaintenanceOrder/:ID
//@access     GARAGEDIRECTOR
const updateMaintenanceOrder = asyncHandler(async (req, res, next) => {
  delete req.body.vehicle;
  delete req.body.status;

  let maintenanceOrder = await MaintenanceOrder.findById(req.params.id);
  if (!maintenanceOrder) {
    return next(
      new ErrorResponse(
        `Maintenance Order not found with id of ${req.params.id}`,
        404
      )
    );
  }
  //Make sure user is vehicle owner
  if (maintenanceOrder.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to update this maintenance Order`,
        404
      )
    );
  }
  if (req.body.plateNumber) {
    const vehicle = await MaintenanceOrder.getVehicleByPlateNumber(
      req.body.plateNumber
    );
    if (!vehicle) {
      return next(
        new ErrorResponse(
          `Vehicle not found with plate number ${req.body.plateNumber} `,
          404
        )
      );
    } else {
      req.body.vehicle = vehicle._id;
    }
  }

  maintenanceOrder = await MaintenanceOrder.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json(maintenanceOrder);
});

const deleteMaintenanceTask = async (req, res, next) => {
  const { maintenanceOrderId, maintenanceTaskId } = req.params;

  try {
    const maintenanceOrder = await MaintenanceOrder.findOne({
      _id: maintenanceOrderId,
      user: req.user.id,
      "maintenanceTasks._id": maintenanceTaskId,
    });

    if (!maintenanceOrder) {
      return res.status(404).json({
        message: `Maintenance task not found with this mainteance order ${maintenanceTaskId} `,
      });
    }

    // Find the index of the maintenance task in the maintenanceTasks array
    const maintenanceTaskIndex = maintenanceOrder.maintenanceTasks.findIndex(
      (task) => task._id.toString() === maintenanceTaskId
    );

    if (maintenanceTaskIndex === -1) {
      return res.status(404).json({ message: "Maintenance task not found" });
    }

    // Set the isDeleted flag of the maintenance task to true
    maintenanceOrder.maintenanceTasks[maintenanceTaskIndex].isDeleted = true;
    const updatedMainteannceTask = maintenanceOrder.maintenanceTasks.filter(
      (task) => !task.isDeleted
    );

    // Recalculate the total cost of the maintenance order
    const { totalBirr, totalCoin } = MaintenanceOrder.calculateTotalCost(
      updatedMainteannceTask
    );
    maintenanceOrder.totalCost = totalBirr + totalCoin;

    // Update the maintenance order document using findOneAndUpdate
    await MaintenanceOrder.findOneAndUpdate(
      { _id: maintenanceOrderId },
      {
        maintenanceTasks: maintenanceOrder.maintenanceTasks,
        totalCost: maintenanceOrder.totalCost,
      }
    );

    res.status(200).json({
      message: "Maintenance task deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

//@desc       to Delete Maintenance Order
//@routee     DELETE/http://localhost:3500/MaintenanceOrder/:ID
//@access     GARAGEDIRECTOR
const deleteMaintenanceOrder = asyncHandler(async (req, res, next) => {
  let maintenanceOrder = await MaintenanceOrder.findById(req.params.id);
  if (!maintenanceOrder) {
    return next(
      new ErrorResponse(
        `Maintenanc Order not found with id of ${req.params.id}`,
        404
      )
    );
  }
  // to be sure user is maintenance order owner!!
  if (maintenanceOrder.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User not authorized to delete this Maintenance Order`,
        404
      )
    );
  }
  // set isDeleted flag to true
  maintenanceOrder.isDeleted = true;

  // save maintenance request
  await maintenanceOrder.save();

  res.status(200).json({ message: "Removed Successfully" });
});

module.exports = {
  updateMaintenanceOrderStatus,
  createMaintenanceOrder,
  updateMaintenanceOrder,
  getMaintenanceOrders,
  deleteMaintenanceOrder,
  deleteMaintenanceTask,
  addMaintenanceTask,
};
