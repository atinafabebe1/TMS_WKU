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
        <h1>Approve Maintenance </h1>
      </div>
      <Tabs
        activeKey={filter}
        onSelect={handleFilter}
        id="maintenance-request-tabs"
      >
        <Tab eventKey="waiting-mech-to-approve" title="Pending"></Tab>
        <Tab eventKey="waiting-gd-to-approve" title="In Progress"></Tab>
        <Tab eventKey="completed" title="Completed"></Tab>
        <Tab eventKey="canceled" title="Cancelled"></Tab>
      </Tabs>
      <MaintenanceApprovalTable filter={filter} />
    </>
  );
};

export default MechApproval;
