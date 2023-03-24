import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../../common/header/Navbar";
import { useNavigate } from "react-router-dom";
import RegisterForm from "./Register";
import UsersInformation from "./UsersInformation";
import EditUserForm from "./EditUser";
import { useAuth } from "../../../context/AuthContext";
import UserProfile from "../../common/profile/profile";
const links = [
  {
    name: "Users",
    url: "/admin",
  },
];
const AdminPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  return (
    <div>
      <Navbar links={links} title="TMS" role="/admin/profile" />
      <Routes>
        <Route path="profile" element={<UserProfile />} />
        <Route path="register" element={<RegisterForm />} />
        <Route exact path="" element={<UsersInformation />} />
        <Route exact path=":id" element={<EditUserForm />} />
        {/* <Route path="" element={<VehicleInfromation />} /> */}
      </Routes>
    </div>
  );
};

export default AdminPage;
