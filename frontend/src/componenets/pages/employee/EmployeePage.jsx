import React from "react";
import Navbar from "../../common/header/Navbar";
import VehicleRequestForm from "../../common/vehicle/requestform";
import { Routes, Route } from "react-router-dom";
import Complain from "../../common/complain/complainForm";
import LandingPage from "../home/Home";
const links = [
  {
    name: "Home",
    url: "/employee",
  },
  {
    name: "Request",
    url: "/request",
    children: [
      {
        name: "Vehicle",
        url: "/employee/request/vehicle",
      },
    ],
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
        <Route path="request/vehicle" element={<VehicleRequestForm />} />
        <Route path="complain" element={<Complain />} />
      </Routes>
    </div>
  );
};

export default EmployeePage;
