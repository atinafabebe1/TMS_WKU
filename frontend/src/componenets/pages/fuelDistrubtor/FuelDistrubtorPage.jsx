import React from "react";
import Navbar from "../../common/header/Navbar";
import RegisterDailyFuel from "./RegisterDailyFuelAndOil";
import DetailFuelInfo from "./RegisteredFuel";
import EditFuelRecord from "./EditRegisteredFuel";
import { Routes, Route } from "react-router-dom";
const links = [
  {
    name: "Home",
    url: "/fd",
  },
  {
    name: "Request",
    url: "/fd/approve-fuel-request",
  },
  {
    name: "Daily-Fuel",
    url: "/fd/registered-fuel",
  },
];
const FuelDistrubtorPage = () => {
  return (
    <div>
      <Navbar links={links} title="TMS" />
      <div>
        <Routes>
          <Route path="register-daily-fuel" element={<RegisterDailyFuel />} />
          <Route path="registered-fuel" element={<DetailFuelInfo />} />
          <Route path="edit-fuel-record/:id" element={<EditFuelRecord />} />
        </Routes>
      </div>
    </div>
  );
};

export default FuelDistrubtorPage;
