// import necessary libraries and models
const Vehicle = require("../models/registerVehicle");
const Trip = require("../models/serviceSchedule");
const ErrorResponse = require("../utils/errorResponse");

const createServiceSchedule = async (req, res, next) => {
  const { vehicles, trips } = req.body;
  
  // validate vehicles and trips
  validateVehicles(vehicles);
  validateTrips(trips);
  
  // solve the constraint satisfaction problem to assign vehicles to trips
  const assignments = assignVehiclesToTrips(vehicles, trips);
  
  // handle solution
  if (assignments.success) {
    const createdTrips = await createTrips(assignments.result, trips);
    res.status(201).json({ createdTrips, message: "Schedule is succesfully created" });
  } else {
    next(assignments.error);
  }
};

const assignVehiclesToTrips = (vehicles, trips) => {
  // create variables for CSP
  const variables = {};
  const domains = {};
  const constraints = [];
  
  // create variables and domains for CSP
  for (const trip of trips) {
    variables[trip.id] = [];
    for (const vehicle of vehicles) {
      const vehicleInstance = await Vehicle.findById(vehicle.id);
      if (vehicleInstance.location === trip.departing.address) {
        variables[trip.id].push(vehicle.id);
      }
    }
    domains[trip.id] = variables[trip.id];
  }
  
  // create constraints for CSP
  for (const trip of trips) {
    for (const vehicle of variables[trip.id]) {
      constraints.push({ tripId: trip.id, vehicleId: vehicle });
    }
  }
  
  // solve CSP and return result
  const result = solveCSP(variables, domains, constraints);
  if (result) {
    return { success: true, result };
  } else {
    return { success: false, error: new ErrorResponse("Could not find a valid assignment", 500) };
  }
};

const solveCSP = (variables, domains, constraints) => {
  // initialize domains for backtracking
  const domainsBackup = Object.assign({}, domains);
  
  // perform backtracking search
  const result = backtrackSearch(variables, domains, constraints);
  
  // if solution was found, return assignments
  if (result) {
    const assignments = {};
    for (const variable in result) {
      assignments[variable] = result[variable][0];
    }
    return assignments;
  }
  
  // if solution was not found, return null
  return null;
};

const backtrackSearch = (variables, domains, constraints) => {
  // check if all variables have been assigned
  if (Object.keys(variables).length === 0) {
    return variables;
  }
  
  // select variable with smallest domain
  const variable = selectVariable(variables, domains);
  
  // iterate over domain values for variable
  for (const value of domains[variable]) {
    // check if value satisfies all constraints
    if (checkConstraints(variables, variable, value, constraints)) {
      // assign value to variable
      const newVariables = Object.assign({}, variables);
      const newDomains = Object.assign({}, domains);
      delete newVariables[variable];
      newDomains[variable] = [value];
      
      // reduce domain of other variables
      reduceDomains(newVariables, newDomains, constraints, variable, value);
      
      // recursively search for solution
      const result = backtrackSearch(newVariables, newDomains, constraints);
      
      // if solution was found, return it
      if (result) {
        returnresult;
}
}
}

// if no solution was found, restore backup domains and return null
Object.assign(domains, Object.assign({}, domainsBackup));
return null;
};

const selectVariable = (variables, domains) => {
// find variable with smallest domain
let smallestDomain = Infinity;
let selectedVariable = null;

for (const variable in variables) {
const domainSize = domains[variable].length;
if (domainSize < smallestDomain) {
smallestDomain = domainSize;
selectedVariable = variable;
}
}

return selectedVariable;
};

const reduceDomains = (variables, domains, constraints, variable, value) => {
// iterate over constraints and reduce domains of related variables
for (const constraint of constraints) {
if (constraint.tripId === variable && variables[constraint.vehicleId]) {
// reduce domain of related vehicle
const index = domains[constraint.vehicleId].indexOf(value);
if (index > -1) {
domains[constraint.vehicleId].splice(index, 1);
}  // if domain is empty, backtrack
  if (domains[constraint.vehicleId].length === 0) {
    return null;
  }
  
  // if domain has only one value, assign it and reduce domains of related trips
  if (domains[constraint.vehicleId].length === 1) {
    const newValue = domains[constraint.vehicleId][0];
    variables[constraint.vehicleId] = [newValue];
    reduceDomains(variables, domains, constraints, constraint.vehicleId, newValue);
  }
}
}
};

const createTrips = async (assignments, trips) => {
const createdTrips = [];

// create trips with assigned vehicles
for (const trip of trips) {
const assignedVehicle = await Vehicle.findById(assignments[trip.id]);
const newTrip = new Trip({
departing: trip.departing,
arriving: trip.arriving,
vehicle: assignedVehicle.id
});
await newTrip.save();
createdTrips.push(newTrip);
}

return createdTrips;
};

const validateVehicles = (vehicles) => {
// validate that vehicles array is not empty
if (!vehicles || vehicles.length === 0) {
throw new ErrorResponse("No vehicles provided", 400);
}

// validate that all vehicles have an id
for (const vehicle of vehicles) {
if (!vehicle.id) {
throw new ErrorResponse("Vehicle id is missing", 400);
}
}
};

const validateTrips = (trips) => {
// validate that trips array is not empty
if (!trips || trips.length === 0) {
throw new ErrorResponse("No trips provided", 400);
}

// validate that all trips have an id
for (const trip of trips) {
if (!trip.id) {
throw new ErrorResponse("Trip id is missing", 400);
}
}
};

module.exports = createServiceSchedule;"
