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
  try {
    const { _id, vehicles, departing, destination } = req.body;

    // Validate the incoming data
    if (!_id || !vehicles || !departing || !destination) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Find the schedule by ID
    const schedule = await Trip.findById(_id);

    if (!schedule) {
      return res.status(404).json({ error: 'Schedule not found' });
    }

    // Update the vehicles in the schedule
    for (const vehicle of vehicles) {
      // Find the vehicle by plate number
      const existingVehicle = await Vehicle.findOne({ plateNumber: vehicle.plateNumber });

      if (existingVehicle) {
        // Update the vehicle's plate number
        vehicle._id = existingVehicle._id;
      } else {
        return res.status(404).json({ error: `Vehicle with plate number ${vehicle.plateNumber} not found` });
      }
    }

    // Extract vehicle IDs from the updated vehicles array
    const vehicleIds = vehicles.map((vehicle) => vehicle._id);

    // Update the schedule
    schedule.vehicles = vehicleIds;
    schedule.departing = departing;
    schedule.destination = destination;
    schedule.numVehiclesRequired = vehicleIds.length;

    // Save the updated schedule
    const updatedSchedule = await schedule.save();

    console.log(updatedSchedule);
    res.status(200).json({ message: 'Schedule updated successfully', schedule: updatedSchedule });
  } catch (error) {
    next(error);
  }
};

//delete service schedules
const deleteServiceSchedule = async (req, res, next) => {};

//create a service schedule

const createServiceSchedule = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  await deleteExistingTrips();
  const { vehicles, trips } = req.body;
  // const trips = schedule;
  validateVehicles(vehicles);
  validateTrips(trips);

  const createdTrips = await assignVehiclesToTrips(vehicles, trips);
  console.log(createdTrips);
  res.status(201).json({
    createdTrips,
    message: 'Schedule is succesfully created'
  });
});

let session;

//  Function to delete existing trips and update vehicle fields
const deleteExistingTrips = async () => {
  try {
    await Trip.deleteMany({});
    await Vehicle.updateMany(
      {},
      {
        $unset: {
          assignedTrips: 1,
          duration: 1,
          location: 1
        }
      }
    );
  } catch (error) {
    throw new ErrorResponse('Error deleting trips and updating vehicle fields', 500);
  }
};
// One vehicle will be assigned for a trip at most once at a time.
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

      trip.vehicles = selectedVehicles.map((vehicle) => vehicle.id);

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
        const updatedVehicle = await Vehicle.findByIdAndUpdate(
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
              location: trip.destination.address
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
                $set: { location: vehicle.location, duration: 0 }
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

// A vehicle assigned for a trip should have the same location as the departing address of that trip.
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

      if (!vehicle.location) {
        vehicle.location = trip.departing.address;
      }
      if (vehicle.location !== trip.departing.address) {
        return false;
      }

      const overlap = assignForTrip.some((assignedTrip) => {
        const tripDepartingTime = new Date(`${dateString}T${trip.departing?.time ?? '00:00'}:00`);
        const tripDestinationTime = new Date(`${dateString}T${trip.destination?.time ?? '00:00'}:00`);
        const assignedDepartingTime = new Date(`${dateString}T${assignedTrip.departing?.time ?? '00:00'}:00`);
        const assignedDestinationTime = new Date(`${dateString}T${assignedTrip.destination?.time ?? '00:00'}:00`);

        const tripOverlapDuration = Math.min(assignedDestinationTime, tripDestinationTime) - Math.max(assignedDepartingTime, tripDepartingTime);
        console.log('trip overlaps' + tripOverlapDuration);
        if (tripOverlapDuration > 0) {
          return true;
        }
        return false;
      });
      if (overlap) {
        console.log('Ovelaps');
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
      throw new ErrorResponse('Vehicle load cannot be less than 1', 403);
    }
  }
};

// Destination time is greater than departing time
// If destination time and departing time difference is less than 5, it should return a warning
const validateTrips = (trips) => {
  for (const trip of trips) {
    if (trip.departing.time >= trip.destination.time) {
      throw new ErrorResponse('Departing time cannot be after or equal to destination time', 403);
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
  getServiceSchedule,
  updateServiceSchedule,
  deleteServiceSchedule
};
