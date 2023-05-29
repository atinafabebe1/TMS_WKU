const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DriverInfoSchema = new Schema({
  yearsOfExperience: { type: Number },
  licenses: {
    id: { type: Number },
    stateIssued: { type: String },
  },
  vehiclePlateNumber: {
    type: String,
    default: "not-Assigned",
  },

  unavailable: [
    {
      from: {
        type: Date,
        default: null,
      },
      to: {
        type: Date,
        default: null,
      },
    },
  ],
  timesAssigned: {
    type: Number,
    default: 0,
  },
});

module.exports = DriverInfoSchema;
