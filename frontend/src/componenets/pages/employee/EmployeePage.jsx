import React from "react";
import Navbar from "../../common/header/Navbar";
import VehicleRequestForm from "../../common/vehicle/requestform";
import { Routes, Route } from "react-router-dom";
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
];
const EmployeePage = () => {
  return (
    <div>
      <Navbar links={links} title="TMS" />
      <Routes>
        <Route path="request/vehicle" element={<VehicleRequestForm />} />
      </Routes>
    </div>
  );
};

export default EmployeePage;
