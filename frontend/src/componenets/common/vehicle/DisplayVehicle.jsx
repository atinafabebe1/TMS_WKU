import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import axios from "axios";

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      const { data } = await axios.get("/VehicleRecord");
      setVehicles(data);
    };
    fetchVehicles();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`/api/vehicles/${id}`);
    setVehicles(vehicles.filter((vehicle) => vehicle._id !== id));
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Plate Number</th>
          <th>Chassis No</th>
          <th>Motor No</th>
          <th>Type of Fuel</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {vehicles.map((vehicle, index) => (
          <tr key={vehicle._id}>
            <td>{index + 1}</td>
            <td>{vehicle.plateNumber}</td>
            <td>{vehicle.chassisNo}</td>
            <td>{vehicle.motorNo}</td>
            <td>{vehicle.typeOfFuel}</td>
            <td>
              <Button
                variant="info"
                size="sm"
                href={`/vehicles/${vehicle._id}`}
              >
                View
              </Button>{" "}
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDelete(vehicle._id)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default VehicleList;
