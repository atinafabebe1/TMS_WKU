import React from "react";
import Navbar from "../../common/header/Navbar";
import { Routes, Route } from "react-router-dom";
import VehiclesRequests from "../../common/vehicle/vehiclerequest";
import SendComplain from "../../common/shared/sendComplain";
import VehicleRequestListPage from "./VehicleRequests";
import CreateVehicleRequestForm from "./CreateVehicleRequest";
import EditVehicleRequest from "./EditVehicleRequest";
import VpHomePage from "./VpHome";
import { useAuth } from "../../../context/AuthContext";
import UserProfile from "../../common/profile/profile";

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
        name: "Approve Vehicle Request",
        url: "/vp/request/vehicle",
      },
      {
        name: "Send Vehicle Request",
        url: "/vp/request/vehicle-request",
      },
    ],
  },

  {
    name: "Complain",
    url: "/vp/complain",
  },
];
const profileUrl = "/vp/profile";

const VicePresidentPage = () => {
  const { user } = useAuth();
  console.log(user);
  return (
    <div>
      <Navbar links={links} title="TMS" profile={profileUrl} />
      <Routes>
        <Route
          path="request/vehicle"
          element={<VehiclesRequests link={`/Request/vehicle`} />}
        />
        <Route path="complain" element={<SendComplain />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="/" element={<VpHomePage />} />
        <Route
          path="/request/vehicle-request"
          element={<VehicleRequestListPage />}
        />
        <Route
          path="/request/vehicle-request/create"
          element={<CreateVehicleRequestForm />}
        />
        <Route
          path="request/edit-vehicle-request/:id"
          element={<EditVehicleRequest />}
        />
      </Routes>
    </div>
  );
};

export default VicePresidentPage;
