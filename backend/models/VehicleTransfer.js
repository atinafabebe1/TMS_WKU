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
      required: true,
      ref: "User",
    },
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "VehicleRecord",
    },
    date: {
      type: Date,
      required: true,
    },
    modelOfVehicle: {
      type: String,
      required: true,
    },
    plateNumber: {
      type: String,
      required: true,
      maxlength: 10,
      validate: {
        validator: function (v) {
          const pattern = /^[1-5][A-Z][0-9]{7}$/i;
          return pattern.test(v);
        },
        message: (props) => `${props.value} is not a valid plate number`,
      },
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "Approved", "Rejected"],
      validate: {
        validator: function (v) {
          if (this.isNew && v !== "pending") {
            return false;
          }
          return true;
        },
        message: (props) =>
          `Cannot set status "${props.value}" when creating a new maintenance request.`,
      },
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
  const vehicle = await this.model("VehicleRecord")
    .findOne({ plateNumber })
    .select({ _id: 1 });

  return vehicle;
};

module.exports = mongoose.model("Vehicle Transfer", VehicleTransferSchema);
