import React from "react";
import Navbar from "../../common/header/Navbar";
import { useNavigate } from "react-router-dom";


const links = [
  {
    name: 'Users',
    url: '/',
  },
  {
    name: 'Logout',
    url: '/logout',
  },
];
const AdminPage = () => {
  const navigate = useNavigate();
  
  return (
    <div>
        <Navbar links={links} title="TMS"/>
    </div>
  );
};

export default AdminPage;
