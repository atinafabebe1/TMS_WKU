const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const VehicleTransferSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
      immutable: true,
    },
    reciever: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "VehicleRecord",
    },
    description: {
      type: String,
      required: true,
    },
    plateNumber: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Approved", "Rejected"],
    },
    rejectedReason: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
VehicleTransferSchema.statics.getVehicleByPlateNumber = async function (
  plateNumber
) {
  return this.findOne({ plateNumber });
};

module.exports = mongoose.model("VehicleTransfer", VehicleTransferSchema);
