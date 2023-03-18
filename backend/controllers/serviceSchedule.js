const asyncHandler = require("../middleware/async");
const Vehicle = require("../models/registerVehicle");
const Trip = require("../models/serviceSchedule");
const ErrorResponse = require("../utils/errorResponse");

const createServiceSchedule = asyncHandler(async (req, res, next) => {
  const { vehicles, trips } = req.body;
  validateVehicles(vehicles);
  validateTrips(trips);
  const createdtrips = await assignVehiclesToTrips(vehicles, trips);
  res
    .status(201)
    .json({ createdtrips, message: "Schedule is succesfully created" });
});

// One vehicle will be assigned for a trip at most once at a time.
const assignVehiclesToTrips = async (vehicles, trips) => {
  const createdTrips = [];
  for (const trip of trips) {
    const selectedVehicles = await getVehicles(vehicles, trip);
    if (selectedVehicles < trip.numVehiclesRequired) {
      throw new ErrorResponse(
        `Could not find enough vehicle for trip departing addres : ${trip.departing?.address}`,
        500
      );
    }
    trip.vehicles = selectedVehicles.map((vehicle) => vehicle.id);

    const createdTrip = await Trip.create(trip);
    createdTrips.push(createdTrip);

    const departingTime = new Date(trip.departing?.time);
    const destinationTime = new Date(trip.destination?.time);
    if (isNaN(departingTime.getTime()) || isNaN(destinationTime.getTime())) {
      throw new ErrorResponse("Invalid time string", 403);
    }
    const tripDuration = (destinationTime - departingTime) / (1000 * 60); // calculate the difference in minutes
    for (const vehicle of selectedVehicles) {
      await Vehicle.findByIdAndUpdate(vehicle.id, {
        $push: {
          assignedTrips: {
            tripId: createdTrip._id,
            duration: tripDuration,
          },
        },
        $inc: {
          duration: tripDuration,
        },
        location: trip.destination.address,
      });
    }
  }
  return createdTrips;
};

// A vehicle assigned for a trip should have the same location as the departing address of that trip.
// Vehicle assigning should be fair, each vehicle should be assigned, it shouldn't be assigned for another trip if there is a vehicle not assigned yet.
const getVehicles = async (vehicles, trip) => {
  const availableVehicles = [];

  // Iterate over the input vehicles and create instances of the Vehicle model for each one
  for (const vehicle of vehicles) {
    const vehicleInstance = await Vehicle.findById(vehicle.id);
    availableVehicles.push(vehicleInstance);
  }
  const filteredVehicles = await Promise.all(
    availableVehicles.map(async (vehicle) => {
      const assignForTrip = await Trip.find({
        vehicles: { $in: vehicle.id },
      }).populate("vehicles");

      if (!vehicle.location) {
        vehicle.location = trip.departing.address;
      }
      if (vehicle.location !== trip.departing.address) {
        return false;
      }

      const overlap = assignForTrip.some((assignedTrip) => {
        const tripDepartingTime = new Date(trip.departing?.time);
        const tripDestinationTime = new Date(trip.destination?.time);

        const assignedDepartingTime = new Date(assignedTrip.departing?.time);
        const assignedDestinationTime = new Date(
          assignedTrip.destination?.time
        );

        const tripOverlapDuration =
          Math.min(assignedDestinationTime, tripDestinationTime) -
          Math.max(assignedDepartingTime, tripDepartingTime);
        console.log("trip overlaps" + tripOverlapDuration);
        if (tripOverlapDuration > 0) {
          return true;
        }
        return false;
      });
      if (overlap) {
        console.log("Ovelaps");
        return false;
      }
      return true;
    })
  );

  const selectedVehicles = availableVehicles
    .filter((vehicle, index) => filteredVehicles[index])
    .sort((a, b) => a.duration - b.duration)
    .slice(0, trip.numVehiclesRequired);
  return selectedVehicles;
};

// Load should be greater than one
const validateVehicles = (vehicles) => {
  for (const vehicle of vehicles) {
    if (vehicle.load <= 0) {
      throw new ErrorResponse("Vehicle load cannot be less than 1", 403);
    }
  }
};

// Destination time is greater than departing time
// If destination time and departing time difference is less than 5, it should return a warning
const validateTrips = (trips) => {
  for (const trip of trips) {
    if (trip.departing.time >= trip.destination.time) {
      throw new ErrorResponse(
        "Departing time cannot be after or equal to destination time",
        403
      );
    }
    // else if (trip.destination.time - trip.departing.time < 5) {
    //   console.warn(
    //     "Warning: departing and destination time difference is less than five"
    //   );
    // }
  }
};

module.exports = {
  createServiceSchedule,
};
