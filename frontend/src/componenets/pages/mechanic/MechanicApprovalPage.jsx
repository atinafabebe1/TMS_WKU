import React, { useState } from "react";
import MaintenanceApprovalTable from "../../common/maintenance/ApproveMaintenance";
import { Tabs, Tab } from "react-bootstrap";

const MechApproval = () => {
  const [filter, setFilter] = useState("all");

  const handleFilter = (eventKey) => {
    setFilter(eventKey);
  };

  return (
    <div className="p-4">
      <h4 className="form-control-custom">Approve Maintenance </h4>
      <hr></hr>
      <Tabs
        className="form-control-custom"
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
    </div>
  );
};

export default MechApproval;
