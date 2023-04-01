const VehicleRequestSchema = require("../models/vehicleRequest");
const VehicleRecord = require("../models/registerVehicle");
const mongoose = require("mongoose");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const {
  ROLE_HEADOFDEPLOYMENT,
  ROLE_VICEPRESIDENT,
  ROLE_DRIVER,
} = require("../constants");
const User = require("../models/user");

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
  delete req.body.firstApproval;
  delete req.body.secondApproval;

  req.body.user = req.user.id;

  let vehicle = await VehicleRequestSchema.getVehicleByPlateNumber(
    req.body.plateNumber
  );

  let receivers = await User.find({
    role: { $in: [ROLE_HEADOFDEPLOYMENT, ROLE_VICEPRESIDENT] },
    isActive: true,
  });
  let driver;
  if (req.body.driver === "drive") {
    driver = req.user.id;
  }

  req.body.driver = driver;

  const headOfDeployment = receivers.find(
    (receiver) => receiver.role === ROLE_HEADOFDEPLOYMENT
  );
  if (headOfDeployment == undefined) {
    return next(new ErrorResponse("first approver not found", 404));
  }

  req.body.firstApproval = { approver: headOfDeployment._id };

  const vicePresident = receivers.find(
    (receiver) => receiver.role === ROLE_VICEPRESIDENT
  );
  if (vicePresident == undefined) {
    return next(new ErrorResponse("second approver not found", 404));
  }
  req.body.secondApproval = { approver: vicePresident._id };
  if (!vehicle) {
    return next(
      new ErrorResponse(
        `Vehicle not found with plate number of ${req.body.plateNumber}`,
        404
      )
    );
  }

  req.body.vehicle = vehicle._id;

  const vehicleRequest = await VehicleRequestSchema.create(req.body);
  res.status(200).json(vehicleRequest);
});

const getAvailableAndUnAvailableVehicle = asyncHandler(
  async (req, res, next) => {
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
  }
);

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

// @desc      approve vehicle request
// @route     Patch /Request/Vehicle/:id
// @access    Private/HeadofDeployemnt/VicePresident
const approveVehicleRequeststatus = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const vehicleRequest = await VehicleRequestSchema.findOne({
    _id: id,
    isDeleted: false,
    status: "pending",
  });
  if (!vehicleRequest) {
    return next(new ErrorResponse(`Request not found with id of ${id}`, 404));
  }
  const { firstApproval, secondApproval } = vehicleRequest;
  // Check if current user is authroized to approve the fuel request
  let authorizationCheck = [
    firstApproval.approver.toString(),
    secondApproval.approver.toString(),
  ];

  if (!authorizationCheck.includes(req.user.id)) {
    return next(
      new ErrorResponse(
        `"You are not authorized to update this fuel request`,
        403
      )
    );
  }

  if (req.user.id === secondApproval.approver.toString()) {
    if (firstApproval.status === "pending") {
      return next(
        new ErrorResponse(
          `You are not authorized to update this fuel request`,
          403
        )
      );
    } else {
      vehicleRequest.secondApproval.status = "approved";
    }
  } else {
    vehicleRequest.firstApproval.status = "approved";
  }

  await vehicleRequest.save();

  res.status(200).json({ message: "Approved" });
});

// @desc      reject vehicle request
// @route     Patch /Request/Vehicle/:id
// @access    Private/HeadofDeployemnt/VicePresident
const rejectVehicleRequeststatus = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const vehicleRequest = await VehicleRequestSchema.findOne({
    _id: id,
    isDeleted: false,
    status: "pending",
  });
  // Check if current user is receiver of the fuel request
  if (!vehicleRequest) {
    return next(new ErrorResponse(`Request not found with id of ${id}`, 404));
  }
  const { firstApproval, secondApproval } = vehicleRequest;
  // Check if current user is authroized to approve the fuel request
  let authorizationCheck = [
    vehicleRequest.firstApproval.approver.toString(),
    vehicleRequest.secondApproval.approver.toString(),
  ];
  if (!authorizationCheck.includes(req.user.id)) {
    return next(
      new ErrorResponse(
        `"You are not authorized to update this fuel request`,
        403
      )
    );
  }
  if (req.user.id === secondApproval.approver.toString()) {
    if (firstApproval.status === "pending") {
      return next(
        new ErrorResponse(
          `You are not authorized to update this fuel request`,
          403
        )
      );
    }
  }
  vehicleRequest.firstApproval.status = "rejected";
  vehicleRequest.secondApproval.status = "rejected";
  await vehicleRequest.save();

  res.status(200).json({ message: "Rejected" });
});

module.exports = {
  getvehicleRequests,
  createvehicleRequest,
  updatevehicleRequest,
  deleteVehicleRequest,
  approveVehicleRequeststatus,
  rejectVehicleRequeststatus,
};
