const FuelRequest = require("../models/fuelRequest");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

//@desc      to get all created fuel requests
//@route     GET request/fuel/all
//@access    FuelDistribute/HOD
const getfuelRequests = asyncHandler(async (req, res) => {
  res.status(200).json(res.advancedResults);
});

//@desc       to create fuel request
//@route      POST/FuelRequest
//@access     DRIVER/EMPLOYEE
const createFuelRequest = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;
  const {
    user,
    reciever,
    plateNumber,
    typeOfVehicle,
    typeOfFuel,
    prevRecordOnCounter,
    currentRecordOnCounter,
    sourceLocation,
    destination,
    distanceTraveled,
    amountOfFuelUsed,
  } = req.body;
  const createdFiled = {
    user,
    reciever,
    plateNumber,
    typeOfVehicle,
    typeOfFuel,
    prevRecordOnCounter,
    currentRecordOnCounter,
    sourceLocation,
    destination,
    distanceTraveled,
    amountOfFuelUsed,
  };

  const vehicle = await FuelRequest.getVehicleByPlateNumber(
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

  const fuelRequest = await FuelRequest.create(createdFiled);
  res.status(200).json(fuelRequest);
});

//@desc       to update sent fuel request
//@routee     PUT/FuelRequest
//@access     DRIVER/EMPLOYEE
const updateFuelRequest = asyncHandler(async (req, res, next) => {
  delete req.body.status;
  delete req.body.vehicle;

  let fuelRequest = await FuelRequest.findById(req.params.id);

  if (!fuelRequest) {
    return next(
      new ErrorResponse(
        `Fuel request not found with id of ${req.params.id}`,
        404
      )
    );
  }
  //Make sure user is vehicle owner
  if (fuelRequest.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to update this fuel Request`,
        404
      )
    );
  }
  if (req.body.plateNumber) {
    const vehicle = await FuelRequest.getVehicleByPlateNumber(
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

  fuelRequest = await FuelRequest.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json(fuelRequest);
});

//@desc       to delete sent fuel request
//@route      DELETE/FuelRequest
//@access     DRIVER/EMPLOYEE
const deleteFuelRequest = asyncHandler(async (req, res, next) => {
  let fuelRequest = await FuelRequest.findById(req.params.id);
  if (!fuelRequest) {
    return next(
      new ErrorResponse(
        `Fuel Request not found with id of ${req.params.id}`,
        404
      )
    );
  }
  // to be sure user is fuel Request owner!!
  if (fuelRequest.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(`User not authorized to delete this fuel Request`, 404)
    );
  }
  // to be sure user is fuel Request owner!!
  if (fuelRequest.status !== "Waiting Approval") {
    return next(
      new ErrorResponse(`Can't delete approved or rejected request`, 400)
    );
  }

  // set isDeleted flag to true
  fuelRequest.isDeleted = true;

  // save maintenance request
  await fuelRequest.save();

  res.status(200).json({ message: "Removed Successfully" });
});

// @desc      Approve a Vehicle Request
// @route     Patch /Request/request/fuel/:id
// @access    Private/HeadofDeployemnt/Director
const updateFuelRequestStatus = asyncHandler(async (req, res, next) => {
  try {
    // Validate input data
    const { id } = req.params;
    const { status } = req.body;
    if (!id || !status) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    if (
      status !== "Approved" &&
      status !== "Waiting Approval" &&
      status !== "Rejected"
    ) {
      return next(new ErrorResponse(`Invalid status: ${status}`, 400));
    }

    // Check if fuel request exists and if user is authorized to update it
    const fuelRequest = await FuelRequest.findOne({
      _id: id,
      isDeleted: false,
      receiver: req.user.id,
    });
    if (!fuelRequest) {
      return next(
        new ErrorResponse(`Maintenance request not found with id of ${id}`, 404)
      );
    }
    // check if the user who created the maintenance request is updating the status
    if (fuelRequest.user.toString() === req.user.id) {
      return next(
        new ErrorResponse(
          `You are not authorized to update this fuel request`,
          401
        )
      );
    }

    if (
      fuelRequest.status === "Approved" ||
      fuelRequest.status === "Rejected"
    ) {
      return next(
        new ErrorResponse(
          `Fuel Request with id of ${requestId} is not pending`,
          400
        )
      );
    }
    // Get vehicle ID if status is approved
    let vehicleId;
    if (status !== "Waiting Approval") {
      const vehicle = await FuelRequest.getVehicleByPlateNumber(
        fuelRequest.plateNumber
      );
      vehicleId = vehicle.id;
    }

    // Update fuel request
    await FuelRequest.findOneAndUpdate(
      { _id: id },
      { status, ...(vehicleId && { vehicle: vehicleId }) },
      { new: true }
    );

    // Return updated fuel request
    res.status(200).json({ message: `Fuel Request ${status} Successfully` });
  } catch (error) {
    next(error);
  }
});

module.exports = {
  createFuelRequest,
  getfuelRequests,
  updateFuelRequest,
  deleteFuelRequest,
  updateFuelRequestStatus,
};
