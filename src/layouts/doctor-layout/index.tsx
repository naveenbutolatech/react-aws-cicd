import React from 'react';
import Header from './Header';
import Footer from './Footer';

import Sidebar from './Sidebar'; // Ensure Sidebar is properly imported

interface DoctorLayoutProps {
  children: React.ReactNode;
}
import { useNavigate } from 'react-router-dom';

const DoctorLayout: React.FC<DoctorLayoutProps> = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from local storage
    navigate('/'); // Redirect to login page
  };
  return (
    <div className="doctor-layout">
      <Header onLogout={handleLogout} />
      <Sidebar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}; // Close the DoctorLayout component

export default DoctorLayout;

