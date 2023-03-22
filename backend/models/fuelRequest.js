const mongoose = require("mongoose");
const ErrorResponse = require("../utils/errorResponse");
const Schema = mongoose.Schema;
const validator = require("validator");

const FuelRequestSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
      immutable: true,
    },
    recievers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
    ],
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VehicleRecord",
      validate: {
        validator: function (v) {
          if (this.isNew && v) {
            return false;
          }
          return true;
        },
        message: (props) =>
          `Cannot set vehicle "${props.value}" when creating a new fuel request.`,
      },
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
    typeOfFuel: {
      type: String,
      enum: ["diesel", "benzene", "motorOil", "frenOil", "otherOil", "grease"],
      required: true,
    },
    prevRecordOnCounter: {
      type: Number,
      validate: {
        validator: function (v) {
          return v >= 0;
        },
        message: (props) =>
          `${props.value} is not a valid previous record on counter`,
      },
    },
    currentRecordOnCounter: {
      type: Number,
      validate: {
        validator: function (v) {
          return v >= 0;
        },
        message: (props) =>
          `${props.value} is not a valid current record on counter`,
      },
    },
    departingAddress: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return validator.isLength(v.trim(), { min: 1 });
        },
        message: (props) => `${props.value} is not a valid source location`,
      },
    },
    destinationAddress: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return validator.isLength(v.trim(), { min: 1 });
        },
        message: (props) =>
          `${props.value} is not a valid destination location`,
      },
    },
    distanceTraveled: {
      type: Number,
      validate: {
        validator: function (v) {
          return v >= 0;
        },
        message: (props) => `${props.value} is not a valid distance traveled`,
      },
    },
    amountOfFuelUsed: {
      type: Number,
    },
    fuelDistributorApproval: {
      approvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
        immutable: true,
      },
      status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending",
      },
    },
    headOfDeploymentApproval: {
      approvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
        immutable: true,
      },
      status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending",
      },
    },
    directorApproval: {
      approvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
        immutable: true,
      },
      status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending",
      },
    },
    vicePresidentApproval: {
      approvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
        immutable: true,
      },
      status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending",
      },
    },
    status: {
      type: String,
      default: "Waiting Approval",
      enum: ["Waiting Approval", "Rejected", "Approved"],
      validate: {
        validator: async function (v) {
          if (this.isNew && v !== "Waiting Approval") {
            return false;
          }
          if (v === "Approved") {
            const approvals = [
              this.fuelDistributorApproval,
              this.headOfDeploymentApproval,
              this.directorApproval,
              this.vicePresidentApproval,
            ];
            const allApproved = approvals.every((a) => a === "Approved");
            return allApproved;
          }
          return true;
        },
        message: (props) =>
          `Cannot set status "${props.value}" when creating a new fuel request.`,
      },
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

FuelRequestSchema.pre("save", async function (next) {
  const vehicle = await this.model("VehicleRecord").findOne({
    plateNumber: this.plateNumber,
    isDeleted: false,
  });
  if (!vehicle) {
    return next(
      new ErrorResponse(
        `Vehicle Not Found with plate number of ${this.plateNumber}`,
        404
      )
    );
  }
  const user = await this.model("User").findById(this.user);
  if (!user) {
    return next(
      new ErrorResponse(`user Not Found with id of ${this.user}`, 404)
    );
  }
  // const receiver = await this.model("User").findById(this.reciever);
  // if (!receiver) {
  //   return next(
  //     new ErrorResponse(`reciver Not Found with id of ${this.reciever}`, 404)
  //   );
  // }

  next();
});

FuelRequestSchema.statics.getVehicleByPlateNumber = async function (
  plateNumber
) {
  const vehicle = await this.model("VehicleRecord")
    .findOne({ plateNumber, isDeleted: false })
    .select({ _id: 1 });
  return vehicle;
};

module.exports = mongoose.model("FuelRequest", FuelRequestSchema);
