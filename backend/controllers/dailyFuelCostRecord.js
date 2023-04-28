const DailyFuelCost = require("../models/dailyFuelCostRecording");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

// @desc    Get all daily fuel cost records
// @route   GET /report/daily-fuel-costs
// @access  fueldistrubtor
const getDailyFuelCostRecords = asyncHandler(async (req, res) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Create a daily fuel cost record
// @route   POST /report/daily-fuel-costs
// @access  fueldistrubtor
const createDailyFuelCost = asyncHandler(async (req, res, next) => {
  delete req.body.vehicle;
  const vehicle = await DailyFuelCost.getVehicleByPlateNumber(
    req.body.plateNumber
  );
  if (!vehicle) {
    return next(
      new ErrorResponse(
        `vehicle not found with plate number ${req.body.plateNumber}`,
        404
      )
    );
  }
  await DailyFuelCost.create(req.body);

  res.status(201).json({
    message: "Succesfully Added",
  });
});

//@desc       to update DailyFuelCost
//@routee     Put /dail-fuel-cost/:id
//@access     fueldistrubtor
const updateDailyFuelCost = asyncHandler(async (req, res, next) => {
  delete req.body.vehicle;
  delete req.body.user;

  let dailyFuelCost = await DailyFuelCost.findById(req.params.id);

  if (!dailyFuelCost || dailyFuelCost.isDeleted === true) {
    return next(
      new ErrorResponse(
        `daily fuel cost not found with id of ${req.params.id}`,
        404
      )
    );
  }
  //Make sure user is report owner

  // if (dailyFuelCost.user.toString() !== req.user.id) {
  //   return next(
  //     new ErrorResponse(
  //       `User ${req.params.id} is not authorized to update this dailly fuel cost`,
  //       404
  //     )
  //   );
  // }
  delete req.body.vehicle;
  const vehicle = await DailyFuelCost.getVehicleByPlateNumber(
    req.body.plateNumber
  );
  if (!vehicle) {
    return next(
      new ErrorResponse(
        `vehicle not found with plate number ${req.body.plateNumber}`,
        404
      )
    );
  }
  dailyFuelCost = await DailyFuelCost.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json(dailyFuelCost);
});

//@desc       to Delete  daily fuel cost
//@routee     DELETE /DailyFuelCost
//@access     fueldistrubutor
const deleteDailyFuelCost = asyncHandler(async (req, res, next) => {
  let dailyFuelCost = await DailyFuelCost.findById(req.params.id);
  if (!dailyFuelCost) {
    return next(
      new ErrorResponse(
        `Maintenanc Report not found with id of ${req.params.id}`,
        404
      )
    );
  }
  // to be sure user is maintenance Report owner!!
  if (dailyFuelCost.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User not authorized to delete this Maintenance Order`,
        404
      )
    );
  }

  // set isDeleted flag to true
  dailyFuelCost.isDeleted = true;

  // save maintenance request
  await dailyFuelCost.save();

  res.status(200).json({ message: "Removed Successfully" });
});

module.exports = {
  getDailyFuelCostRecords,
  createDailyFuelCost,
  updateDailyFuelCost,
  deleteDailyFuelCost,
};
