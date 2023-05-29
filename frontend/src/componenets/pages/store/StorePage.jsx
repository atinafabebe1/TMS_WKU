import React from 'react';
import Navbar from '../../common/header/Navbar';
import SparePartsHomeReport from './GenerateAndStoreReports';
import SparePartPurchasingRequest from './ApproveSparePartPurchasing';
import SparePartReports from './SparePartReport';
import StoreHome from './Home';
import { Routes, Route } from 'react-router-dom';

const links = [
  {
    name: 'Home',
    url: '/store'
  },
  {
    name: 'Approve',
    url: '/store/approve',
    children: [
      {
        name: 'Spare Part Purchasing',
        url: '/store/approve/sparePart-purchasing-request'
      }
    ]
  },
  {
    name: 'Report',
    url: '/store/Report',
    children: [
      {
        name: 'Generate Report',
        url: '/store/Report'
      }
    ]
  }
];
const profileUrl = '/store/profile';

const StorePage = () => {
  return (
    <div>
      <div className="mb-3">
        <Navbar links={links} title="TMS" profile={profileUrl} />
      </div>
      <Routes>
        <Route path="/" element={<StoreHome />} />
        <Route path="approve/sparePart-purchasing-request" element={<SparePartPurchasingRequest />} />
        <Route path="Report" element={<SparePartsHomeReport />} />
        <Route path="Report/generate-report/:fromDate/:toDate/:season" element={<SparePartReports />} />
      </Routes>
    </div>
  );
};

export default StorePage;
