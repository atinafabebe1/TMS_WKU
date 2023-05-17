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
  try {
    const resource = await Resource.createOrUpdate({
      type: req.body.type,
      amount: req.body.amount,
      unitPrice: req.body.unitPrice,
      totalPrice: req.body.totalPrice,
    });
    res.json(resource);
  } catch (error) {
    next(error);
  }
});

module.exports = {
  updateResources,
  createResources,
  getresources,
};
