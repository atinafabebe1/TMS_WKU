import React from "react";
import Navbar from "../../common/header/Navbar";
import MaintenanceRequestPage from "./MaintenanceRequests";
import MaintenanceRequestForm from "./maintenance-request-form";
import { Routes,Route } from "react-router-dom";

const links = [
  {
    name: "Home",
    url: "/driver",
  },
  {
    name: "Vehicles",
    url: "/driver/vehicles",
  },
  {
    name: "Requests",
    url: "/driver/request",
    children: [
      {
        name: "Vehicle",
        url: "/driver/request/vehicle",
      },
      {
        name: "Fuel",
        url: "/driver/request/fuel",
      },
      {
        name: "Maintenance",
        url: "/driver/request/maintenance",
      },
    ],
  },
  {
    name: "Report",
    url: "/report",
    children: [
      {
        name: "Monthly",
        url: "/report/monthly",
      },
      {
        name: "Weekly",
        url: "/report/weekly",
      },
      {
        name: "Emergency",
        url: "/report/weekly",
      },
    ],
  },
];
const DriverPage = () => {
  return (
    <div>
      <Navbar links={links} title="TMS" />
      <Routes>
        <Route     path="request/maintenance"
          element={<MaintenanceRequestPage link={`/Request/maintenance`} />}></Route>
             <Route path="maintenance-request-form" element={<MaintenanceRequestForm />} />
      </Routes>
    </div>
  );
};

export default DriverPage;
