const mongoose = require("mongoose");
const ErrorResponse = require("../utils/errorResponse");
const Schema = mongoose.Schema;

const MaintenanceReportSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      immutable: true,
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
          const pattern = /^(4-[0-9]{5}|UN [0-9]{3})$/i;
          return pattern.test(v);
        },
        message: (props) => `${props.value} is not a valid plate number`,
      },
    },
    spareparts: {
      identificationNumber: {
        type: String,
        required: true,
        unique: true,
        minlength: 6,
        maxlength: 20,
      },
      itemName: { type: String, required: true },
      itemPrice: {
        type: Number,
        required: true,
        min: [0, "Price must be positive"],
      },
      itemQuantity: {
        type: Number,
        required: true,
        min: [0, "Price must be positive"],
      },
      totalPrice: {
        type: Number,
        required: true,
        min: [0, "Price must be positive"],
      },
    },
    exchangedMaintenanceTotalPrice: {
      type: Number,
      required: true,
      min: [0, "Price must be positive"],
    },
    status: {
      type: String,
      default: "Waiting-Mech-To-Approve",
      enum: [
        "Waiting-Mech-To-Approve",
        "Waiting-GD-To-Approve",
        "completed",
        "canceled",
      ],
      validate: {
        validator: function (v) {
          if (this.isNew && v !== "Waiting-Mech-To-Approve") {
            return false;
          }
          return true;
        },
        message: (props) =>
          `Cannot set status "${props.value}" when creating a new maintenance request.`,
      },
    },
    examination: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 500,
    },
    expertWorked: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    expertExamined: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    garageDirector: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
MaintenanceReportSchema.pre("save", async function (next) {
  const expertExamined = await this.model("User").findById(this.expertExamined);
  const garageDirector = await this.model("User").findById(this.garageDirector);
  const expertWorked = await this.model("User").findById(this.expertWorked);
  const user = await this.model("User").findById(this.user);

  if (!expertExamined) {
    return next(
      new ErrorResponse(
        `Expert examined with ID ${this.expertExamined} not found`,
        404
      )
    );
  }

  if (!garageDirector) {
    return next(
      new ErrorResponse(
        `Garage director with ID ${this.garageDirector} not found`,
        404
      )
    );
  }

  if (!expertWorked) {
    return next(
      new ErrorResponse(
        `Expert worked with ID ${this.expertWorked} not found`,
        404
      )
    );
  }

  if (!user) {
    return next(new ErrorResponse(`User with ID ${this.user} not found`, 404));
  }

  next();
});

module.exports = mongoose.model("Maintenance Report", MaintenanceReportSchema);
