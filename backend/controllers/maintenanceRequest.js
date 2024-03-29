const MaintenanceRequest = require("../models/maintenanceRequest");
const VehicleRecord = require("../models/registerVehicle");
const UserSchema = require("../models/user");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const mongoose = require("mongoose");
const { ROLE_DRIVER, ROLE_HEADOFDEPLOYMENT } = require("../constants");

//@desc Create Maintenance Request
//@route Post /Request/maintenance
//@access Private/Driver
const createMaintenanceRequest = asyncHandler(async (req, res, next) => {
  let headofDeployemnt = await UserSchema.findOne({
    role: ROLE_HEADOFDEPLOYMENT,
    isActive: true,
  });
  console.log(headofDeployemnt);
  if (headofDeployemnt) {
    req.body.reciever = headofDeployemnt._id;
  }
  let vehicle = await VehicleRecord.getVehicleByPlateNumber(
    req.body.plateNumber
  );
  if (vehicle) {
    console.log(vehicle);
    req.body.vehicle = vehicle._id;
  } else {
    return next(new ErrorResponse(`vehicle not found with ${req.body.plateNumber}`, 404));
  }
  req.body.user = req.user.id;
  vehicle.onMaintenance=true;
  await MaintenanceRequest.create(req.body);
  res.status(200).json({ message: "Your Request is successfully sent" });
});

//@desc Get a single Maintenance Request
//@route Get /Request/maintenance/:vehicleId
//@access Private/Driver/HeadofDeployment/Director
const getMaintenanceRequest = asyncHandler(async (req, res, next) => {
  const maintenanceRequest = await MaintenanceRequest.findOne({
    id: req.params.id,
    isDeleted: false,
    user: req.user.id,
  });
  if (!maintenanceRequest) {
    return next(
      new ErrorResponse(
        `Maintenance request not found with id of ${req.params.id}`,
        404
      )
    );
  }
  res.status(200).json(maintenanceRequest);
});

//@desc Get all Maintenance Request
//@route Get /Request/maintenance
//@access Private/Driver/HeadofDeployment/Director
const getMaintenanceRequests = asyncHandler(async (req, res) => {
  res.status(200).json(res.advancedResults);
});

// @desc      Update a Maintenance Request
// @route     Put /Request/maintenance/:id
// @access    Private/Driver/HeadofDeployment/Director
const updateMaitenacneRequest = asyncHandler(async (req, res, next) => {
  const { reciever, plateNumber, vehicleType, kilometerOnCounter,description } = req.body;
  const updateFields = { reciever, plateNumber, vehicleType, kilometerOnCounter,description };

  let maintenanceRequest = await MaintenanceRequest.findById(req.params.id);

  if (!maintenanceRequest) {
    return next(
      new ErrorResponse(`Request not found with id of ${req.params.id}`, 404)
    );
  }
  //Make sure user is vehicle owner
  if (maintenanceRequest.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to update this request`,
        404
      )
    );
  }
  vehicleRequest = await MaintenanceRequest.findByIdAndUpdate(
    req.params.id,
    updateFields,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({ message: "updated successfully" });
});
const updateMaintenanceRequestStatusByPlateNumber = asyncHandler(async (req, res, next) => {
  const { plateNumber } = req.params;

  let maintenanceRequest = await MaintenanceRequest.findOneAndUpdate(
    { plateNumber, status: "UnderMaintenance" },
    { status: "completed" },
    {
      new: true,
      runValidators: true
    }
  );

  if (!maintenanceRequest) {
    return next(
      new ErrorResponse(`Maintenance request not found for plate number ${plateNumber}`, 404)
    );
  }

  res.status(200).json({ message: "Status updated successfully" });
});
// @desc      Approve a Maintenance Request
// @route     Patch /Request/Vehicle/:id
// @access    Private/HeadofDeployemnt/Director
const updateMaintenanaceStatus = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { status,rejectReason } = req.body;

  // check if the status is valid
  const validStatuses = ["pending", "in-progress", "completed", "UnderMaintenance","canceled"];
  if (!validStatuses.includes(status)) {
    return next(new ErrorResponse(`Invalid status: ${status}`, 400));
  }

  // find the maintenance request and update its status
  const maintenanceRequest = await MaintenanceRequest.findById(id);
  if (!maintenanceRequest) {
    return next(
      new ErrorResponse(`Maintenance request not found with id of ${id}`, 404)
    );
  }

  // // check if the user who created the maintenance request is updating the status
  // if (maintenanceRequest.user.toString() === req.user.id) {
  //   return next(
  //     new ErrorResponse(
  //       `You are not authorized to update this maintenance request`,
  //       401
  //     )
  //   );
  // }
  // update the status and save the maintenance request
  maintenanceRequest.status = status;
  maintenanceRequest.rejectReason=rejectReason;
  await maintenanceRequest.save();

  res.status(200).json({ message: `Request is ${status}` });
});

//@desc        to get single pending maintenance request
//@route       GET/http://localhost:3500/FuelRequest/:Id
//access       FuelDistributer/HOD
const getPendingRequest = asyncHandler(async (req, res) => {
  if (req.user.role === ROLE_DRIVER) {
    const maintenanceRequest = await MaintenanceRequest.find({
      status: "pending",
      isDeleted: false,
      user: req.user.id,
    });
    res.status(200).json(maintenanceRequest);
  }
  if (req.user.role === ROLE_HEADOFDEPLOYMENT) {
    const maintenanceRequest = await MaintenanceRequest.find({
      status: "pending",
      isDeleted: false,
    });
    res.status(200).json(maintenanceRequest);
  }
});

// @desc      Delete a Vehicle Request
// @route     Delete /Request/Vehicle
// @access    Private/Driver/Employee
const deleteMaintenanceRequest = asyncHandler(async (req, res, next) => {
  const maintenanceRequest = await MaintenanceRequest.findById(req.params.id);

  if (!maintenanceRequest) {
    return next(
      new ErrorResponse(`Request not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is vehicle owner
  if (maintenanceRequest.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to delete this request`,
        404
      )
    );
  }

  // set isDeleted flag to true
  maintenanceRequest.isDeleted = true;

  // save maintenance request
  await maintenanceRequest.save();

  res.status(200).json({ message: "Removed Successfully" });
});

module.exports = {
  createMaintenanceRequest,
  getMaintenanceRequest,
  getMaintenanceRequests,
  updateMaitenacneRequest,
  updateMaintenanaceStatus,
  deleteMaintenanceRequest,
  getPendingRequest,
  updateMaintenanceRequestStatusByPlateNumber,
};
