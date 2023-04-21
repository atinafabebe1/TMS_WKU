const SparePart = require("../models/sparePartRequest");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const mongoose = require("mongoose");

//@desc      to get All Spare part requests
//@route     GET/http://localhost:3500/SparePart
//@access    GARAGEDIRECTOR
const getSpareParts = asyncHandler(async (req, res) => {
  res.status(200).json(res.advancedResults);
});

//@desc      to create spare part request
//@route     POST/http://localhost:3500/SparePart
//@access    MECHANIC
const createSparePart = asyncHandler(async (req, res) => {
  req.body.user = req.user.id;

  const vehicle = await SparePart.getVehicleByPlateNumber(req.body.plateNumber);

  if (!vehicle) {
    return next(
      new ErrorResponse(
        `Vehicle not found with plate number of ${req.body.plateNumber}`,
        404
      )
    );
  }

  req.body.vehicle = vehicle._id;
  const sparepartRequest = await SparePart.create(req.body);
  res.status(200).json(sparepartRequest);
});

//@desc      to Update single Maintenance Report
//@route     PUT/http://localhost:3500/SparePart/:ID
//@access    MECHANIC
const updateSparePart = asyncHandler(async (req, res, next) => {
  let sparePartRequest = await SparePart.findById(req.params.id);

  if (!sparePartRequest) {
    return next(
      new ErrorResponse(`Spare Part not found with id of ${req.params.id}`, 404)
    );
  }

  //Make sure user is vehicle owner
  // if (sparePartRequest.user.toString() !== req.user.id) {
  //   return next(
  //     new ErrorResponse(
  //       `User ${req.params.id} is not authorized to update this maintenance Order`,
  //       404
  //     )
  //   );
  // }
  sparePartRequest = await SparePart.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json(sparePartRequest);
});

//@desc      to Delete single Maintenance Report
//@route     DELETE/http://localhost:3500/SparePart/:ID
//@access    MECHANIC/GARAGEDIRECTOR
const deleteSparePart = asyncHandler(async (req, res, next) => {
  let sparePartRequest = await SparePart.findById(req.params.id);
  if (!sparePartRequest) {
    return next(
      new ErrorResponse(
        `Spare part request not found with id of ${req.params.id}`,
        404
      )
    );
  }
  // to be sure user is maintenance Report owner!!
  if (sparePartRequest.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User not authorized to delete this Spare part request`,
        404
      )
    );
  }
  // set isDeleted flag to true
  sparePartRequest.isDeleted = true;

  // save spare part request
  await sparePartRequest.save();

  res.status(200).json({ message: "Removed Successfully" });
});

// @desc      Approve a Vehicle Request
// @route     Patch /Request/Vehicle/:id
// @access    Private/HeadofDeployemnt/Director
const updateSparePartStatus = asyncHandler(async (req, res, next) => {
  let sparePartRequest = await SparePart.findById(req.params.id);

  // Check if current user is receiver of the fuel request
  if (req.user.id !== sparePartRequest.reciever.toString()) {
    return next(
      new ErrorResponse(
        `"You are not authorized to update this fuel request`,
        403
      )
    );
  }
  if (!SparePart) {
    return next(
      new ErrorResponse(`Request not found with id of ${req.params.id}`, 404)
    );
  }

  if (sparePartRequest.isDeleted === true) {
    return next(
      new ErrorResponse(
        `Cann't approve because the vehicle associated with request is deleted`,
        404
      )
    );
  }
  if (sparePartRequest.isApproved === "Approved") {
    const vehicle = await SparePart.getVehicleByPlateNumber(
      maintenanceRequest.plateNumber
    );

    if (!vehicle) {
      return next(
        new ErrorResponse(
          `Vehicle not found with plate number of ${req.body.plateNumber}`,
          404
        )
      );
    }
    sparePartRequest = await SparePart.findByIdAndUpdate(
      req.params.id,
      {
        vehicle: vehicle._id,
        isApproved: req.body.isApproved,
      },
      {
        new: true,
        runValidators: true,
      }
    );
  } else {
    sparePartRequest = await SparePart.findByIdAndUpdate(req.params.id, {
      isApproved: req.body.isApproved,
    });
  }

  res.status(200).json(sparePartRequest);
});

module.exports = {
  createSparePart,
  getSpareParts,
  updateSparePart,
  deleteSparePart,
  updateSparePartStatus,
};
