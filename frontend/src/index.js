import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import ServiceScheduleForm from "./componenets/pages/headOfDeploymnet/ServiceScheduleForm";
import { AuthProvider } from "./context/AuthContext";
import VehicleRequestForm from "./componenets/common/vehicle/requestform";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
