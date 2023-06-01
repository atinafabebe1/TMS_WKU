import React, { useState } from "react";
import MaintenanceOrderTable from "../../common/maintenance/maintenanceOrdertable";
import { Tabs, Tab } from "react-bootstrap";

const MechMaintenanceOrder = () => {
  const [filter, setFilter] = useState("all");

  const handleFilter = (eventKey) => {
    setFilter(eventKey);
  };

  return (
    <div className="p-4">
      <h4 className="form-control-custom">Maintenance Orders</h4>
      <hr></hr>
      <Tabs
        className="form-control-custom"
        activeKey={filter}
        onSelect={handleFilter}
        id="maintenance-request-tabs"
      >
        <Tab eventKey="all" title="All"></Tab>
        <Tab eventKey="undermaintenance" title="Under Maintenance"></Tab>
        <Tab eventKey="completed" title="Completed"></Tab>
        <Tab eventKey="canceled" title="Cancelled"></Tab>
      </Tabs>
      <MaintenanceOrderTable filter={filter} />
    </div>
  );
};

export default MechMaintenanceOrder;
