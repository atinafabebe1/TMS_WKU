import React from 'react';
import Navbar from '../../common/header/Navbar';
import VehicleRequestForm from '../../common/vehicle/requestform';
import { Routes, Route } from 'react-router-dom';
import LandingPage from '../home/Home';
import SendComplain from '../../common/shared/sendComplain';
import VehicleRequestListPage from './VehicleRequests';
import CreateVehicleRequestForm from './CreateVehicleRequest';
import EditRequest from './EditVehicleRequest';
import EmployeeHome from './Home';
const links = [
  {
    name: 'Home',
    url: '/employee'
  },
  {
    name: 'Vehicle Request',
    url: '/employee/request/vehicle'
  },

  {
    name: 'Complaint',
    url: '/employee/complain'
  }
];
const profileUrl = '/employee/profile';

const EmployeePage = () => {
  return (
    <div>
      <Navbar links={links} title="TMS" profile={profileUrl} />
      <Routes>
        <Route path="/" element={<EmployeeHome />} />
        <Route path="vehicle-request" element={<CreateVehicleRequestForm />} />
        <Route path="edit-vehicle-request/:id" element={<EditRequest />} />
        <Route path="request/vehicle" element={<VehicleRequestListPage />} />
        <Route path="complain" element={<SendComplain />} />
      </Routes>
    </div>
  );
};

export default EmployeePage;
