import React, { useState, useEffect } from "react";
import { Table, Button, Row, Col, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../../api/api";

const PropertyTypeList = (property) => {
  const [vehicles, setVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredVehicles = Object.keys(vehicles).reduce(
    (filteredGroups, propertyType) => {
      const filteredVehicles = vehicles[propertyType].filter((vehicle) =>
        vehicle.plateNumber.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (filteredVehicles.length > 0) {
        filteredGroups[propertyType] = filteredVehicles;
      }
      return filteredGroups;
    },
    {}
  );

  return (
    <div className="p-4">
      <h2 className="form-control-custom" style={{ textAlign: "center" }}>
        Vehicle Classified by Its Property Type
      </h2>
      <Form className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search by Plate Number"
          value={searchTerm}
          onChange={handleSearch}
        />
      </Form>
      {Object.keys(filteredVehicles).map((propertyType) => (
        <React.Fragment key={propertyType}>
          <h4 className="form-control-custom">{propertyType}</h4>
          <Table striped bordered hover responsive className="table-sm">
            <thead className="form-control-custom">
              <tr>
                <th>Plate Number</th>
                <th>Type</th>
                <th>Proprietary Id Number</th>
                <th>Model Number</th>
                <th>Property Type</th>
              </tr>
            </thead>
            <tbody>
              {filteredVehicles[propertyType].map((vehicle) => (
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
