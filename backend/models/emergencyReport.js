const mongoose = require("mongoose");
const ErrorResponse = require("../utils/errorResponse");

const Schema = mongoose.Schema;

const WitnessSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        const pattern = /^\d{10}$/;
        return pattern.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number`,
    },
  },
});

const EmergencyReportSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
      immutable: true,
    },
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VehicleRecord",
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
    type: {
      type: String,
      required: true,
      enum: ["Accident", "Fire", "Natural Disaster", "Other"],
    },
    detailedDescription: {
      type: String,
      required: true,
    },
    injuries: {
      type: Number,
      required: true,
      validate: {
        validator: function (v) {
          return v >= 0;
        },
        message: (props) => `${props.value} must be a non-negative number`,
      },
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    death: {
      type: Number,
      required: true,
      validate: {
        validator: function (v) {
          return v >= 0;
        },
        message: (props) => `${props.value} must be a non-negative number`,
      },
    },
    damagedProperties: {
      type: Number,
      required: true,
      validate: {
        validator: function (v) {
          return v >= 0;
        },
        message: (props) => `${props.value} must be a non-negative number`,
      },
    },
    witnesses: {
      type: [WitnessSchema],
      required: true,
    },
    passengersPresentDuringAccident: [
      {
        name: {
          type: String,
          required: true,
        },
        address: {
          type: String,
          required: true,
        },
      },
    ],
    traffic: {
      name: {
        type: String,
        required: true,
      },
      site: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
    },
    status: {
      type: String,
      enum: ["Received", "Pending"],
      default: "Pending",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

EmergencyReportSchema.pre("save", async function (next) {
  const vehicle = await this.model("VehicleRecord").findOne({
    plateNumber: this.plateNumber,
    isDeleted: false,
  });
  if (!vehicle) {
    return next(
      new ErrorResponse(
        `Vehicle not found with plate number of ${this.plateNumber}`,
        404
      )
    );
  }
  const user = await this.model("User").findById(this.user);
  if (!user) {
    return next(
      new ErrorResponse(`User not found with id of ${this.plateNumber}`, 404)
    );
  }
  next();
});

EmergencyReportSchema.statics.getVehicleByPlateNumber = async function (
  plateNumber
) {
  const vehicle = await this.model("VehicleRecord")
    .findOne({ plateNumber })
    .select({ _id: 1 });
  return vehicle;
};

module.exports = mongoose.model("EmergencyReport", EmergencyReportSchema);
