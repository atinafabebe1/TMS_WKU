import React from "react";
import Navbar from "../../common/header/Navbar";
import DrivermaintenanceRequestPage from "./MaintenanceRequestFilter";
import MaintenanceRequestForm from "./maintenance-request-form";
import FuelRequest from "./CreateFuelRequest";
import FuelRequestListPage from "./FuelRequestList";
import SendComplain from "../../common/shared/sendComplain";
import EmergencyReport from "./EmmergencyReport";
import TransferVehiclePage from "./transferVehicle";
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
        name: "Request Fuel",
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
        <Route path="report/emmergency" element={<EmergencyReport />} />
        <Route path="complain" element={<SendComplain />} />
        <Route path="request/fuel" element={<FuelRequestListPage />}></Route>
        <Route
          path="request/create-fuel-request"
          element={<FuelRequest />}
        ></Route>
        <Route
          path="request/maintenance"
          element={<DrivermaintenanceRequestPage link={`/Request/maintenance`} />}
        ></Route>
        <Route
          path="maintenance-request-form"
          element={<MaintenanceRequestForm />}
        />
          <Route
          path="vehicles/transfer"
          element={<TransferVehiclePage />}
        />
      </Routes>
    </div>
  );
};

export default DriverPage;
