import React from "react";
import Navbar from "../../common/header/Navbar";
import VehicleRequestForm from "../../common/vehicle/requestform";
import { Routes, Route } from "react-router-dom";
import Complain from "../../common/complain/complainForm";
import LandingPage from "../home/Home";
import VehicleRequestListPage from "./VehicleRequests";
import CreateVehicleRequestForm from "./CreateVehicleRequest";
import EditRequest from "./EditVehicleRequest";
const links = [
  {
    name: "Home",
    url: "/employee",
  },
  {
    name: "Vehicle Request",
    url: "/employee/request/vehicle",
  },

  {
    name: "Complaint",
    url: "/employee/complain",
  },
];
const EmployeePage = () => {
  return (
    <div>
      <Navbar links={links} title="TMS" />
      <Routes>
        <Route path="" element={<LandingPage />} />
        <Route path="vehicle-request" element={<CreateVehicleRequestForm />} />
        <Route path="edit-vehicle-request/:id" element={<EditRequest />} />
        <Route path="request/vehicle" element={<VehicleRequestListPage />} />
        <Route path="complain" element={<Complain />} />
      </Routes>
    </div>
  );
};

export default EmployeePage;
