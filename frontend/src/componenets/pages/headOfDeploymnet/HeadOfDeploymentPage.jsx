import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../../common/header/Navbar";
import WeeklyReport from "../../common/report/weeklyReport";
import VehicleInfromation from "../../common/vehicle/DisplayVehicle";
import ServiceScheduleForm from "./ServiceScheduleForm";
const links = [
  {
    name: "Home",
    url: "/hd",
  },
  {
    name: "Vehicles",
    url: "/hd/vehicles",
  },
  {
    name: "Requests",
    url: "/request",
    children: [
      {
        name: "Vehicle",
        url: "/request/vehicle",
      },
      {
        name: "Fuel",
        url: "/request/fuel",
      },
      {
        name: "Maintenance",
        url: "/request/maintenance",
      },
    ],
  },
  {
    name: "Schedule",
    url: "/schedule",
    children: [
      {
        name: "Workday",
        url: "/hd/schedule/workday",
      },
      {
        name: "Weekend",
        url: "/hd/schedule/weekend",
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
        url: "hd/report/weekly",
      },
      {
        name: "Emergency",
        url: "hd/report/weekly",
      },
    ],
  },
];
const HeadOfDeploymentPage = () => {
  return (
    <div>
      <div className="mb-3">
        <Navbar links={links} title="TMS" />
      </div>
      <Routes>
        <Route path="schedule/workday" element={<ServiceScheduleForm />} />
        <Route path="vehicles" element={<VehicleInfromation />} />
      </Routes>
    </div>
  );
};

export default HeadOfDeploymentPage;
