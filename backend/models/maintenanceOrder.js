const mongoose = require("mongoose");
const ErrorResponse = require("../utils/errorResponse");

const Schema = mongoose.Schema;

const expertSchema = new mongoose.Schema({
  expertId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  maintenanceWorkHours: {
    type: Number,
    required: true,
    validate: {
      validator: function (v) {
        return v > 0;
      },
      message: "Maintenance work hours must be greater than 0",
    },
  },
  paymentPerHour: {
    type: Number,
    required: true,
    validate: {
      validator: function (v) {
        return v > 0;
      },
      message: "Payment per hour must be greater than 0",
    },
  },
});

const maintenanceTaskSchema = new mongoose.Schema({
  made: {
    type: String,
    required: true,
  },
  assignedExpert: {
    type: expertSchema,
    required: true,
  },
  birr: {
    type: Number,
    required: true,
    validate: {
      validator: function (v) {
        return v >= 0;
      },
      message: "Birr value must be greater than 0",
    },
  },
  coin: {
    type: Number,
    required: true,
    validate: {
      validator: function (v) {
        return v >= 0;
      },
      message: "Coin value must be greater than 0",
    },
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const MaintenanceOrderSchema = new Schema(
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
    },
    reciever: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
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
    typeOfVehicle: {
      type: String,
      //required: true,
    },
    assignedWorkflow: {
      type: String,
     // required: true,
    },
    kilometerOnCounter: {
      type: Number,
      required: true,
      // validate: {
      //   validator: async function (value) {
      //     const lastMaintenanceOrder = await this.constructor
      //       .findOne({
      //         vehicle: this.vehicle,
      //       })
      //       .sort({ createdAt: -1 });

      //     if (
      //       lastMaintenanceOrder &&
      //       lastMaintenanceOrder.kilometerOnCounter >= value
      //     ) {
      //       return false;
      //     }

      //     return true;
      //   },
      //   message:
      //     "Kilometer on counter value must be greater than the previous value for the same vehicle",
      // },
    },
    crashType: {
      type: String,
      required: true,
      //enum: ["collision", "rollover", "fire", "theft"],
    },
    maintenanceTasks: {
      type: [maintenanceTaskSchema],
      //  required: true,
    },
    totalCost: {
      type: Number,
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "in-progress", "UnderMaintenance","completed", "canceled"],
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
    reportStatus: {
      type: String,
      default: "not-reported",
      enum: ["reported", "not-reported", "cancelled"],
      validate: {
        validator: function (v) {
          if (this.isNew && v !== "not-reported") {
            return false;
          }
          return true;
        },
        message: (props) =>
          `Cannot set report status "${props.value}" when creating a new maintenance request.`,
      },
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

MaintenanceOrderSchema.pre("save", async function (next) {
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
  const receiver = await this.model("User").findById(this.reciever);
  if (!receiver) {
    return next(
      new ErrorResponse(`User not found with id of ${this.reciever}`, 404)
    );
  }

  next();
});
// MaintenanceOrderSchema.statics.calculateTotalCost = function (
//   maintenanceTasks
// ) {
//   let totalBirr = 0;
//   let totalCoin = 0;

//   for (let i = 0; i < maintenanceTasks.length; i++) {
//     const { maintenanceWorkHours, paymentPerHour } =
//       maintenanceTasks[i].assignedExpert;
//     let birr = maintenanceWorkHours * paymentPerHour;
//     let coin = birr - Math.floor(birr);
//     birr = Math.floor(birr);
//     totalBirr += birr;
//     totalCoin += coin;

//     maintenanceTasks[i].birr = birr;
//     maintenanceTasks[i].coin = coin;
//   }

//   return { totalBirr, totalCoin, maintenanceTasks };
// };

MaintenanceOrderSchema.statics.getVehicleByPlateNumber = async function (
  plateNumber
) {
  const vehicle = await this.model("VehicleRecord")
    .findOne({ plateNumber })
    .select({ _id: 1 });
  return vehicle;
};

module.exports = mongoose.model("Maintenance Order", MaintenanceOrderSchema);
