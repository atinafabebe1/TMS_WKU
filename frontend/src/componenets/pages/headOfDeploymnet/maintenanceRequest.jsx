import React, { useState } from "react";
import MaintenanceRequestTables from "../../common/maintenance/maintenancerequesttable";
import { Form, Row, Col, Tabs, Tab } from "react-bootstrap";

const HODmaintenanceRequestPage = () => {
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
        <Tab eventKey="all" title="All">
        </Tab>
        <Tab eventKey="pending" title="Pending">
        </Tab>
        <Tab eventKey="in-progress" title="In Progress">
        </Tab>
        <Tab eventKey="completed" title="Completed">
        </Tab>
        <Tab eventKey="cancelled" title="Cancelled">
        </Tab>
      </Tabs>

      <MaintenanceRequestTables filter={filter} />
    </>
  );
};

export default HODmaintenanceRequestPage;
