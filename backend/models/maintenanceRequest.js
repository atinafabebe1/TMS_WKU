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
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VehicleRecord",
    },
    kilometerOnCounter: {
      type: Number,
      //required:true,
      default:null,
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
    firstApproval: {
      approver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
      },
    },
    secondApproval: {
      approver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
      },
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "in-progress", "completed", "canceled","UnderMaintenance"],
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
     rejectReason: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },

    // This is my initial Point



    //This is my Last Point
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
  const user = await this.model("User").findById(this.user);

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
