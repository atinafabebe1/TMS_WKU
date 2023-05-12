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
  const resource = await Resource.findById(req.params.id, {
    new: true,
    runValidators: true,
  });
  resource.amount += req.body.amount;
  await resource.save();
  res.json(resource);
});

module.exports = {
  updateResources,
  createResources,
  getresources,
};
