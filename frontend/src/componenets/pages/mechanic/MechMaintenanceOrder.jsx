import React, { useState } from "react";
import MaintenanceOrderTable from "../../common/maintenance/maintenanceOrdertable";
import { Tabs, Tab } from "react-bootstrap";

const MechMaintenanceOrder = () => {
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
        <Tab eventKey="all" title="All"></Tab>
        <Tab eventKey="pending" title="Pending"></Tab>
        <Tab eventKey="UnderMaintenance" title="Under Maintenance"></Tab>
        <Tab eventKey="in-progress" title="In Progress"></Tab>
        <Tab eventKey="completed" title="Completed"></Tab>
        <Tab eventKey="canceled" title="Cancelled"></Tab>
      </Tabs>
      <MaintenanceOrderTable filter={filter} />
    </>
  );
};

export default MechMaintenanceOrder;
