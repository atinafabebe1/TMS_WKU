import React, { useState } from "react";
import MaintenanceApprovalTable from "../../common/maintenance/ApproveMaintenance";
import { Tabs, Tab } from "react-bootstrap";

const MechApproval = () => {
  const [filter, setFilter] = useState("all");

  const handleFilter = (eventKey) => {
    setFilter(eventKey);
  };

  return (
    <>
      <div className="text-center">
        <h1>Maintenance Orders</h1>
      </div>
      <Tabs
        activeKey={filter}
        onSelect={handleFilter}
        id="maintenance-request-tabs"
      >
        <Tab eventKey="in-progress" title="In Progress"></Tab>
        <Tab eventKey="completed" title="Completed"></Tab>
        <Tab eventKey="canceled" title="Cancelled"></Tab>
      </Tabs>
      <MaintenanceApprovalTable filter={filter} />
    </>
  );
};

export default MechApproval;
