import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../../common/header/Navbar';
import { useNavigate } from 'react-router-dom';
import RegisterForm from './Register';
import UsersInformation from './UsersInformation';
import EditUserForm from './EditUser';
import { useAuth } from '../../../context/AuthContext';
import UserProfile from '../../common/profile/profile';
import AdminHome from './AdminHome';
const links = [
  {
    name: 'Home',
    url: '/admin'
  },
  {
    name: 'Users',
    url: '/admin/user'
  }
];
const profileUrl = '/admin/profile';

const AdminPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  return (
    <div>
      <Navbar links={links} title="TMS" role="/admin/profile" profile={profileUrl} />
      <Routes>
        <Route path="profile" element={<UserProfile />} />
        <Route path="register" element={<RegisterForm />} />
        <Route exact path="user" element={<UsersInformation />} />
        <Route exact path=":id" element={<EditUserForm />} />
        <Route path="" element={<AdminHome />} />
      </Routes>
    </div>
  );
};

export default AdminPage;
