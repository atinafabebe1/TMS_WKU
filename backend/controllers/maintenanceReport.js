const MaintenanceReport = require('../models/maintenanceReport');
const ErrorResponse = require('../utils/errorResponse');

const maintenanceReportController = {
  create: async (req, res) => {
    try {
      const maintenanceReport = new MaintenanceReport(req.body);
      await maintenanceReport.save();
      res.status(201).json({ success: true, data: maintenanceReport });
    } catch (error) {
      console.error('Failed to create maintenance report:', error);
      res.status(500).json({ success: false, error: 'Failed to create maintenance report' });
    }
  },

  getAll: async (req, res) => {
    try {
      const maintenanceReports = await MaintenanceReport.find();
      res.json({ success: true, data: maintenanceReports });
    } catch (error) {
      console.error('Failed to get maintenance reports:', error);
      res.status(500).json({ success: false, error: 'Failed to get maintenance reports' });
    }
  },

  getById: async (req, res) => {
    const { id } = req.params;
    try {
      const maintenanceReport = await MaintenanceReport.findById(id);
      if (!maintenanceReport) {
        return res.status(404).json({ success: false, error: 'Maintenance report not found' });
      }
      res.json({ success: true, data: maintenanceReport });
    } catch (error) {
      console.error('Failed to get maintenance report:', error);
      res.status(500).json({ success: false, error: 'Failed to get maintenance report' });
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
    try {
      const maintenanceReport = await MaintenanceReport.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
      );
      if (!maintenanceReport) {
        return res.status(404).json({ success: false, error: 'Maintenance report not found' });
      }
      res.json({ success: true, data: maintenanceReport });
    } catch (error) {
      console.error('Failed to update maintenance report:', error);
      res.status(500).json({ success: false, error: 'Failed to update maintenance report' });
    }
  },

  updateStatus: async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
      const maintenanceReport = await MaintenanceReport.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );
      if (!maintenanceReport) {
        return res.status(404).json({ success: false, error: 'Maintenance report not found' });
      }
      res.json({ success: true, data: maintenanceReport });
    } catch (error) {
      console.error('Failed to update maintenance report status:', error);
      res.status(500).json({ success: false, error: 'Failed to update maintenance report status' });
    }
  },
};

module.exports = maintenanceReportController;




// const MaintenanceReport = require("../models/maintenanceReport");
// const ErrorResponse = require("../utils/errorResponse");
// const asyncHandler = require("../middleware/async");
// const mongoose = require("mongoose");

// //@desc      to get All Maintenance Report
// //@route     GET/http://localhost:3500/MaintenanceReport
// //@access    GARAGEDIRECTOR
// const getMaintenanceReports = asyncHandler(async (req, res) => {
//   res.status(200).json(res.advancedResults);
// });

// //@desc      to Create Maintenance Report
// //@route     POST/http://localhost:3500/MaintenanceReport
// //@access    MECHANIC
// const createMaintenanceReport = asyncHandler(async (req, res) => {
  
//   try {
//     const reportData = req.body;

//     // Create a new instance of the MaintenanceReport model with the reportData
//     const maintenanceReport = new MaintenanceReport(reportData);

//     // Save the maintenance report data to the database
//     await maintenanceReport.save();

//     // Return a success response
//     res.status(200).json({ message: 'Maintenance report submitted successfully' });
//   } catch (error) {
//     console.error('Failed to submit maintenance report:', error);
//     // Return an error response
//     res.status(500).json({ error: 'Failed to submit maintenance report' });
//   }
// });

// //@desc      to Update single Maintenance Report
// //@route     PUT/http://localhost:3500/MaintenanceReport/:ID
// //@access    MECHANIC
// const updateMaintenanceReport = asyncHandler(async (req, res, next) => {
//   let maintenanceReport = await MaintenanceReport.findById(req.params.id);

//   if (!maintenanceReport) {
//     return next(
//       new ErrorResponse(
//         `Maintenance Report not found with id of ${req.params.id}`,
//         404
//       )
//     );
//   }
//   //Make sure user is vehicle owner
//   if (maintenanceReport.user.toString() !== req.user.id) {
//     return next(
//       new ErrorResponse(
//         `User ${req.params.id} is not authorized to update this maintenance Order`,
//         404
//       )
//     );
//   }
//   maintenanceReport = await MaintenanceReport.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     {
//       new: true,
//       runValidators: true,
//     }
//   );
//   res.status(200).json(maintenanceReport);
// });

// //@desc      to Delete single Maintenance Report
// //@route     DELETE/http://localhost:3500/MaintenanceReport/:ID
// //@access    MECHANIC/GARAGEDIRECTOR
// const deleteMaintenanceReport = asyncHandler(async (req, res, next) => {
//   let maintenanceReport = await MaintenanceReport.findById(req.params.id);
//   if (!maintenanceReport) {
//     return next(
//       new ErrorResponse(
//         `Maintenanc Report not found with id of ${req.params.id}`,
//         404
//       )
//     );
//   }
//   // to be sure user is maintenance Report owner!!
//   if (maintenanceReport.user.toString() !== req.user.id) {
//     return next(
//       new ErrorResponse(
//         `User not authorized to delete this Maintenance Order`,
//         404
//       )
//     );
//   }

//   // set isDeleted flag to true
//   maintenanceReport.isDeleted = true;

//   // save maintenance request
//   await maintenanceReport.save();

//   res.status(200).json({ message: "Removed Successfully" });
// });

// module.exports = {
//   createMaintenanceReport,
//   getMaintenanceReports,
//   updateMaintenanceReport,
//   deleteMaintenanceReport,
// };
