const mongoose = require("mongoose");
const ErrorResponse = require("../utils/errorResponse");
const Schema = mongoose.Schema;

const FuelRequestSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
      immutable: true,
    },
    //RECEIVER NOT NEEDED ITS ALREADY HOD

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
    typeOfFuel: {
      type: String,
      enum: [
        "Grease",
        "Diesel",
        "Benzene",
        "Motor Oil",
        "Fren Oil",
        "Other Oil",
      ],
      required: true,
    },
    requestAmount: {
      type: Number,
      required: true,
    },
    approvedAmount: {
      type: Number,
    },
    price: {
      type: Number,
    },
    currentRecordOnCounter: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      default: "Waiting Approval",
      enum: [
        "Waiting Approval",
        "Rejected",
        "Approved",
        "Completed",
        "Received",
      ],
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
