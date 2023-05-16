import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import api from "../../../../api/api";

const FuelTypeList = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    api
      .get("/VehicleRecord?isDeleted=false")
      .then((response) => {
        const data = response.data.data;
        const groups = data.reduce((groups, vehicle) => {
          const typeOfFuel = vehicle.typeOfFuel;
          if (!groups[typeOfFuel]) {
            groups[typeOfFuel] = [];
          }
          groups[typeOfFuel].push(vehicle);
          return groups;
        }, {});
        setVehicles(groups);
      })
      .catch((error) => console.error("Error fetching Vehicles:", error));
  }, []);

  return (
    <div className="p-4">
      {Object.keys(vehicles).map((typeOfFuel) => (
        <React.Fragment key={typeOfFuel}>
          <h3>{typeOfFuel}</h3>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>Plate Number</th>
                <th>Type </th>
                <th>Proprietary Id Number</th>
                <th>Model Number</th>
                <th>Property Type</th>
              </tr>
            </thead>
            <tbody>
              {vehicles[typeOfFuel].map((vehicle) => (
                <tr key={vehicle._id}>
                  <td>{vehicle.plateNumber}</td>
                  <td>{vehicle.type}</td>
                  <td>{vehicle.proprietaryIdNumber}</td>
                  <td>{vehicle.modelNo}</td>
                  <td>{vehicle.typeOfFuel}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </React.Fragment>
      ))}
    </div>
  );
};

export default FuelTypeList;
