import React from "react";
import Navbar from "../../common/header/Navbar";
import VehicleRequestForm from "./requestform";
import { Routes, Route } from "react-router-dom";
import Complain from "../../common/complain/complainForm";
import LandingPage from "../home/Home";
import VehicleRequestListPage from "./VehicleRequests";
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
        <Route path="vehicle-request-form" element={<VehicleRequestForm />} />
        <Route path="request/vehicle" element={<VehicleRequestListPage />} />
        <Route path="complain" element={<Complain />} />
      </Routes>
    </div>
  );
};

export default EmployeePage;
