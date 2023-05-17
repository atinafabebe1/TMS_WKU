const { default: mongoose } = require('mongoose');
const asyncHandler = require('../middleware/async');
const Vehicle = require('../models/registerVehicle');
const Trip = require('../models/serviceSchedule');
const ErrorResponse = require('../utils/errorResponse');

const dateString = '1997-03-25';

//get service schedules
const getServiceSchedule = async (req, res, next) => {
  res.status(200).json(res.advancedResults);
};
//update service schedules
const updateServiceSchedule = async (req, res, next) => {
  const schedule = await Trip.findById(req.body._id);
  console.log(req.body);
};
//delete service schedules
const deleteServiceSchedule = async (req, res, next) => {};

//create a service schedule
const createServiceSchedule = asyncHandler(async (req, res, next) => {
  const { vehicles, trips } = req.body;
  console.log(req.body);

  //sort a trips by their departing time
  trips.sort((a, b) => {
    return new Date('1970/01/01 ' + a.departing.time) - new Date('1970/01/01 ' + b.departing.time);
  });

  validateVehicles(vehicles);
  validateTrips(trips);

  const createdTrips = await assignVehiclesToTrips(vehicles, trips);
  res.status(201).json({
    createdTrips,
    message: 'Schedule is succesfully created'
  });
});

// One vehicle will be assigned for a trip at most once at a time.
let session;
const assignVehiclesToTrips = asyncHandler(async (vehicles, trips) => {
  const createdTrips = [];

  try {
    session = await mongoose.startSession();
    session.startTransaction();

    for (let trip of trips) {
      const selectedVehicles = await getVehicles(vehicles, trip);

      if (selectedVehicles.length < trip.numVehiclesRequired) {
        await session.abortTransaction();
        session.endSession();
        throw new ErrorResponse(`Could not find enough vehicles for trip departing address: ${trip.departing?.address}`, 500);
      }

      trip.vehicles = selectedVehicles.map((vehicle) => vehicle.plateNumber);

      const destinationTime = new Date(`${dateString}T${trip.destination?.time ?? '00:00'}:00`);
      const departingTime = new Date(`${dateString}T${trip.departing?.time ?? '00:00'}:00`);

      if (isNaN(departingTime.getTime()) || isNaN(destinationTime.getTime())) {
        await session.abortTransaction();
        session.endSession();
        throw new ErrorResponse('Invalid time string', 403);
      }

      const tripDuration = (destinationTime - departingTime) / (1000 * 60); // calculate the difference in minutes

      const createdTrip = await Trip.create([trip], { session });

      createdTrips.push(createdTrip);

      for (let vehicle of selectedVehicles) {
        await Vehicle.findByIdAndUpdate(
          vehicle.id,
          {
            $push: {
              assignedTrips: {
                tripId: createdTrip._id,
                duration: tripDuration
              }
            },
            $inc: {
              duration: tripDuration
            },
            $set: {
              serviceLocation: trip.destination.address
            }
          },
          { session, new: true }
        );

        vehicle.duration += tripDuration; // update the duration field
      }
    }

    await session.commitTransaction();
    session.endSession();
    return createdTrips;
  } catch (error) {
    // if (session) {
    //   await session.abortTransaction();
    //   session.endSession();
    // }

    // Remove saved trips and updated vehicle information here
    await Promise.all(
      createdTrips.map(async (trip) => {
        await Trip.findByIdAndDelete(trip._id);

        const vehiclesToUpdate = await Vehicle.find({
          _id: { $in: trip.vehicles }
        });
        await Promise.all(
          vehiclesToUpdate.map(async (vehicle) => {
            await Vehicle.findByIdAndUpdate(
              vehicle.id,
              {
                $pull: { assignedTrips: { tripId: trip._id } },
                $set: { serviceLocation: vehicle.serviceLocation, duration: 0 }
              },
              { session }
            );
          })
        );
      })
    );

    throw error;
  }
});

// A vehicle assigned for a trip should have the same serviceLocation as the departing address of that trip.
// Vehicle assigning should be fair, each vehicle should be assigned, it shouldn't be assigned for another trip if there is a vehicle not assigned yet.
const getVehicles = async (vehicles, trip) => {
  const availableVehicles = [];

  // Iterate over the input vehicles and create instances of the Vehicle model for each one
  for (const vehicle of vehicles) {
    const vehicleInstance = await Vehicle.findById(vehicle._id).session(session);
    availableVehicles.push(vehicleInstance);
  }

  const filteredVehicles = await Promise.all(
    availableVehicles.map(async (vehicle) => {
      const assignForTrip = await Trip.find({
        vehicles: { $in: vehicle._id }
      }).populate('vehicles');

      if (!vehicle.serviceLocation) {
        vehicle.serviceLocation = trip.departing.address;
      }
      if (vehicle.serviceLocation !== trip.departing.address) {
        return false;
      }

      const overlap = assignForTrip.some((assignedTrip) => {
        const tripDepartingTime = new Date(`${dateString}T${trip.departing?.time ?? '00:00'}:00`);
        const tripDestinationTime = new Date(`${dateString}T${trip.destination?.time ?? '00:00'}:00`);
        const assignedDepartingTime = new Date(`${dateString}T${assignedTrip.departing?.time ?? '00:00'}:00`);
        const assignedDestinationTime = new Date(`${dateString}T${assignedTrip.destination?.time ?? '00:00'}:00`);

        const tripOverlapDuration = Math.min(assignedDestinationTime, tripDestinationTime) - Math.max(assignedDepartingTime, tripDepartingTime);
        if (tripOverlapDuration > 0) {
          return true;
        }
        return false;
      });
      if (overlap) {
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

// Load should be greater than zero
const validateVehicles = (vehicles) => {
  for (const vehicle of vehicles) {
    if (vehicle.load <= 0) {
      throw new ErrorResponse('Vehicle load cannot be less than 1', 403);
    }
  }
};

// Destination time is greater than departing time
const validateTrips = (trips) => {
  for (const trip of trips) {
    if (trip.departing.time >= trip.destination.time) {
      throw new ErrorResponse('Departing time cannot be after or equal to destination time', 403);
    }
  }
};

module.exports = {
  createServiceSchedule,
  getServiceSchedule,
  updateServiceSchedule,
  deleteServiceSchedule
};
