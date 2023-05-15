const mongoose = require('mongoose');
const VehicleRequest = require('./vehicleRequest');
const VehicleTransfer = require('./VehicleTransfer');
const EmergencyReport = require('./emergencyReport');
const FuelRequest = require('./fuelRequest');
const MaintenanceReport = require('./maintenanceReport');
const ErrorResponse = require('../utils/errorResponse');
const Schema = mongoose.Schema;

const VehicleImageSchema = new Schema(
  {
    photo: {
      type: String,
      default: null
    }
  },
  { timestamps: true }
);
const VehicleRecordSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
      immutable: true
    },
    modelNo: {
      type: Number,
      required: true,
      unique: true,
      min: 1000,
      max: 9999
    },
    chassisNo: {
      type: Number,
      unique: true,
      min: 100000,
      max: 999999
    },
    motorNo: {
      type: Number,
      unique: true
    },
    type: {
      type: String,
      enum: ['Bus', 'Truck', 'Pick Up', 'Ambulace', 'Automobile'],
      required: true
    },
    cC: {
      type: Number
    },
    purchasePrice: {
      type: Number
    },
    plateNumber: {
      type: String,
      required: true,
      unique: true,
      maxlength: 10,
      validate: {
        validator: function (v) {
          const pattern = /^[1-5][A-Z][0-9]{7}$/i;
          return pattern.test(v);
        },
        message: (props) => `${props.value} is not a valid plate number`
      }
    },
    typeOfFuel: {
      type: String,
      enum: ['diesel', 'benzene', 'motorOil', 'frenOil', 'otherOil', 'grease'],
      required: true
    },

    purchaseDate: {
      type: Date,
      required: true,
    },

    maxPerson: {
      type: Number
    },
    maxLoad: {
      type: Number
    },
    maxLitres: {
      type: Number
    },
    proprietaryIdNumber: {
      type: Number
    },
    propertyType: {
      type: String,
      enum: ["Rent", "University Owned"],
      required: true,
    },
    vehicleImage: {
      type: VehicleImageSchema
    },
    itemsWithVehicle: {
      itemDetail: { type: String },
      quantity: { type: Number }
    },
    assignedTo: {
      type: String,
      default: null
    },
    location: {
      type: String,
      required: true
    },
    serviceLocation: {
      type: String
    },
    load: {
      type: Number
      //  required: true
    },
    duration: {
      type: Number,
      default: 0
    },
    onMaintenance: {
      type: Boolean,
      default: false
    },
    assignedTrips: [
      {
        tripId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Trip'
        },
        duration: {
          type: Number
        }
      }
    ],

    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

VehicleRecordSchema.index({
  availability: 1,
  'unavailable.from': 1,
  'unavailable.to': 1
});

VehicleRecordSchema.pre('findOneAndUpdate', async function (next) {
  if (!this._update.isDeleted) {
    return next();
  }

  await this.updateRelatedVehicleRequests();
  await this.updateRelatedVehicleTransfers();
  await this.updateRelatedFuelRequests();
  await this.updateRelatedMaintenanceReports();
  await this.updateRelatedEmergencyReports();

  next();
});

VehicleRecordSchema.methods.updateRelatedVehicleRequests = async function () {
  await VehicleRequest.updateMany({ vehicle: this._conditions._id }, { isDeleted: true });
};

VehicleRecordSchema.methods.updateRelatedVehicleTransfers = async function () {
  await VehicleTransfer.updateMany({ vehicle: this._conditions._id }, { isDeleted: true });
};

VehicleRecordSchema.methods.updateRelatedFuelRequests = async function () {
  await FuelRequest.updateMany({ vehicle: this._conditions._id }, { isDeleted: true });
};

VehicleRecordSchema.methods.updateRelatedMaintenanceReports = async function () {
  await MaintenanceReport.updateMany({ vehicle: this._conditions._id }, { isDeleted: true });
};

VehicleRecordSchema.methods.updateRelatedEmergencyReports = async function () {
  await EmergencyReport.updateMany({ vehicle: this._conditions._id }, { isDeleted: true });
};
// restrict updating assignedTo field to directors only
// VehicleRecordSchema.pre("findOneAndUpdate", async function (next) {
//   if (!this.getUpdate().assignedTo) {
//     return next();
//   }
//   const user = await this.model.findById(this.getQuery().user);
//   if (user.role !== ROLE_DIRECTOR || user.role !== ROLE_HEADOFDEPLOYMENT) {
//     throw new ErrorResponse(
//       "You do not have permission to update assignedTo field",
//       401
//     );
//   }
//   return next();
// });

VehicleRecordSchema.virtual('VehicleRequest', {
  ref: 'Vehicle Request',
  localField: 'plateNumber',
  foreignField: 'plateNumber',
  justOne: false
});

VehicleRecordSchema.virtual('FuelRequest', {
  ref: 'FuelRequest',
  localField: 'plateNumber',
  foreignField: 'plateNumber',
  justOne: false
});

VehicleRecordSchema.virtual('MaintenanceRequest', {
  ref: 'Maintenance Request',
  localField: 'plateNumber',
  foreignField: 'plateNumber',
  justOne: false
});

VehicleRecordSchema.virtual('EmergencyReport', {
  ref: 'EmergencyReport',
  localField: 'plateNumber',
  foreignField: 'plateNumber',
  justOne: false
});

module.exports = mongoose.model('VehicleRecord', VehicleRecordSchema);
