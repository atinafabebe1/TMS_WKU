import React, { useState } from "react";
import GDMaintenanceRequestTables from "./maintenanceReqToOrder";
import {Tabs, Tab } from "react-bootstrap";

const GDmaintenanceRequestPage = () => {
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
         <Tab eventKey="all" title="All">
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

      <GDMaintenanceRequestTables filter={filter} />
    </>
  );
};

export default GDmaintenanceRequestPage;
