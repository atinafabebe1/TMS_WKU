const SparePart = require("../models/sparePartRequest");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const mongoose = require("mongoose");

//@desc      to get All Spare part requests
//@route     GET/http://localhost:3500/SparePart
//@access    GARAGEDIRECTOR
const getSparePartsReport = asyncHandler(async (req, res) => {
  res.status(200).json(res.advancedResults);
});

//@desc      to create spare part request
//@route     POST/http://localhost:3500/SparePart
//@access    MECHANIC
const SaveSparePartReport = asyncHandler(async (req, res) => {
  req.body.user = req.user.id;

  const thirtyDaysAgo = format(
    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    "yyyy-MM-dd"
  );

  //fetch data from AccessoryRequests WHERE created_at >= '${thirtyDaysAgo}'
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

module.exports = {
  getSparePartsReport,
  SaveSparePartReport,
};
