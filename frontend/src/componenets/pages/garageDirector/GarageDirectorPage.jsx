import React from 'react';
import Navbar from '../../common/header/Navbar';
import { Routes, Route } from 'react-router-dom';
import AccessoryRequest from './Accessory-Request';
import GDMaintenanceApproveTable from './maintenanceApproval';
import GDmaintenanceRequestPage from './maintenanceOrder';
import GDHome from './Home';
import UserProfile from '../../common/profile/profile';
import GDMaintenanceReportPage from '../../common/maintenance/MaintenanceReports';
const links = [
  {
    name: 'Home',
    url: '/gd'
  },
  {
    name: 'Maintenance',
    url: '/gd/maintenance',
    children: [
      {
        name: 'Maintenance Orders',
        url: '/gd/maintenance/maintenance-orders'
      },
      {
        name: 'Approve Maintenance',
        url: '/gd/maintenance/approve-maintenance'
      }
    ]
  },
  {
    name: 'Requests',
    url: '/gd/request',
    children: [
      {
        name: 'Accessory Request',
        url: '/gd/request/get-accessory-request'
      }
    ]
  },
  {
    name: 'Report',
    url: '/gd/report',
    children: [
      {
        name: 'Maintenance Report',
        url: '/gd/report/receive-maintenance-report'
      }
    ]
  }
];

const profileUrl = '/gd/profile';

const GarageDirectorPag = () => {
  return (
    <div>
      <div className="mb-3">
        <Navbar links={links} title="TMS" profile={profileUrl} />
      </div>
      <Routes>
        <Route path="/" element={<GDHome />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="request/get-accessory-request" element={<AccessoryRequest />} />
        <Route path="maintenance/approve-maintenance" element={<GDMaintenanceApproveTable />} />
        <Route path="report/receive-maintenance-report" element={<GDMaintenanceReportPage/>}/>
        <Route path="maintenance/maintenance-orders" element={<GDmaintenanceRequestPage link={`/Request/Maintenance`} />} />
      </Routes>
    </div>
  );
};

export default GarageDirectorPag;
