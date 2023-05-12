import React, { useState } from "react";
import MaintenanceRequestPage from "./MaintenanceRequests";
import {Tabs, Tab } from "react-bootstrap";

const DrivermaintenanceRequestPage = () => {
  const [filter, setFilter] = useState("all");

  const handleFilter = (eventKey) => {
    setFilter(eventKey);
  };

  return (
    <>
            <div className="text-center">
        <h1>Maintenance Requests</h1>
      </div>
      <Tabs
        activeKey={filter}
        onSelect={handleFilter}
        id="maintenance-request-tabs"
      >
        <Tab eventKey="pending" title="Pending">
        </Tab>
        <Tab eventKey="in-progress" title="In Progress">
        </Tab>
        <Tab eventKey="UnderMaintenance" title="Under Maintenance">
        </Tab>
        <Tab eventKey="completed" title="Completed">
        </Tab>
        <Tab eventKey="canceled" title="Cancelled">
        </Tab>
      </Tabs>

      <MaintenanceRequestPage filter={filter} />
    </>
  );
};

export default DrivermaintenanceRequestPage;
