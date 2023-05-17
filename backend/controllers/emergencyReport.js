const EmergencyReport = require("../models/emergencyReport");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

//@desc       to get all sent Emergency Report
//@routee     GET/http://localhost:3500/EmergencyReport
//@access     DRIVER/EMPLOYEE
const getemergencyReports = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

//@desc       to Create Emergency Report
//@routee     POST/http://localhost:3500/EmergencyReport
//@access     DRIVER/EMPLOYEE
const createEmergencyReport = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;

  const vehicle = await EmergencyReport.getVehicleByPlateNumber(
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

  const emergenceReport = await EmergencyReport.create(req.body);
  res.status(200).json(emergenceReport);
});

//@desc       to Delete  Emergency Report
//@routee     DELETE/http://localhost:3500/EmergencyReport/:ID
//@access     DRIVER/EMPLOYEE
const deleteEmergencyReport = asyncHandler(async (req, res, next) => {
  let emergencyReport = await EmergencyReport.findById(req.params.id);
  if (!emergencyReport) {
    return next(
      new ErrorResponse(
        `Emmergency Report not found with id of ${req.params.id}`,
        404
      )
    );
  }
  // to be sure user is Emergence Report owner!!
  if (emergencyReport.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User not authorized to delete this Emergency Report`,
        404
      )
    );
  }
  // set isDeleted flag to true
  emergencyReport.isDeleted = true;

  // save maintenance request
  await emergencyReport.save();

  res.status(200).json({ message: "Removed Successfully" });
});

//@desc       to update sent Emergency Report
//@routee     PUT/http://localhost:3500/EmergencyReport/:ID
//@access     DRIVER/EMPLOYEE
const updateEmergencyReport = asyncHandler(async (req, res, next) => {
  let emergenceReport = await EmergencyReport.findById(req.params.id);

  if (!emergenceReport) {
    return next(
      new ErrorResponse(`Request not found with id of ${req.params.id}`, 404)
    );
  }

  emergenceReport = await EmergencyReport.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json(emergenceReport);
});

module.exports = {
  createEmergencyReport,
  getemergencyReports,
  deleteEmergencyReport,
  updateEmergencyReport,
};
