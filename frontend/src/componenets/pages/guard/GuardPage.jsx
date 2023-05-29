import React from 'react';
import Navbar from '../../common/header/Navbar';
import { Routes, Route } from 'react-router-dom';
import DetailVehicleInfo from './approvedVehiclePermission';
import UserProfile from '../../common/profile/profile';
const links = [
  {
    name: 'Home',
    url: '/guard'
  },
  {
    name: 'Approve-Permission',
    url: '/guard/approve'
  }
];
const profileUrl = '/guard/profile';

const GuardPage = () => {
  return (
    <div>
      <div className="mb-3">
        <Navbar links={links} title="TMS" profile={profileUrl} />
      </div>
      <Routes>
        <Route path="approve" element={<DetailVehicleInfo />} />
        <Route path="profile" element={<UserProfile />} />
      </Routes>
    </div>
  );
};

export default GuardPage;
