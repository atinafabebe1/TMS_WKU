const MonthlyReportSchema = require("../models/monthlyReport");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Vehicle = require("../models/registerVehicle");
const FuelRequest = require("../models/fuelRequest");
const MaintenanceReport = require("../models/maintenanceReport");
const MaintenanceOrder = require("../models/maintenanceOrder");
const moment = require("moment");

//@desc      to get all sent monthly Report
//@route     http://localhost:3500/monthlyReport
//@access    Director/HOD
const getmonthlyReports = asyncHandler(async (req, res) => {
  res.status(200).json(res.advancedResults);
});

//@desc       to create fuel request
//access       Director/HOD
const generateMonthlyReport = async () => {
  try {
    // Get all the vehicles in the system
    const vehicles = await Vehicle.find({ isDeleted: false });

    // Loop through each vehicle and generate the monthly report
    for (const vehicle of vehicles) {
      // Get the fuel consumption for the current month
      const currentMonth = moment().format("YYYY-MM");
      const fuelRequests = await FuelRequest.find({
        vehicle: vehicle._id,
        isDeleted: false,
        isApproved: "Approved",
        createdAt: {
          $gte: moment(currentMonth).startOf("month"),
          $lte: moment(currentMonth).endOf("month"),
        },
      });
      const totalOilCost = fuelRequests
        .filter((rt) => rt.typeOfFuel == "oil")
        .reduce((total, request) => total + request.amountOfFuelUsed, 0);
      const totalFuelConsumptionInLiter = fuelRequests
        .filter((rt) => rt.typeOfFuel == "fuel")
        .reduce((total, request) => total + request.amountOfFuelUsed, 0);

      // Get the maintenance cost for the current month
      const maintenanceReports = await MaintenanceReport.find({
        vehicle: vehicle._id,
        isDeleted: false,
        createdAt: {
          $gte: moment(currentMonth).startOf("month"),
          $lte: moment(currentMonth).endOf("month"),
        },
      });

      // Get the maintenance cost for the current month
      const maintenanceOrder = await MaintenanceOrder.find({
        vehicle: vehicle._id,
        isDeleted: false,
        createdAt: {
          $gte: moment(currentMonth).startOf("month"),
          $lte: moment(currentMonth).endOf("month"),
        },
      }).sort();

      let totalKiloMeter = 0;

      if (maintenanceOrder.length > 0) {
        const firstReport = maintenanceOrder[0];
        const lastReport = maintenanceOrder[maintenanceOrder.length - 1];
        totalKiloMeter =
          lastReport.kilometerOnCounter - firstReport.kilometerOnCounter;
      }
      // const serviceCost = maintenanceReports.reduce((total, report) => total + report.serviceCost, 0);
      // const tierCost = maintenanceReports.reduce((total, report) => total + report.tierCost, 0);
      // const tierMaintenanceCost = maintenanceReports.reduce((total, report) => total + report.tierMaintenanceCost, 0);

      // Generate the monthly report
      const report = new MonthlyReportSchema({
        vehicle: vehicle._id,
        totalfuelConsumptionInLiter: totalFuelConsumptionInLiter,
        totalKiloMeter,
        totalFuelCost: totalFuelConsumptionInLiter * 1000 || 0,
        totalOilCost: totalOilCost * 1000,
        // totalAccessoriesCost: maintenanceReports.reduce((total, report) => total + report.accessoriesCost, 0)||0,
        serviceCost: 0,
        tierCost: 0,
        tierMaintenanceCost: 0,
        totalFee: 0,
        FeeInKiloMeter: 0,
        crashtype: 0,
        service: 0,
      });

      await report.save();
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getmonthlyReports,
  generateMonthlyReport,
};
