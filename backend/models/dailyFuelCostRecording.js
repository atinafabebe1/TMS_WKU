const mongoose = require("mongoose");
const validator = require("validator");

const Schema = mongoose.Schema;

const DailyFuelCostRecordSchema = new Schema(
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
          const isPositive = parseInt(v) >= 0;
          return pattern.test(v) && isPositive;
        },
        message: (props) => {
          if (!props.value) {
            return "Plate number is required";
          }
          return `${props.value} is not a valid plate number or must be a non-negative number`;
        },
      },
    },
    mode: {
      type: String,
      required: [true, "this field is required"],
    },
    typeOfFuel: {
      type: String,
      enum: ["diesel", "benzene", "motorOil", "frenOil", "otherOil", "grease"],
      required: true,
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
  const user = await this.model("User").findById(this.user);
  if (!user) {
    return next(
      new ErrorResponse(`user Not Found with id of ${this.user}`, 404)
    );
  }
  next();
});

DailyFuelCostRecordSchema.statics.getVehicleByPlateNumber = async function (
  plateNumber
) {
  const vehicle = await this.model("VehicleRecord")
    .findOne({ plateNumber, isDeleted: false })
    .select({ _id: 1 });
  return vehicle;
};
let DailyFuelCost;

if (mongoose.models.DailyFuelCost) {
  DailyFuelCost = mongoose.model("DailyFuelCost");
} else {
  DailyFuelCost = mongoose.model("DailyFuelCost", DailyFuelCostRecordSchema);
}

module.exports = DailyFuelCost;
