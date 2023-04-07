import React from "react";
import Navbar from "../../common/header/Navbar";
import { Routes } from "react-router-dom";

const links = [
  {
    name: "Home",
    url: "/driver",
  },
  {
    name: "Vehicles",
    url: "/driver/vehicles",
    children: [
      {
        name: "Vehicle Transfer",
        url: "/driver/vehicles/transfer",
      },
      {
        name: "Receive Vehicle",
        url: "/driver/vehicles/receive",
      },
    ],
  },
  {
    name: "Requests",
    url: "/driver/request",
    children: [
      {
        name: "Fuel",
        url: "/driver/request/vehicle",
      },
      {
        name: "Maintenance",
        url: "/driver/request/maintenance",
      }
    ],
  },
  {
    name: "Report",
    url: "/driver/report",
    children: [
      {
        name: "Emmergency Report",
        url: "/driver/report/emmergency",
      }
    ],
  },
  {
    name: "Complain",
    url: "/driver/complain",
  }
];
const DriverPage = () => {
  return (
    <div>
      <div className="mb-3">
        <Navbar links={links} title="TMS" />
      </div>
      <Routes>
      </Routes>
    </div>
  );
};

export default DriverPage;
