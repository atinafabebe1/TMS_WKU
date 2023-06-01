const mongoose = require("mongoose");
const validator = require("validator");

const Schema = mongoose.Schema;

const DailyFuelCostRecordSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      immutable: true,
    },
    plateNumber: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          const pattern = /^(4-[0-9]{5}|UN [0-9]{3})$/i;
          return pattern.test(v);
        },
        message: (props) => `${props.value} is not a valid plate number`,
      },
    },
    mode: {
      type: String,
      enum: ["Coupon", "Cash", "Fuel"],
      required: [true, "this field is required"],
    },
    typeOfFuel: {
      type: String,
    },
    approvedAmount: {
      type: Number,
      required: [true, "this field is required"],
    },
    price: {
      type: Number,
      required: [true, "this field is required"],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: "Completed",
      enum: ["Completed", "Received"],
    },
  },
  { timestamps: true }
);

DailyFuelCostRecordSchema.pre("save", async function (next) {
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
});

DailyFuelCostRecordSchema.statics.getVehicleByPlateNumber = async function (
  plateNumber
) {
  const vehicle = await this.model("VehicleRecord")
    .findOne({ plateNumber, isDeleted: false })
    .select({ _id: 1 });
  return vehicle;
};

module.exports = mongoose.model("DailyFuelCost", DailyFuelCostRecordSchema);
