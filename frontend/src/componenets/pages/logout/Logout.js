import React from "react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LogoutButton() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    const response = await axios.get("/user/logout");
    logout();
    navigate("/login");
  };

  return (
    <button
      style={{
        backgroundColor: "transparent",
        color: "#000",
        border: "none",
        cursor: "pointer",
        margin: 0,
        padding: 0,
        fontSize: "inherit",
        fontFamily: "inherit",
        textDecoration: "none",
        outline: "none",
      }}
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}

export default LogoutButton;
