import React from "react";
import Navbar from "../../common/header/Navbar";
import { Routes, Route } from "react-router-dom";
import DetailVehicleInfo from "./approvedVehiclePermission";
const links = [
  {
    name: "Home",
    url: "/guard",
  },
  {
    name: "Approve-Permission",
    url: "/guard/approve",
  },
];
const GuardPage = () => {
  return (
    <div>
      <div className="mb-3">
        <Navbar links={links} title="TMS" />
      </div>
      <Routes>
        <Route path="approve" element={<DetailVehicleInfo />} />
      </Routes>
    </div>
  );
};

export default GuardPage;