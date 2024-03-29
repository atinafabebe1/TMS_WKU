// const MaintenanceReport = require('../models/maintenanceReport');
// const ErrorResponse = require('../utils/errorResponse');

// const maintenanceReportController = {
//   create: async (req, res) => {
//     try {
//       const maintenanceReport = new MaintenanceReport(req.body);
//       await maintenanceReport.save();
//       res.status(201).json({ success: true, data: maintenanceReport });
//     } catch (error) {
//       console.error('Failed to create maintenance report:', error);
//       res.status(500).json({ success: false, error: 'Failed to create maintenance report' });
//     }
//   },

//   getAll: async (req, res) => {
//     try {
//       const maintenanceReports = await MaintenanceReport.find();
//       res.json({ success: true, data: maintenanceReports });
//     } catch (error) {
//       console.error('Failed to get maintenance reports:', error);
//       res.status(500).json({ success: false, error: 'Failed to get maintenance reports' });
//     }
//   },

//   getById: async (req, res) => {
//     const { id } = req.params;
//     try {
//       const maintenanceReport = await MaintenanceReport.findById(id);
//       if (!maintenanceReport) {
//         return res.status(404).json({ success: false, error: 'Maintenance report not found' });
//       }
//       res.json({ success: true, data: maintenanceReport });
//     } catch (error) {
//       console.error('Failed to get maintenance report:', error);
//       res.status(500).json({ success: false, error: 'Failed to get maintenance report' });
//     }
//   },

//   update: async (req, res) => {
//     const { id } = req.params;
//     try {
//       const maintenanceReport = await MaintenanceReport.findByIdAndUpdate(
//         id,
//         req.body,
//         { new: true }
//       );
//       if (!maintenanceReport) {
//         return res.status(404).json({ success: false, error: 'Maintenance report not found' });
//       }
//       res.json({ success: true, data: maintenanceReport });
//     } catch (error) {
//       console.error('Failed to update maintenance report:', error);
//       res.status(500).json({ success: false, error: 'Failed to update maintenance report' });
//     }
//   },

//   updateStatus: async (req, res) => {
//     const { id } = req.params;
//     const { status } = req.body;
//     try {
//       const maintenanceReport = await MaintenanceReport.findByIdAndUpdate(
//         id,
//         { status },
//         { new: true }
//       );
//       if (!maintenanceReport) {
//         return res.status(404).json({ success: false, error: 'Maintenance report not found' });
//       }
//       res.json({ success: true, data: maintenanceReport });
//     } catch (error) {
//       console.error('Failed to update maintenance report status:', error);
//       res.status(500).json({ success: false, error: 'Failed to update maintenance report status' });
//     }
//   },
// };

// module.exports = maintenanceReportController;


const MaintenanceReport = require("../models/maintenanceReport");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const mongoose = require("mongoose");

//@desc      to get Maintenance Reports based on duration
//@route     GET /http://localhost:3500/MaintenanceReport/maintenance-reports/:duration
//@access    MECHANIC, GARAGEDIRECTOR
const getMaintenanceReports = asyncHandler(async (req, res) => {
  const { duration } = req.params;
  let startDate, endDate;

  // Calculate the start and end date based on the selected duration
  if (duration === 'Daily') {
    startDate = new Date();
    startDate.setDate(startDate.getDate() - 1);
    endDate = new Date();
  } else if (duration === 'Weekly') {
    startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);
    endDate = new Date();
  } else if (duration === 'Monthly') {
    startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 1);
    endDate = new Date();
  } else {
    return res.status(400).json({ message: 'Invalid duration' });
  }

  // Fetch maintenance reports from the database
  const maintenanceReports = await MaintenanceReport.find({
    createdAt: { $gte: startDate, $lte: endDate },
  })
    .populate('user', 'username') // Populate the referenced 'User' fields
    .populate('vehicle', 'plateNumber') // Populate the referenced 'VehicleRecord' fields
    .populate('expertExamined', 'username') // Populate the referenced 'User' fields
    .populate('expertWorked', 'username') // Populate the referenced 'User' fields
    .populate('garageDirector', 'username') // Populate the referenced 'User' fields
    .exec();

  // Create a map to store the combined exchangedMaintenanceTotalPrice for each plate number
  const plateNumberMap = {};

  maintenanceReports.forEach((report) => {
    const { plateNumber, exchangedMaintenanceTotalPrice } = report;
    if (plateNumberMap[plateNumber]) {
      plateNumberMap[plateNumber] += exchangedMaintenanceTotalPrice;
    } else {
      plateNumberMap[plateNumber] = exchangedMaintenanceTotalPrice;
    }
  });

  // Update the exchangedMaintenanceTotalPrice for reports with the same plate number
  maintenanceReports.forEach((report) => {
    const { plateNumber } = report;
    if (plateNumberMap[plateNumber]) {
      report.exchangedMaintenanceTotalPrice = plateNumberMap[plateNumber];
    }
  });

  res.status(200).json(maintenanceReports);
});

//@desc      to Create Maintenance Report
//@route     POST /http://localhost:3500/MaintenanceReport
//@access    MECHANIC
const createMaintenanceReport = asyncHandler(async (req, res) => {
  try {
    const reportData = req.body;

    // Create a new instance of the MaintenanceReport model with the reportData
    const maintenanceReport = new MaintenanceReport(reportData);

    // Save the maintenance report data to the database
    await maintenanceReport.save();

    // Return a success response
    res.status(200).json({ message: 'Maintenance report submitted successfully' });
  } catch (error) {
    console.error('Failed to submit maintenance report:', error);
    // Return an error response
    res.status(500).json({ error: 'Failed to submit maintenance report' });
  }
});

//@desc      to Update single Maintenance Report
//@route     PUT /http://localhost:3500/MaintenanceReport/:ID
//@access    MECHANIC
const updateMaintenanceReport = asyncHandler(async (req, res, next) => {
  let maintenanceReport = await MaintenanceReport.findById(req.params.id);

  if (!maintenanceReport) {
    return next(
      new ErrorResponse(
        `Maintenance Report not found with id of ${req.params.id}`,
        404
      )
    );
  }

  maintenanceReport = await MaintenanceReport.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json(maintenanceReport);
});

//@desc      to Delete single Maintenance Report
//@route     DELETE /http://localhost:3500/MaintenanceReport/:ID
//@access    MECHANIC/GARAGEDIRECTOR
const deleteMaintenanceReport = asyncHandler(async (req, res, next) => {
  let maintenanceReport = await MaintenanceReport.findById(req.params.id);
  if (!maintenanceReport) {
    return next(
      new ErrorResponse(
        `Maintenance Report not found with id of ${req.params.id}`,
        404
      )
    );
  }
  // to be sure user is maintenance Report owner!!
  if (maintenanceReport.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User not authorized to delete this Maintenance Order`,
        404
      )
    );
  }

  // set isDeleted flag to true
  maintenanceReport.isDeleted = true;

  // save maintenance request
  await maintenanceReport.save();

  res.status(200).json({ message: "Removed Successfully" });
});

module.exports = {
  createMaintenanceReport,
  getMaintenanceReports,
  updateMaintenanceReport,
  deleteMaintenanceReport,
};
