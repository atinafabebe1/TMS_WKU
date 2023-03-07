const mongoose = require("mongoose");
const Driver = mongoose.model("Driver"); // access driver model from db
const Vehicle = mongoose.model("Vehicle"); // access vehicle model from db

const serviceSchedule = async (req, res) => {
  try {
    const startAddressAndTime = req.body.startAddressAndTime;
    const endAddressAndTime = req.body.endAddressAndTime;

    // create variables to hold available vehicles and drivers after the filter is applied and default to empty arrays
    let availableVehicles;
    let availableDrivers;

    // retrieve all drivers before filtering by availability and skill level
    const allDrivers = await Driver.find();

    // loop through each driver to check if they are available within the scheduled timeframe
    allDrivers.forEach((driver) => {
      if (
        checkIfDriverAvailable(driver, startAddressAndTime, endAddressAndTime)
      ) {
        // if driver is available add them to the list of available drivers array
        availableDrivers.push(driver);
      }
    });

    // retrieve all vehicles before filtering by availability
    const allVehicles = await Vehicle.find();

    // loop through each vehicle to check if it is available within the scheduled timeframe          for (let i=0; i<allVehicles.length; i++){             const currentvehicle = allVehiclesi;              if(checkIfVehicleAvailable(currentvehicle,startAddressAndTime,endAddressAndTime)){                 //if vehicle is avaiable add it to the list of available vehicles               availableVehicles.push(currentvehicle);             }         }

    // assign a vhile and driver for each service using an algorithm that considers location closest as an ideal match     while (availableDrivers.length && availableVehicles > 0) {          let shortestDistanceDriver;          let shortestDistanceVehicle;           let shortestDistanceValue=Infinity;              for (let i=0; i<availableDrivers.length ;i++) {               for(let j=0;j<availableVehicles .length ; j++ ){                  let currentDistanceValue=calculateDistanceBetweenLocation(availableDriver ,availablevehicl);                                                   if (currentDistanceValue <shortestDistanceValue){                       shortestDistanceValue= currentDistancevalue                    shortesdistannceDriver=availabledriversi                  shortestDistancevehilcee=availableVEhiclesss              j                                            }}                      }                     assignDriveToService()assign car takes in  a Driveer object & Vehicle Object                   removeVhilceFrromAvailbaleList==================================================// Below are helper functionsto compute distance between locations// Function encode data & send response response BodyRequire dependenciesconst geoJsonModuleRequire GeoJson module & Parse GeoJson data functioncalculateDiastanceBetweenLocations (params ) {                  return goodJASONmodule . calcualteDIsatnctEfrompoints() Require google maps module &Calculates distances betweenslocation points}functions checklfDriverAvialabe(Params)This fuction compares params parameter given withdriven records
  } catch (err) {
    console.log(err);
  }
};
