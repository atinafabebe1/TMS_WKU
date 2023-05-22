import React from "react";
import Navbar from "../../common/header/Navbar";
import SparePartRequest from "./CreateAccessoryRequest";
import SparePartRequestListPage from "./SparePartRequestList";
import EditSparePartRequest from "./EditAccessoryRequest";
import MecMaintenanceReport from "./maintenanceReport";
import MechApproval from "./MechanicApprovalPage";
import MechMaintenanceOrder from "./MechMaintenanceOrder";
import MechanicHome from "./Home";
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
        <Route path="/" element={<MechanicHome />} />
        <Route
          path="request/accessory"
          element={<SparePartRequestListPage />}
        />
        <Route
          path="maintenance/receive-maintenance-order"
          element={<MechMaintenanceOrder />}
        />
        <Route
          path="maintenance/approve-maintenance"
          element={<MechApproval />}
        />
        <Route
          path="maintenance/send-maintenance-report"
          element={<MecMaintenanceReport />}
        />
        <Route path="request/create-accessory" element={<SparePartRequest />} />
        <Route
          path="request/edit-vehicle-request/:id"
          element={<EditSparePartRequest />}
        />
      </Routes>
    </div>
  );
};

export default MechanicPage;
