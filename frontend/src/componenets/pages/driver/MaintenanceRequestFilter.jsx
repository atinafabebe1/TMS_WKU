import React, { useState } from "react";
import MaintenanceRequestPage from "./MaintenanceRequests";
import {Tabs, Tab,Row,Col,Button } from "react-bootstrap";
import { Link } from "react-router-dom";


const DrivermaintenanceRequestPage = () => {
  const [filter, setFilter] = useState("all");

  const handleFilter = (eventKey) => {
    setFilter(eventKey);
  };

  return (
    <div className="p-4">
    <>
    <br></br>
    <Row className="mb-4">
    <Col className="text-center">
        <h2 className="form-control-custom">Maintenance Requests</h2>
      </Col>
        <Col className="text-end">
          <Link to="/driver/maintenance-request-form">
            <Button variant="primary">New Request</Button>
          </Link>
        </Col>
      </Row>
      <Tabs
      className="form-control-custom"
        activeKey={filter}
        onSelect={handleFilter}
        id="maintenance-request-tabs"
      >
        <Tab eventKey="all" title="All">
        </Tab>
        <Tab eventKey="pending" title="Pending">
        </Tab>

        <Tab eventKey="in-progress" title="In Progress">
        </Tab>
        <Tab eventKey="undermaintenance" title="Under Maintenance">
        </Tab>
        <Tab eventKey="completed" title="Completed">
        </Tab>
        <Tab eventKey="canceled" title="Cancelled">
        </Tab>
      </Tabs>

      <MaintenanceRequestPage filter={filter} />
    </>
    </div>
  );
};

export default DrivermaintenanceRequestPage;
