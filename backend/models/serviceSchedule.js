const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TripsSchema = new Schema({
  departing: {
    address: { type: String, required: true },
    time: { type: Date, required: true },
  },
  destination: {
    address: { type: String, required: true },
    time: { type: Date, required: true },
  },
  vehicles: [{ type: mongoose.Schema.Types.ObjectId, ref: "VehicleRecord" }],
  numVehiclesRequired: { type: Number, required: true, min: 1 },
});

const Trips = mongoose.model("Trips", TripsSchema);

module.exports = Trips;
