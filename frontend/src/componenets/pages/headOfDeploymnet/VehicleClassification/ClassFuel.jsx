import React, { useState, useEffect } from "react";
import { Table, Button, Row, Col, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import api from "../../../../api/api";

const FuelTypeList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [startIndex, setStartIndex] = useState(0);
  const navigate = useNavigate();

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleNext = () => {
    setStartIndex((prevIndex) => prevIndex + 7);
  };

  const handlePrevious = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 7, 0));
  };

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await api.get("/VehicleRecord?isDeleted=false");
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
      } catch (error) {
        console.error("Error fetching Vehicles:", error);
      }
    };

    fetchVehicles();
  }, []);

  const filteredVehicles = Object.entries(vehicles)
    .slice(startIndex, startIndex + 7)
    .map(([typeOfFuel, vehicleList]) => {
      const filteredList = vehicleList.filter((vehicle) =>
        vehicle.plateNumber.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return [typeOfFuel, filteredList];
    });

  return (
    <div className="p-4">
      <h2 className="form-control-custom" style={{ textAlign: "center" }}>
        Vehicle Classified by Its Fuel Type
      </h2>
      {filteredVehicles.map(([typeOfFuel, vehicleList]) => (
        <React.Fragment key={typeOfFuel}>
          <h4 className="form-control-custom">{typeOfFuel}</h4>
          <hr />
          <Form>
            <Row className="mb-3">
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Search by Plate Number"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </Col>
            </Row>
          </Form>
          <Table striped bordered hover responsive className="table-sm">
            <thead className="form-control-custom">
              <tr>
                <th>Plate Number</th>
                <th>Type</th>
                <th>Proprietary Id Number</th>
                <th>Model Number</th>
                <th>Fuel Type</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {vehicleList.map((vehicle) => (
                <tr key={vehicle._id}>
                  <td>{vehicle.plateNumber}</td>
                  <td>{vehicle.type}</td>
                  <td>{vehicle.proprietaryIdNumber}</td>
                  <td>{vehicle.modelNo}</td>
                  <td>{vehicle.typeOfFuel}</td>
                  <td>
                    {vehicle.isDeleted === false &&
                      vehicle.assignedTo === null &&
                      vehicle.onMaintenance === false && (
                        <>
                          <Button
                            className="btn btn-sm"
                            variant="info"
                            onClick={() =>
                              navigate(`/hd/vehicles/detail/${vehicle._id}`)
                            }
                          >
                            See Detail
                          </Button>{" "}
                          <Button
                            className="btn btn-sm"
                            variant="warning"
                            onClick={() =>
                              navigate(
                                `/hd/vehicles/edit-vehicle/${vehicle._id}`
                              )
                            }
                          >
                            Edit
                          </Button>{" "}
                          <Button
                            className="btn btn-sm"
                            variant="success"
                            onClick={() =>
                              navigate(
                                `/hd/vehicles/assign-vehicle/${vehicle._id}`
                              )
                            }
                          >
                            Assign
                          </Button>{" "}
                        </>
                      )}
                  </td>
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
