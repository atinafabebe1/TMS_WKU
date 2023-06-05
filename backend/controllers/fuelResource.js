const Resource = require("../models/fuelResources");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

const getresources = asyncHandler(async (req, res) => {
  res.status(200).json(res.advancedResults);
});

const createResources = asyncHandler(async (req, res, next) => {
  const resource = await Resource.create(req.body);
  res.status(200).json(resource);
});

const updateResources = asyncHandler(async (req, res, next) => {
  let fuelResource = await Resource.findById(req.params.id);
  fuelResource = await Resource.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json(fuelResource);
});

// const updateFuelRequest = asyncHandler(async (req, res, next) => {
//   let fuelRequest = await FuelRequest.findById(req.params.id);

//   fuelRequest = await FuelRequest.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true,
//   });
//   res.status(200).json(fuelRequest);
// });

module.exports = {
  updateResources,
  createResources,
  getresources,
};
