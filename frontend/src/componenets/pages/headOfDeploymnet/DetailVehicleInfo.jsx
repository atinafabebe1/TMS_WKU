import React, { useState, useEffect } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { Table, Button, Card, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import api from "../../../api/api";
import VehicleDisplayTable from "../../common/vehicle/VehicleDisplayTable";

const DetailVehicleInfo = ({ link }) => {
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("pending");
  const navigate = useNavigate();
  useEffect(() => {
    api
      .get("/VehicleRecord")
      .then((response) => {
        console.log(response.data.data);
        setVehicles(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => console.error("Error fetching Vehicles:", error));
  }, []);
  console.log(vehicles);

  function handleTabSelect(tabName) {
    setActiveTab(tabName);
  }

  const assignedVehicle = vehicles.filter(
    (vehicle) => vehicle.assignedTo !== null
  );

  const availableVehicles = vehicles.filter(
    (vehicle) =>
      vehicle.assignedTo === null &&
      vehicle.isDeleted === false &&
      vehicle.onMaintenance === false
  );
  const deletedVehicles = vehicles.filter(
    (vehicle) => vehicle.isDeleted === true
  );
  const temporarlyUnavailable = vehicles.filter(
    (vehicle) => vehicle.onMaintenance === true
  );

  const handledeleteClick = async (vehicle) => {
    try {
      await api.delete(`/VehicleRecord/${vehicle._id}`);
      const response = await api.get("/VehicleRecord");
      setVehicles(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handeleUnassign = async (vehicle) => {
    try {
      await api.put(`/VehicleRecord/${vehicle._id}`, {
        assignedTo: null,
      });
      const response = await api.get("/VehicleRecord");
      setVehicles(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handledissabele = async (vehicle) => {
    try {
      await api.put(`/VehicleRecord/${vehicle._id}`, {
        onMaintenance: true,
      });
      const response = await api.get("/VehicleRecord");
      setVehicles(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleEnableVehicle = async (vehicle) => {
    try {
      await api.put(`/VehicleRecord/${vehicle._id}`, {
        onMaintenance: false,
      });
      const response = await api.get("/VehicleRecord");
      setVehicles(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const [groupByParam, setGroupByParam] = useState("");

  const handleButtonClick = (param) => {
    setGroupByParam(param);
  };
  return (
    <div className="p-4">
      <Row className="mb-4">
        <Col>
          <h4 className="form-control-custom">Vehicle Property Information</h4>
        </Col>
        <Col className="text-end">
          <Link to="/hd/vehicles/Receive">
            <Button variant="primary">Add New Vehicle</Button>
          </Link>
        </Col>
      </Row>
      <hr></hr>
      <Tabs
        activeKey={activeTab}
        onSelect={handleTabSelect}
        id="vehicle-request-tabs"
        className="form-control-custom"
      >
        <Tab eventKey="availableVehicles" title="Available Vehicles">
          <VehicleDisplayTable
            vehicles={availableVehicles}
            handledeleteClick={handledeleteClick}
            handledissabele={handledissabele}
          />
        </Tab>
        <Tab eventKey="assignedVehicle" title="Assigned Vehicle">
          <VehicleDisplayTable
            vehicles={assignedVehicle}
            handeleUnassign={handeleUnassign}
          />
        </Tab>

        <Tab
          eventKey="temporarlyunavailableVehicle"
          title="Temporarly Unavailable"
        >
          <VehicleDisplayTable
            vehicles={temporarlyUnavailable}
            handleEnableVehicle={handleEnableVehicle}
          />
        </Tab>
        <Tab eventKey="deletedVehicles" title="Deleted Vehicles">
          <VehicleDisplayTable vehicles={deletedVehicles} />
        </Tab>
      </Tabs>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ paddingBottom: "70px" }}
      >
        <div className="p-4">
          <Card>
            <Card.Header
              className="form-control-custom"
              style={{ textAlign: "center" }}
            >
              Type of Vehicle
            </Card.Header>
            <Card.Body>
              <Card.Text>
                <h6 style={{ textAlign: "center", color: "#4682B4" }}>
                  Vehicles Categorized Based on Their Type.
                </h6>
              </Card.Text>

              <div className="text-center">
                <Button
                  variant="success"
                  size="sm"
                  style={{ width: "200px" }}
                  onClick={(e) => navigate(`/hd/vehicles/type`)}
                >
                  Get Vehicles
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
        <div className="p-4">
          <Card>
            <Card.Header
              className="form-control-custom"
              style={{ textAlign: "center" }}
            >
              Property Type
            </Card.Header>
            <Card.Body>
              <Card.Text>
                <h6 style={{ textAlign: "center", color: "#4682B4" }}>
                  Vehicles Categorized Based on Their Property Types.
                </h6>
              </Card.Text>

              <div className="text-center">
                <Button
                  variant="success"
                  size="sm"
                  style={{ width: "200px" }}
                  onClick={(e) => navigate(`/hd/vehicles/propertyType`)}
                >
                  Get Vehicles
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
        <div className="p-4">
          <Card>
            <Card.Header
              className="form-control-custom"
              style={{ textAlign: "center" }}
            >
              Vehicles Fuel Type
            </Card.Header>
            <Card.Body>
              <Card.Text>
                <h6 style={{ textAlign: "center", color: "#4682B4" }}>
                  Vehicles Categorized Based on the Fuel Used
                </h6>
              </Card.Text>

              <div className="text-center">
                <Button
                  variant="success"
                  size="sm"
                  style={{ width: "200px" }}
                  onClick={(e) => navigate(`/hd/vehicles/fuelTypeList`)}
                >
                  Get Vehicles
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DetailVehicleInfo;
