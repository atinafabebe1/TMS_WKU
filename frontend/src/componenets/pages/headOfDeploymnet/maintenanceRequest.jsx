import React, { useState } from "react";
import MaintenanceRequestTables from "../../common/maintenance/maintenancerequesttable";
import { Tabs, Tab } from "react-bootstrap";

const HODmaintenanceRequestPage = () => {
  const [filter, setFilter] = useState("all");

  const handleFilter = (eventKey) => {
    setFilter(eventKey);
  };

  return (
    <div className="p-4">
      <h4 className="form-control-custom">Maintenance Requests</h4>
      <hr></hr>
      <Tabs
        className="form-control-custom"
        activeKey={filter}
        onSelect={handleFilter}
        id="maintenance-request-tabs"
      >
        <Tab eventKey="all" title="All"></Tab>
        <Tab eventKey="pending" title="Pending"></Tab>
        <Tab eventKey="in-progress" title="In Progress"></Tab>
        <Tab eventKey="completed" title="Completed"></Tab>
        <Tab eventKey="canceled" title="Cancelled"></Tab>
      </Tabs>
      <MaintenanceRequestTables filter={filter} />
    </div>
  );
};

export default HODmaintenanceRequestPage;
