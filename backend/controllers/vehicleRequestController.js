const VehicleRequestSchema = require("../models/vehicleRequest");
const VehicleRecord = require("../models/registerVehicle");
const mongoose = require("mongoose");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

// @desc      Get all Vehicle Request
// @route     GET /Request/Vehicle
// @access    Private/HeadOfDeployment/Director/GeneralDirector/Employee
const getvehicleRequests = asyncHandler(async (req, res) => {
  res.status(200).json(res.advancedResults);
});

// @desc      Create all Vehicle Request
// @route     Post /Request/Vehicle/:recieverID
// @access    Private/Employee/Driver
const createvehicleRequest = asyncHandler(async (req, res, next) => {
  // req.body.user = req.user.id;
  req.body.user = "63fa0c555c27f376fef9a0fe";

  let vehicle = await VehicleRequestSchema.getVehicleByPlateNumber(
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

  vehicle = await VehicleRecord.find();

  // const availableVehicles = await VehicleRecord.find({
  //   available: true,
  //   unavailableFrom: { $lt: date },
  //   unavailableTo: { $gte: date },
  // });
  console.log(req.body);

  const vehicleRequest = await VehicleRequestSchema.create(req.body);
  res.status(200).json(vehicleRequest);
});

const getAvailableVehicle = asyncHandler(async (req, res, next) => {
  const { from, to } = req.query;

  try {
    const availableVehicles = await VehicleRecord.find({
      $or: [
        { unavailable: { $size: 0 } },
        {
          unavailable: {
            $not: {
              $elemMatch: {
                from: { $lt: new Date(to) },
                to: { $gt: new Date(from) },
              },
            },
          },
        },
      ],
    });

    const unavailableVehicles = await VehicleRecord.find({
      unavailable: {
        $elemMatch: {
          from: { $lt: new Date(to) },
          to: { $gt: new Date(from) },
        },
      },
    });

    res.status(200).json({
      success: true,
      data: { availableVehicles, unavailableVehicles },
    });
  } catch (error) {
    next(new ErrorResponse("Could not get available vehicles", 500));
  }
});

// @desc      Update a Vehicle Request
// @route     Put /Request/Vehicle/:id
// @access    Private/Driver/Employee
const updatevehicleRequest = asyncHandler(async (req, res, next) => {
  let vehicleRequest = await VehicleRequestSchema.findById(req.params.id);

  if (!vehicleRequest) {
    return next(
      new ErrorResponse(`Request not found with id of ${req.params.id}`, 404)
    );
  }
  //Make sure user is vehicle owner
  if (vehicleRequest.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to update this vehicle`,
        404
      )
    );
  }
  vehicleRequest = await VehicleRequestSchema.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json(vehicleRequest);
});

// @desc      Delete a Vehicle Request
// @route     Delete /Request/Vehicle
// @access    Private/Driver/Employee
const deleteVehicleRequest = asyncHandler(async (req, res, next) => {
  let vehicleRequest = await VehicleRequestSchema.findById(req.params.id);

  if (!vehicleRequest) {
    return next(
      new ErrorResponse(`Request not found with id of ${req.params.id}`, 404)
    );
  }
  //Make sure user is vehicle owner
  if (vehicleRequest.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to update this vehicle`,
        404
      )
    );
  }
  // set isDeleted flag to true
  vehicleRequest.isDeleted = true;

  // save maintenance request
  await vehicleRequest.save();

  res.status(200).json({ message: "Removed Successfully" });
});

// @desc      Update a Vehicle Request Status
// @route     Patch /Request/Vehicle/:id
// @access    Private/HeadofDeployemnt/Director
const updateVehicleRequeststatus = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { isApproved, plateNumber } = req.body;

  const vehicleRequest = await VehicleRequestSchema.findById(id);
  // Check if current user is receiver of the fuel request
  if (req.user.id !== sparePartRequest.reciever.toString()) {
    return next(
      new ErrorResponse(
        `"You are not authorized to update this fuel request`,
        403
      )
    );
  }
  if (!vehicleRequest) {
    return next(new ErrorResponse(`Request not found with id of ${id}`, 404));
  }

  if (vehicleRequest.isDeleted) {
    return next(
      new ErrorResponse(
        "Cannot approve because the associated vehicle is deleted",
        404
      )
    );
  }

  if (isApproved === "Approved") {
    const vehicle = await SparePart.getVehicleByPlateNumber(plateNumber);

    if (!vehicle) {
      return next(
        new ErrorResponse(
          `Vehicle not found with plate number of ${plateNumber}`,
          404
        )
      );
    }
    vehicleRequest.vehicle = vehicle._id;
  }

  vehicleRequest.isApproved = isApproved;
  await vehicleRequest.save();

  res.status(200).json({ success: true });
});

module.exports = {
  getvehicleRequests,
  createvehicleRequest,
  updatevehicleRequest,
  deleteVehicleRequest,
  updateVehicleRequeststatus,
};
