import React from 'react';
import Navbar from '../../common/header/Navbar';
import DrivermaintenanceRequestPage from './MaintenanceRequestFilter';
import MaintenanceRequestForm from './maintenance-request-form';
import FuelRequest from './CreateFuelRequest';
import FuelRequestListPage from './FuelRequestList';
import SendComplain from '../../common/shared/sendComplain';
import CreateEmergencyReport from '../../common/report/createEmmergencyReport';
import EmmergencyReport from './emmergencyReport';
import TransferVehicleRequest from './TransferVehicleRequest';
import EditEmergencyReport from './EditEmergencyReport';
import DriverReceiveVehicle from './ReceiveVehicle';
import DriverHomePage from './DriverHomePage';
import { Routes, Route } from 'react-router-dom';
import UserProfile from '../../common/profile/profile';
const links = [
  {
    name: 'Home',
    url: '/driver'
  },
  {
    name: 'Vehicles',
    url: '/driver/vehicles',
    children: [
      {
        name: 'My Vehicle',
        url: '/driver/vehicles/receive'
      }
    ]
  },
  {
    name: 'Requests',
    url: '/driver/request',
    children: [
      {
        name: 'Request Fuel',
        url: '/driver/request/fuel'
      },
      {
        name: 'Maintenance',
        url: '/driver/request/maintenance'
      }
    ]
  },
  {
    name: 'Report',
    url: '/driver/report',
    children: [
      {
        name: 'Emmergency Report',
        url: '/driver/report/emmergency'
      }
    ]
  },
  {
    name: 'Complain',
    url: '/driver/complain'
  }
];
const profileUrl = '/driver/profile';

const DriverPage = () => {
  return (
    <div>
      <Navbar links={links} title="TMS" profile={profileUrl} />
      <Routes>
        <Route path="" element={<DriverHomePage />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="report/emmergency" element={<EmmergencyReport />} />
        <Route path="report/emmergency/create" element={<CreateEmergencyReport />} />
        <Route path="report/emmergency/edit/:id" element={<EditEmergencyReport />} />
        <Route path="complain" element={<SendComplain />} />
        <Route path="request/fuel" element={<FuelRequestListPage />}></Route>
        <Route path="request/create-fuel-request" element={<FuelRequest />}></Route>
        <Route path="request/maintenance" element={<DrivermaintenanceRequestPage link={`/Request/maintenance`} />}></Route>
        <Route path="maintenance-request-form" element={<MaintenanceRequestForm />} />
        <Route path="vehicles/transfer" element={<TransferVehicleRequest />} />
        <Route path="vehicles/receive" element={<DriverReceiveVehicle />} />
      </Routes>
    </div>
  );
};

export default DriverPage;
