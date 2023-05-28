import React, { useState } from "react";
import MaintenanceApprovalTable from "../../common/maintenance/ApproveMaintenance";
import {Tabs, Tab } from "react-bootstrap";

const GDMaintenanceApproveTable = () => {
  const [filter, setFilter] = useState("all");

  const handleFilter = (eventKey) => {
    setFilter(eventKey);
  };

  return (
    <>
            <div className="text-center">
        <h2 className="form-control-custom" >Maintenance Approvals</h2>
      </div>
      <Tabs
      className="form-control-custom"
        activeKey={filter}
        onSelect={handleFilter}
        id="maintenance-request-tabs"
      >
          <Tab eventKey="waiting-gd-to-approve" title="Pending">
        </Tab>
        <Tab eventKey="completed" title="Completed">
        </Tab>
        <Tab eventKey="canceled" title="Cancelled">
        </Tab>
      </Tabs>

      <MaintenanceApprovalTable filter={filter} />
    </>
  );
};

export default GDMaintenanceApproveTable;
