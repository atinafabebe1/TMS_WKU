const mongoose = require("mongoose");
const ErrorResponse = require("../utils/errorResponse");

const Schema = mongoose.Schema;

const MaintenanceRequestSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      immutable: true,
    },
    reciever: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VehicleRecord",
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

    description: {
      type: String,
      required: [
        true,
        "Please enter a description for the maintenance request.",
      ],
      maxlength: [500, "The description cannot be longer than 500 characters."],
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "in-progress", "completed", "canceled"],
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

MaintenanceRequestSchema.pre("save", async function (next) {
  const vehicle = await this.model("VehicleRecord").findOne({
    plateNumber: this.plateNumber,
    isDeleted: false,
  });
  if (!vehicle) {
    return next(
      new ErrorResponse(
        `Vehicle not found with plate number ${this.plateNumber}`,
        404
      )
    );
  }
  const reciever = await this.model("User").findById(this.reciever);
  const user = await this.model("User").findById(this.user);

  if (!reciever) {
    return next(
      new ErrorResponse(`Reciever with ID ${this.reciever} not found`, 404)
    );
  }
  if (!user) {
    return next(new ErrorResponse(`User with ID ${this.user} not found`, 404));
  }
  next();
});

MaintenanceRequestSchema.statics.getVehicleByPlateNumber = async function (
  plateNumber
) {
  const vehicle = await this.model("VehicleRecord")
    .findOne({ plateNumber })
    .select({ _id: 1 });

  return vehicle;
};

module.exports = mongoose.model(
  "Maintenance Request",
  MaintenanceRequestSchema
);
