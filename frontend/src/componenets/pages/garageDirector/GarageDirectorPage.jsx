import React from "react";
import Navbar from "../../common/header/Navbar";
import { Routes, Route } from "react-router-dom";
import AccessoryRequest from "./Accessory-Request";
import MaintenanceOrderTable from "../../common/maintenance/maintenanceOrdertable";
const links = [
  {
    name: "Home",
    url: "/gd",
  },
  {
    name: "Maintenance",
    url: "/gd/maintenance",
    children: [
      {
        name: "Receive Maintenance",
        url: "/gd/maintenance/receive-maintenance-order",
      },
      {
        name: "Order Maintenance",
        url: "/gd/maintenance/send-maintenance-order",
      },
      {
        name: "Approve Maintenance",
        url: "/gd/maintenance/approve-maintenance",
      },
    ],
  },
  {
    name: "Requests",
    url: "/gd/request",
    children: [
      {
        name: "Accessory Request",
        url: "/gd/request/get-accessory-request",
      },
      {
        name: "Send Accessory Request",
        url: "/gd/request/send-accessory-request",
      },
    ],
  },
  {
    name: "Report",
    url: "/gd/report",
    children: [
      {
        name: "Maintenance Report",
        url: "/gd/report/receive-maintenance-report",
      },
    ],
  },
];
const GarageDirectorPag = () => {
  return (
    <div>
      <div className="mb-3">
        <Navbar links={links} title="TMS" />
      </div>
      <Routes>
        <Route
          path="request/get-accessory-request"
          element={<AccessoryRequest />}
        />
        <Route
          path="maintenance/send-maintenance-order"
          element={<MaintenanceOrderTable link={`/MaintenanceOrder`} />}
        />
      </Routes>
    </div>
  );
};

export default GarageDirectorPag;
