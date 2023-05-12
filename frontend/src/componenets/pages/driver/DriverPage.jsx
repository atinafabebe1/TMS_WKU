import React from "react";
import Navbar from "../../common/header/Navbar";
import MaintenanceRequestPage from "./MaintenanceRequests";
import MaintenanceRequestForm from "./maintenance-request-form";
import FuelRequest from "./CreateFuelRequest";
import { Routes, Route } from "react-router-dom";
const links = [
  {
    name: "Home",
    url: "/driver",
  },
  {
    name: "Vehicles",
    url: "/driver/vehicles",
    children: [
      {
        name: "Vehicle Transfer",
        url: "/driver/vehicles/transfer",
      },
      {
        name: "Receive Vehicle",
        url: "/driver/vehicles/receive",
      },
    ],
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
    url: "/driver/report",
    children: [
      {
        name: "Emmergency Report",
        url: "/driver/report/emmergency",
      },
    ],
  },
  {
    name: "Complain",
    url: "/driver/complain",
  },
];
const DriverPage = () => {
  return (
    <div>
      <Navbar links={links} title="TMS" />
      <Routes>
        <Route path="request/fuel" element={<FuelRequest />}></Route>
        <Route
          path="request/maintenance"
          element={<MaintenanceRequestPage link={`/Request/maintenance`} />}
        ></Route>
        <Route
          path="maintenance-request-form"
          element={<MaintenanceRequestForm />}
        />
      </Routes>
    </div>
  );
};

export default DriverPage;
