const VehicleTransfer = require("../models/VehicleTransfer");
const mongoose = require("mongoose");
const role = require("../middleware/role");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

// @desc      Get all Vehicle Transfers
// @route     GET /Request/Vehicle/transfers
// @access    Private/HeadOfDeployment/Director/GeneralDirector/
const getVehicleTransfers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc      Create  Vehicle Transfer
// @route     Post /Request/Vehicle/Transfer
// @access    Private/Driver
const createVehicleTransfer = asyncHandler(async (req, res, next) => {
  req.body.recieverId = req.params.recieverId;
  req.body.user = req.user.id;
  const vehicle = await VehicleTransfer.getVehicleByPlateNumber(
    req.body.plateNumber
  );
  if (!vehicle) {
    return next(
      new ErrorResponse(
        `Vehicle not found with plate number of ${req.body.plateNumber}`,
        404
      )
    );
  }
  req.body.vehicle = vehicle._id;
  const vehicleTransfer = await VehicleTransfer.create(req.body);
  res.status(200).json(vehicleTransfer);
});

// @desc      Delete a Vehicle Request
// @route     Delete /Request/Vehicle/Transfer:id
// @access    Private/Driver/Employee
const deletevehicleTransfer = asyncHandler(async (req, res, next) => {
  let vehicleTransfers = await VehicleTransfer.findById(req.params.id);
  if (!vehicleTransfers) {
    return next(
      new ErrorResponse(`Request not found with id of ${req.params.id}`, 404)
    );
  }
  //Make sure user is vehicle owner
  if (vehicleTransfers.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to Delete this vehicle transfer`,
        404
      )
    );
  }
  // set isDeleted flag to true
  vehicleTransfers.isDeleted = true;

  // save maintenance request
  await vehicleTransfers.save();

  res.status(200).json({ message: "Removed Successfully" });
});

// @desc      Update a Vehicle Request
// @route     Put /Request/Vehicle/Transfer/:id
// @access    Private/Driver
const updatevehicleTransfer = asyncHandler(async (req, res, next) => {
  let vehicleTransfers = await VehicleTransfer.findById(req.params.id);

  if (!vehicleTransfers) {
    return next(
      new ErrorResponse(`Request not found with id of ${req.params.id}`, 404)
    );
  }
  //Make sure user is vehicle owner
  if (vehicleTransfers.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to update this vehicle transfer`,
        404
      )
    );
  }
  vehicleTransfers = await VehicleTransfer.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json(vehicleTransfers);
});

// @desc      Update a Vehicle Transfer Status
// @route     Patch /Request/transfer/:id
// @access    Private/Diriver
const updateVehicleTransferststatus = asyncHandler(async (req, res, next) => {
  try {
    // Validate input data
    const { id } = req.params;
    const { status } = req.body;
    if (!id || !status) {
      return next(new ErrorResponse(`Missing required fields`, 400));
    }
    if (status !== "Approved" && status !== "Rejected") {
      return next(new ErrorResponse(`Invalid status value`, 400));
    }

    // Check if fuel request exists and if user is authorized to update it
    const vehicleTransfer = await VehicleTransfer.findOne({
      _id: id,
      isDeleted: false,
      receiver: req.user.id,
    });

    if (!vehicleTransfer) {
      return next(
        new ErrorResponse(`Fuel request with id ${id} not found`, 404)
      );
    }
    if (vehicleTransfer.status !== "Waiting Approval") {
      return next(
        new ErrorResponse(`This request is either approved or rejected`, 403)
      );
    }

    // Get vehicle ID if status is approved
    let vehicleId;
    if (status === "Approved") {
      const vehicle = await VehicleTransfer.getVehicleByPlateNumber(
        vehicleTransfer.plateNumber
      );
      vehicleId = vehicle.id;
    }

    // Update fuel request
    await vehicleTransfer.findOneAndUpdate(
      { _id: id },
      { status, ...(vehicleId && { vehicle: vehicleId }) },
      { new: true }
    );

    // Return updated fuel request
    res
      .status(200)
      .json({ message: `Vehicle Transfer ${status} Successfully` });
  } catch (error) {
    next(error);
  }
});

module.exports = {
  getVehicleTransfers,
  createVehicleTransfer,
  updatevehicleTransfer,
  deletevehicleTransfer,
};
