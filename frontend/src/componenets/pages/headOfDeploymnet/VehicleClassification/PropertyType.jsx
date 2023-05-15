import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import api from "../../../../api/api";

const PropertyTypeList = (property) => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    api
      .get("/VehicleRecord?isDeleted=false")
      .then((response) => {
        const data = response.data.data;
        const groups = data.reduce((groups, vehicle) => {
          const propertyType = vehicle.propertyType;
          if (!groups[propertyType]) {
            groups[propertyType] = [];
          }
          groups[propertyType].push(vehicle);
          return groups;
        }, {});
        setVehicles(groups);
      })
      .catch((error) => console.error("Error fetching Vehicles:", error));
  }, []);

  return (
    <div className="p-4">
      {Object.keys(vehicles).map((propertyType) => (
        <React.Fragment key={propertyType}>
          <h3>{propertyType}</h3>
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
              {vehicles[propertyType].map((vehicle) => (
                <tr key={vehicle._id}>
                  <td>{vehicle.plateNumber}</td>
                  <td>{vehicle.type}</td>
                  <td>{vehicle.proprietaryIdNumber}</td>
                  <td>{vehicle.modelNo}</td>
                  <td>{vehicle.propertyType}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </React.Fragment>
      ))}
    </div>
  );
};

export default PropertyTypeList;
