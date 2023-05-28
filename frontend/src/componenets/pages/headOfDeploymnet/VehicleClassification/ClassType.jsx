import React, { useState, useEffect } from "react";
import { Table, Button, Row, Col, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../../api/api";

const ClassTypeVehicleList = ({ link }) => {
  const [vehicles, setVehicles] = useState([]);
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

  return (
    <div className="p-4">
      <h2 className="form-control-custom" style={{ textAlign: "center" }}>
        Vehicle Classified by Its Type
      </h2>
      {Object.keys(vehicles).map((type) => (
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
              {vehicles[type].map((vehicle) => (
                <tr key={vehicle._id}>
                  <td>{vehicle.plateNumber}</td>
                  <td>{vehicle.type}</td>
                  <td>{vehicle.proprietaryIdNumber}</td>
                  <td>{vehicle.modelNo}</td>
                  <td>{vehicle.type}</td>
                  <td>
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
                        navigate(`/hd/vehicles/assign-vehicle/${vehicle._id}`)
                      }
                    >
                      Assign
                    </Button>{" "}
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
