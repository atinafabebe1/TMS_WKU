import React from "react";
import Navbar from "../../common/header/Navbar";
import { Routes, Route } from "react-router-dom";
import VehiclesRequests from "../../common/vehicle/vehiclerequest";
import { useAuth } from "../../../context/AuthContext";

const links = [
  {
    name: "Home",
    url: "/director",
  },
  {
    name: "Requests",
    url: "/requests",
    children: [
      {
        name: "Vehicle",
        url: "/vp/request/vehicle",
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
    name: "Report",
    url: "/report",
    children: [
      {
        name: "Monthly",
        url: "/report/monthly",
      },
      {
        name: "Weekly",
        url: "/report/weekly",
      },
      {
        name: "Emergency",
        url: "/report/weekly",
      },
    ],
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
      </Routes>
    </div>
  );
};

export default VicePresidentPage;
