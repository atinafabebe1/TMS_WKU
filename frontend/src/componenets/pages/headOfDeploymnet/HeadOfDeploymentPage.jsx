import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../../common/header/Navbar";
import WeeklyReport from "../../common/report/weeklyReport";
import DailyReport from "../../common/report/dailyReport";
import MonthlyReport from "../../common/report/monthlyReport";
import EmmergencyReport from "../../common/report/emmergencyReport";
import VehicleInfromation from "../../common/vehicle/DisplayVehicle";
import RegisterVehicle from "../../common/vehicle/RegisterVehicle";
import ServiceScheduleForm from "./ServiceScheduleForm";
import TransferVehicle from "../../common/vehicle/TransferVehicle";
import WorkdaySchedule from "../../common/schedule/Workday";
import VehiclesRequests from "../../common/vehicle/vehiclerequest";
import { useAuth } from "../../../context/AuthContext";

const links = [
  {
    name: "Home",
    url: "/hd",
  },
  {
    name: "Vehicles",
    url: "/hd/vehicles",
    children: [
      {
        name: "Manage Vehicle",
        url: "/hd/vehicles",
      },
      {
        name: "Receive Vehicle",
        url: "/hd/vehicles/Receive",
      },
      {
        name: "Track Vehicle",
        url: "hd/vehicles/Track",
      },
      {
        name: "Assign Vehicle",
        url: "hd/vehicles/Assign",
      },
      {
        name: "Transfer Vehicle",
        url: "hd/vehicles/Transfer",
      },
    ],
  },
  {
    name: "Requests",
    url: "/requests",
    children: [
      {
        name: "Vehicle",
        url: "/hd/request/vehicle",
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
        url: "hd/report/monthly",
      },
      {
        name: "Daily",
        url: "hd/report/daily",
      },
      {
        name: "Weekly",
        url: "hd/report/weekly",
      },
      {
        name: "Emergency",
        url: "hd/report/emmergency",
      },
    ],
  },
];
const HeadOfDeploymentPage = () => {
  const { user } = useAuth();
  return (
    <div>
      <div className="mb-3">
        <Navbar links={links} title="TMS" />
      </div>
      <Routes>
        <Route path="schedule/workday" element={<WorkdaySchedule />} />
        <Route path="schedule/workday-new" element={<ServiceScheduleForm />} />
        <Route path="report/weekly" element={<WeeklyReport />} />
        <Route path="report/daily" element={<DailyReport />} />
        <Route path="report/monthly" element={<MonthlyReport />} />
        <Route path="report/emmergency" element={<EmmergencyReport />} />
        <Route path="vehicles" element={<VehicleInfromation />} />
        <Route path="vehicles/Receive" element={<RegisterVehicle />} />
        <Route path="vehicles/Transfer" element={<TransferVehicle />} />
        <Route
          path="request/vehicle"
          element={<VehiclesRequests link={`/Request/vehicle`} />}
        />{" "}
      </Routes>
    </div>
  );
};

export default HeadOfDeploymentPage;
