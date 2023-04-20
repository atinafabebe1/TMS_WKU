import React from "react";
import Navbar from "../../common/header/Navbar";

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
    name: "Register",
    url: "/fd/register-daily-fuel",
  },
];
const FuelDistrubtorPage = () => {
  return (
    <div>
      <Navbar links={links} title="TMS" />
    </div>
  );
};

export default FuelDistrubtorPage;
