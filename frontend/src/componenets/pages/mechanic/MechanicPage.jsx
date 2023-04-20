import React from "react";
import Navbar from "../../common/header/Navbar";
import AccessoryRequest from "./AccessoryRequest";
import { Routes, Route } from "react-router-dom";

const links = [
  {
    name: "Home",
    url: "/mechanic",
  },
  {
    name: "Maintenance",
    url: "/mechanic/maintenance",
    children: [
      {
        name: "Maintenance Order",
        url: "/mechanic/maintenance/receive-maintenance-order",
      },
      {
        name: "Approve Maintenance",
        url: "/mechanic/maintenance/approve-maintenance",
      },
      {
        name: "Maintenance Report",
        url: "/mechanic/maintenance/send-maintenance-report",
      },
    ],
  },
  {
    name: "Requests",
    url: "/mechanic/request",
    children: [
      {
        name: "Accessory Request",
        url: "/mechanic/request/accessory",
      },
    ],
  },
];
const MechanicPage = () => {
  return (
    <div>
      <div className="mb-3">
        <Navbar links={links} title="TMS" />
      </div>
      <Routes>
        <Route path="request/accessory" element={<AccessoryRequest />} />
      </Routes>
    </div>
  );
};

export default MechanicPage;
