import React from 'react';
import Navbar from '../../common/header/Navbar';

const links = [
  {
    name: 'Home',
    url: '/director'
  },
  {
    name: 'Vehicles',
    url: '/vehicles'
  },
  {
    name: 'Requests',
    url: '/request',
    children: [
      {
        name: 'Vehicle',
        url: '/request/vehicle'
      },
      {
        name: 'Fuel',
        url: '/request/fuel'
      },
      {
        name: 'Maintenance',
        url: '/request/maintenance'
      }
    ]
  },
  {
    name: 'Report',
    url: '/report',
    children: [
      {
        name: 'Monthly',
        url: '/report/monthly'
      },
      {
        name: 'Weekly',
        url: '/report/weekly'
      },
      {
        name: 'Emergency',
        url: '/report/weekly'
      }
    ]
  }
];
const profileUrl = '/director/profile';

const DirectorPage = () => {
  return (
    <div>
      <Navbar links={links} title="TMS" profile={profileUrl} />
    </div>
  );
};

export default DirectorPage;
