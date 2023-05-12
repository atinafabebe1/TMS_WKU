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
      maxlength: 10,
      validate: {
        validator: function (v) {
          const pattern = /^[1-5][A-Z][0-9]{7}$/i;
          const isPositive = parseInt(v) >= 0;
          return pattern.test(v) && isPositive;
        },
        message: (props) => {
          if (!props.value) {
            return "Plate number is required";
          }
          return `${props.value} is not a valid plate numbers or must be a non-negative number`;
        },
      },
    },
    mode: {
      type: String,
      enum: ["Coupon", "Cash", "Fuel"],
      required: [true, "this field is required"],
    },
    typeOfFuel: {
      type: String,
      enum: [
        "Diesel",
        "Benzene",
        "Motor Oil",
        "Fren Oil",
        "Other Oil",
        "Grease",
      ],
      required: true,
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
