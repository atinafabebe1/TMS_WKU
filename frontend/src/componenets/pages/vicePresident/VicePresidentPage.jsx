import React from "react";
import Navbar from "../../common/header/Navbar";
import { Routes, Route } from "react-router-dom";
import VehiclesRequests from "../../common/vehicle/vehiclerequest";
import SendComplain from "../../common/shared/sendComplain";
import { useAuth } from "../../../context/AuthContext";

const links = [
  {
    name: "Home",
    url: "/vp",
  },
  {
    name: "Requests",
    url: "/vp/requests",
    children: [
      {
        name: "Vehicle",
        url: "/vp/request/vehicle",
      },
      {
        name: "Fuel",
        url: "/vp/request/fuel",
      },
    ],
  },
  {
    name: "Report",
    url: "/vp/report",
    children: [
      {
        name: "Monthly",
        url: "/vp/report/monthly",
      },
      {
        name: "Weekly",
        url: "/vp/report/weekly",
      },
      {
        name: "Emergency",
        url: "/vp/report/weekly",
      },
    ],
  },
  {
    name: "Complain",
    url: "/vp/complain",
  },
];

const VicePresidentPage = () => {
  const { user } = useAuth();
  console.log(user);
  return (
    <div>
      <Navbar links={links} title="TMS" />
      <Routes>
        <Route
          path="request/vehicle"
          element={<VehiclesRequests link={`/Request/vehicle`} />}
        />
        <Route path="complain" element={<SendComplain />} />
      </Routes>
    </div>
  );
};

export default VicePresidentPage;
