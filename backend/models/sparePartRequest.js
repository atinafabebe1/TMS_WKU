const mongoose = require("mongoose");
const ErrorResponse = require("../utils/errorResponse");

const Schema = mongoose.Schema;

const SparePartSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
      immutable: true,
    },
    //there is only one GARAGE DIRECTOR SO No receiver id Needed

    // recieverId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: "User",
    // },
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
    type: {
      type: String,
      required: true,
      enum: ["car", "truck", "motorcycle", "bus"],
    },
    identificationNumber: {
      type: String,
      required: true,
      minlength: 5,
      validate: {
        validator: function (v) {
          const pattern = /^[A-Za-z0-9]{5,}$/;
          return pattern.test(v);
        },
        message: (props) => `${props.value} is not a valid spare part ID`,
      },
    },
    quantity: {
      type: Number,
      required: true,
      validate: {
        validator: function (v) {
          return Number.isInteger(v) && v >= 1;
        },
        message: (props) =>
          `${props.value} must be an integer greater than or equal to 1`,
      },
    },
    unitPrice: {
      type: Number,
      //required: true,
      validate: {
        validator: function (v) {
          return v >= 0.01;
        },
        message: (props) =>
          `${props.value} must be a number greater than or equal to 0.01`,
      },
    },
    totalPrice: {
      type: Number,
    },
    status: {
      type: String,
      default: "pending",
      enum: [
        "pending", //whan request is sent
        "in-progress", //when Garage Director take some action
        "approved", // when garage director approve request
        "completed", // whan sparepart taken by mechanic
        "canceled", // whan request rejected by GD
        "store-approved-to-buy",
        "Garage-approved-to-buy",
        "rejected-to-buy",
      ],
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

SparePartSchema.pre("save", async function (next) {
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
  next();
});

SparePartSchema.statics.getVehicleByPlateNumber = async function (plateNumber) {
  const vehicle = await this.model("VehicleRecord")
    .findOne({ plateNumber })
    .select({ _id: 1 });
  return vehicle;
};

module.exports = mongoose.model("Sparepart", SparePartSchema);
