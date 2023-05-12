import React from "react";
import Navbar from "../../common/header/Navbar";
import RegisterDailyFuel from "./RegisterDailyFuelAndOil";
import DetailFuelInfo from "./RegisteredFuel";
import EditFuelRecord from "./EditRegisteredFuel";
import FDHomePage from "./HomePage";
import ApproveAndRegisterFuelRequest from "./CompleteFuelRequest";
import RegisterResourceForm from "./RegisterFuelResource";
import FuelResourceList from "./FuelResourceList";
import { Routes, Route } from "react-router-dom";
const links = [
  {
    name: "Home",
    url: "/fd",
  },
  {
    name: "Daily-Fuel",
    url: "/fd/registered-fuel",
  },
  {
    name: "Fuel-Resource",
    url: "/fd/fuel-resources",
  },
  {
    name: "Approve",
    url: "/fd/approve-fuel-request",
  },
];
const FuelDistrubtorPage = () => {
  return (
    <div>
      <Navbar links={links} title="TMS" />
      <div>
        <Routes>
          <Route path="/" element={<FDHomePage />} />

          <Route path="fuel-resources" element={<FuelResourceList />} />
          <Route path="register-daily-fuel" element={<RegisterDailyFuel />} />
          <Route path="registered-fuel" element={<DetailFuelInfo />} />
          <Route path="edit-fuel-record/:id" element={<EditFuelRecord />} />
          <Route
            path="approve-fuel-request"
            element={<ApproveAndRegisterFuelRequest />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default FuelDistrubtorPage;
