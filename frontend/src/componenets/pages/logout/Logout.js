import React from "react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
function LogoutButton() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    const response = await axios.get("/user/logout");
    logout();
    navigate("/login");
  };

  return <Link onClick={handleLogout}>Logout</Link>;
}

export default LogoutButton;
