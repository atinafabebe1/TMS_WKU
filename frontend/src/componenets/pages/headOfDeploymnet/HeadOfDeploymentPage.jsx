import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../../common/header/Navbar";
import WeeklyReport from "../../common/report/weeklyReport";
import DailyReport from "../../common/report/dailyReport";
import MonthlyReportList from "../../common/report/monthlyReport";
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
import PropertyTypeList from "./VehicleClassification/PropertyType";
import ClassTypeVehicleList from "./VehicleClassification/ClassType";
import FuelTypeList from "./VehicleClassification/ClassFuel";
import EmmergencyReport from "./EmmergencyReportList";
import DetailEmmergecy from "./DetailEmergency";
import FuelCost from "../../common/fuel/RegisterFuelCost";
import FuelCostListPage from "../../common/fuel/DisplayFuelCost";
import EditFuelCost from "../../common/fuel/EditFuelCost";
import UserProfile from "../../common/profile/profile";
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
        name: "Vehicle Request",
        url: "/hd/request/vehicle",
      },
      {
        name: "Fuel Request",
        url: "/hd/request/fuel",
      },
      {
        name: "Maintenance Request",
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
    name: "Fuel",
    url: "/hd/fuel",
  },
  {
    name: "Complain",
    url: "/hd/complain",
  },
];
const profileUrl = "/hd/profile";

const HeadOfDeploymentPage = () => {
  return (
    <div>
      <div className="mb-3">
        <Navbar links={links} title="TMS" profile={profileUrl} />
      </div>
      <Routes>
        <Route path="/" element={<Example />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="schedule/workday" element={<WorkdaySchedule />} />
        <Route path="schedule/workday-new" element={<ServiceScheduleForm />} />
        <Route path="report/weekly" element={<WeeklyReport />} />
        <Route path="report/daily" element={<DailyReport />} />
        <Route path="report/monthly" element={<MonthlyReportList />} />
        <Route path="report/emergence" element={<EmmergencyReport />} />
        <Route path="report/detail/:id" element={<DetailEmmergecy />} />
        <Route path="vehicles" element={<DetailVehicleInfo />} />
        <Route
          path="vehicles/edit-vehicle/:id"
          element={<EditVehicleRecord />}
        />
        <Route path="vehicles/assign-vehicle/:id" element={<AssignVehicle />} />
        <Route path="vehicles/type" element={<ClassTypeVehicleList />} />
        <Route path="vehicles/propertyType" element={<PropertyTypeList />} />
        <Route path="vehicles/propertyType" element={<PropertyTypeList />} />
        <Route path="vehicles/fuelTypeList" element={<FuelTypeList />} />
        <Route path="vehicles/Transfer" element={<TransferVehicle />} />
        <Route path="vehicles/Receive" element={<RegisterVehicle />} />

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
        <Route path="fuel" element={<FuelCostListPage />} />
        <Route path="fuel/register" element={<FuelCost />} />
        <Route path="fuel/edit-fuel/:id" element={<EditFuelCost />} />
      </Routes>
    </div>
  );
};

export default HeadOfDeploymentPage;
