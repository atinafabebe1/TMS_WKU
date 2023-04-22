import React from "react";
import Navbar from "../../common/header/Navbar";

import { Routes, Route } from "react-router-dom";

const links = [
  {
    name: "Home",
    url: "/store",
  },
  {
    name: "Approve",
    url: "/store/approve",
    children: [
      {
        name: "Maintenance Order",
        url: "/store/approve/purchasing-request",
      },
    ],
  },
  {
    name: "Report",
    url: "/store/Report",
    children: [
      {
        name: "Generate Report",
        url: "/store/Report/generate-report",
      },
    ],
  },
];
const StorePage = () => {
  return (
    <div>
      <div className="mb-3">
        <Navbar links={links} title="TMS" />
      </div>
    </div>
  );
};

export default StorePage;
