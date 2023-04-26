import React, { useState, useEffect } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { Table, Button, Form, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../api/api";
import ApprovedVehicleDisplayTable from "./ApprovedVehicleDisplayTable";
const DetailVehicleInfo = ({ link }) => {
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("pending");

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

  return (
    <>
      <Row className="mb-4">
        <Col>
          <h3>Vehicles Allowed to Leave</h3>
        </Col>
      </Row>

      <Tabs
        activeKey={activeTab}
        onSelect={handleTabSelect}
        id="vehicle-request-tabs"
        className="my-2"
      >
        <Tab eventKey="assignedVehicle" title="Approved Vehicle">
          <ApprovedVehicleDisplayTable vehicles={assignedVehicle} />
        </Tab>
      </Tabs>
    </>
  );
};

export default DetailVehicleInfo;
