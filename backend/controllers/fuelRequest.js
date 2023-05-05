const FuelRequest = require("../models/fuelRequest");
const UserSchema = require("../models/user");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
// const {
//   ROLE_FUELDISTRUBTOR,
//   ROLE_HEADOFDEPLOYMENT,
//   ROLE_DIRECTOR,
//   ROLE_VICEPRESIDENT,
// } = require("../../frontend/src/constants");

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
  }

  req.body.vehicle = vehicle._id;

  const fuelRequest = await FuelRequest.create(req.body);
  res.status(200).json(fuelRequest);
});

//@desc       to update sent fuel request
//@routee     PUT/FuelRequest
//@access     DRIVER/EMPLOYEE

const updateFuelRequest = asyncHandler(async (req, res, next) => {
  let fuelRequest = await FuelRequest.findById(req.params.id);

  if (!fuelRequest) {
    return next(
      new ErrorResponse(
        `Fuel Request not found with id of ${req.params.id}`,
        404
      )
    );
  }

  // if (fuelRequest.user.toString() !== req.user.id) {
  //   return next(
  //     new ErrorResponse(
  //       `User ${req.params.id} is not authorized to update this maintenance Order`,
  //       404
  //     )
  //   );
  // }

  // const vehicle = await FuelRequest.getVehicleByPlateNumber(
  //   req.body.plateNumber
  // );

  // if (!vehicle) {
  //   return next(
  //     new ErrorResponse(
  //       `Vehicle not found with plate number ${req.body.plateNumber} `,
  //       404
  //     )
  //   );
  // }

  // req.body.vehicle = vehicle._id;

  fuelRequest = await FuelRequest.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json(fuelRequest);
});

// const updateFuelRequest = asyncHandler(async (req, res, next) => {
//   const {
//     plateNumber,
//     prevRecordOnCounter,
//     typeOfFuel,
//     currentRecordOnCounter,
//     departingAddress,
//     destinationAddress,
//     distanceTraveled,
//     amountOfFuelUsed,
//     isDeleted,
//   } = req.body;

//   let fuelRequest = await FuelRequest.findById(req.params.id);

//   if (!fuelRequest) {
//     return next(
//       new ErrorResponse(
//         `Fuel request not found with id of ${req.params.id}`,
//         404
//       )
//     );
//   }
//   //Make sure user is vehicle owner
//   if (
//     isDeleted ||
//     plateNumber ||
//     typeOfFuel ||
//     departingAddress ||
//     destinationAddress
//   ) {
//     if (fuelRequest.user.toString() !== req.user.id) {
//       return next(
//         new ErrorResponse(
//           `Your are not authorized to update this fuel request`,
//           404
//         )
//       );
//     }
//   }
//   if (plateNumber) {
//     const vehicle = await FuelRequest.getVehicleByPlateNumber(plateNumber);
//     if (!vehicle) {
//       return next(
//         new ErrorResponse(
//           `Vehicle not found with plate number ${req.body.plateNumber} `,
//           404
//         )
//       );
//     } else {
//       req.body.vehicle = vehicle._id;
//     }
//   }

//   fuelRequest = await FuelRequest.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true,
//   });
//   res.status(200).json(fuelRequest);
// });

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

// const updateFuelRequestStatus = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body;

//     // Validate input data
//     if (!id || !status) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     const allowedStatuses = ["Approved", "Waiting Approval", "Rejected"];
//     if (!allowedStatuses.includes(status)) {
//       return next(new ErrorResponse(`Invalid status: ${status}`, 400));
//     }

//     const fuelRequest = await FuelRequest.findOne({
//       _id: id,
//       isDeleted: false,
//       receiver: { $in: req.user.id },
//     });

//     if (!fuelRequest) {
//       return next(new ErrorResponse(`Fuel request not found`, 404));
//     }

//     if (fuelRequest.user.toString() === req.user.id) {
//       return next(
//         new ErrorResponse(`Unauthorized to update this fuel request`, 401)
//       );
//     }

//     const role = req.user.role;
//     let update = {};

//     if (role === ROLE_FUELDISTRUBTOR) {
//       update = {
//         fuelDistributorApproval: {
//           approvedBy: req.user.id,
//           status,
//         },
//       };
//     }

//     if (role === ROLE_HEADOFDEPLOYMENT) {
//       if (fuelRequest.fuelDistributorApproval === "Approved") {
//         update = {
//           headOfDeploymentApproval: {
//             approvedBy: req.user.id,
//             status,
//           },
//         };
//       } else if (fuelRequest.fuelDistributorApproval === "Pending") {
//         return next(
//           new ErrorResponse(`Cannot approve the fuel request now`, 401)
//         );
//       } else {
//         return next(new ErrorResponse(`Cannot approve the fuel request`, 401));
//       }
//     }

//     if (role === ROLE_DIRECTOR) {
//       if (fuelRequest.headOfDeploymentApproval === "Approved") {
//         update = {
//           directorApproval: {
//             approvedBy: req.user.id,
//             status,
//           },
//         };
//       } else if (fuelRequest.headOfDeploymentApproval === "Pending") {
//         return next(
//           new ErrorResponse(`Cannot approve the fuel request now`, 401)
//         );
//       } else {
//         return next(new ErrorResponse(`Cannot approve the fuel request`, 401));
//       }
//     }

//     if (role === ROLE_VICEPRESIDENT) {
//       if (fuelRequest.directorApproval === "Approved") {
//         const vehicle = await FuelRequest.getVehicleByPlateNumber(
//           fuelRequest.plateNumber
//         );
//         update = {
//           vicePresidentApproval: {
//             approvedBy: req.user.id,
//             status,
//           },
//           status,
//           vehicle: vehicle?.id,
//         };
//       } else if (fuelRequest.directorApproval === "Pending") {
//         return next(
//           new ErrorResponse(`Cannot approve the fuel request now`, 401)
//         );
//       } else {
//         return next(new ErrorResponse(`Cannot approve the fuel request`, 401));
//       }
//     }

//     // Update fuel request
//     await FuelRequest.findOneAndUpdate({ _id: id }, update);

//     // Return updated fuel request
//     res.status(200).json({ message: `Fuel Request ${status}` });
//   } catch (error) {
//     next(error);
//   }
// };

module.exports = {
  createFuelRequest,
  getfuelRequests,
  updateFuelRequest,
  deleteFuelRequest,
};
