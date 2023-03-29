const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DriverInfoSchema = new Schema({
  yearsOfExperience: { type: Number, required: true },
  licenses: {
    id: { type: Number, required: true },
    stateIssued: { type: String, required: true },
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
