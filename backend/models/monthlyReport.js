const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MonthlyReportSchema = new Schema(
  {
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Vehicle Information",
    },
    totalfuelConsumptionInLiter: {
      type: Number,
      min: 0,
      max: 999999,
    },
    totalKiloMeter: {
      type: Number,
      min: 0,
      max: 999999,
    },
    averageKilometerPerLiter: {
      type: Number,
      min: 0,
      max: 999999,
    },
    totalFuelCost: {
      type: Number,
      min: 0,
      max: 999999,
    },
    totalOilCost: {
      type: Number,
      min: 0,
      max: 999999,
    },
    totalAccessoriesCost: {
      type: Number,
      min: 0,
      max: 999999,
    },
    serviceCost: {
      type: Number,
      min: 0,
      max: 999999,
    },
    tierCost: {
      type: Number,
      min: 0,
      max: 999999,
    },
    tierMaintenanceCost: {
      type: Number,
      min: 0,
      max: 999999,
    },
    totalFee: {
      type: Number,
      min: 0,
      max: 999999,
    },
    FeeInKiloMeter: {
      type: Number,
      min: 0,
      max: 999999,
    },
    crashtype: {
      type: Number,
      min: 0,
      max: 999999,
    },
    service: {
      type: Number,
      min: 0,
      max: 999999,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Monthly Report", MonthlyReportSchema);
