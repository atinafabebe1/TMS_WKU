import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../../common/header/Navbar";
import WeeklyReport from "../../common/report/weeklyReport";
import DailyReport from "../../common/report/dailyReport";
import MonthlyReport from "../../common/report/monthlyReport";
import EmmergencyReport from "../../common/report/emmergencyReport";
import ServiceScheduleForm from "./ServiceScheduleForm";
import TransferVehicle from "./TransferVehicle";
import TrackVehicle from "../../common/vehicle/TrackVehicle";
import Complain from "./Complain";
import WorkdaySchedule from "../../common/schedule/Workday";
import VehiclesRequests from "../../common/vehicle/vehiclerequest";
import RegisterVehicle from "./RegisterVehicles";
import EditVehicleRecord from "./EditVehicleRecord";
import DetailVehicleInfo from "./DetailVehicleInfo";
import SingleVehicleDetailInfoo from "./SingleVehicleDetailInfo";
import AssignVehicle from "../../common/vehicle/AssignVehicle";
import HODMaintenanceRequestPage from "./maintenanceRequest";
import ApproveFuelRequest from "./ApproveFuelRequest";
import Example from "./Home";
import VehicleRecordList from "./Vehicles";
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
        name: "Track Vehicle",
        url: "/hd/vehicles/Track",
      },
      {
        name: "Transfer Vehicle",
        url: "/hd/vehicles/Transfer",
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
        url: "/hd/request/fuel",
      },
      {
        name: "Maintenance",
        url: "/hd/request/maintenance",
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
        url: "/hd/report/monthly",
      },
      {
        name: "Daily",
        url: "/hd/report/daily",
      },
      {
        name: "Weekly",
        url: "/hd/report/weekly",
      },
      {
        name: "Emergency",
        url: "/hd/report/emergence",
      },
    ],
  },
  {
    name: "Complain",
    url: "/hd/complain",
  },
];
const HeadOfDeploymentPage = () => {
  return (
    <div>
      <div className="mb-3">
        <Navbar links={links} title="TMS" />
      </div>
      <Routes>
        <Route path="/" element={<Example />} />
        <Route path="schedule/workday" element={<WorkdaySchedule />} />
        <Route path="schedule/workday-new" element={<ServiceScheduleForm />} />
        <Route path="report/weekly" element={<WeeklyReport />} />
        <Route path="report/daily" element={<DailyReport />} />
        <Route path="report/monthly" element={<MonthlyReport />} />
        <Route path="report/emergence" element={<VehicleRecordList />} />
        <Route path="vehicles" element={<DetailVehicleInfo />} />
        <Route
          path="vehicles/edit-vehicle/:id"
          element={<EditVehicleRecord />}
        />
        <Route path="vehicles/assign-vehicle/:id" element={<AssignVehicle />} />
        <Route path="vehicles/Receive" element={<RegisterVehicle />} />
        <Route path="vehicles/Transfer" element={<TransferVehicle />} />
        <Route
          path="request/vehicle"
          element={<VehiclesRequests link={`/Request/vehicle`} />}
        />
        <Route path="vehicles/Track" element={<TrackVehicle />} />
        <Route
          path="vehicles/detail/:id"
          element={<SingleVehicleDetailInfoo />}
        />
        <Route path="vehicles/Assign" element={<AssignVehicle />} />
        <Route path="complain" element={<Complain />} />
        <Route
          path="request/maintenance"
          element={<HODMaintenanceRequestPage link={`/Request/maintenance`} />}
        />
        <Route path="request/fuel" element={<ApproveFuelRequest />} />
      </Routes>
    </div>
  );
};

export default HeadOfDeploymentPage;
