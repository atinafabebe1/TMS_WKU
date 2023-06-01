import React, { useState, useEffect } from "react";
import { Table, Button, Row, Col, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../../api/api";

const ClassTypeVehicleList = (property) => {
  const [vehicles, setVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/VehicleRecord?isDeleted=false")
      .then((response) => {
        const data = response.data.data;
        const groups = data.reduce((groups, vehicle) => {
          const type = vehicle.type;
          if (!groups[type]) {
            groups[type] = [];
          }
          groups[type].push(vehicle);
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
    (filteredGroups, type) => {
      const filteredVehicles = vehicles[type].filter((vehicle) =>
        vehicle.plateNumber.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (filteredVehicles.length > 0) {
        filteredGroups[type] = filteredVehicles;
      }
      return filteredGroups;
    },
    {}
  );

  return (
    <div className="p-4">
      <h2 className="form-control-custom" style={{ textAlign: "center" }}>
        Vehicle Classified by Its Type
      </h2>
      <Form className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search by Plate Number"
          value={searchTerm}
          onChange={handleSearch}
        />
      </Form>
      {Object.keys(filteredVehicles).map((type) => (
        <React.Fragment key={type}>
          <h4 className="form-control-custom">{type}</h4>
          <Table striped bordered hover responsive className="table-sm">
            <thead className="form-control-custom">
              <tr>
                <th>Plate Number</th>
                <th>Type</th>
                <th>Proprietary Id Number</th>
                <th>Model Number</th>
                <th>Property Type</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredVehicles[type].map((vehicle) => (
                <tr key={vehicle._id}>
                  <td>{vehicle.plateNumber}</td>
                  <td>{vehicle.type}</td>
                  <td>{vehicle.proprietaryIdNumber}</td>
                  <td>{vehicle.modelNo}</td>
                  <td>{vehicle.propertyType}</td>
                  <td>
                    {vehicle.isDeleted === false && (
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
                            navigate(`/hd/vehicles/edit-vehicle/${vehicle._id}`)
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

export default ClassTypeVehicleList;
