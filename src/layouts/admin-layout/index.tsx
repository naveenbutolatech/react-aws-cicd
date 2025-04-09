import React from 'react';
import Header from './Header';
import Footer from './Footer';

import Sidebar from './Sidebar'; // Ensure Sidebar is properly imported

interface AdminLayoutProps {
  children: React.ReactNode;
}
import { useNavigate } from 'react-router-dom';

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from local storage
    navigate('/'); // Redirect to login page
  };
  return (
    <div className="admin-layout">
      <Header onLogout={handleLogout} />
      <Sidebar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}; // Close the AdminLayout component

export default AdminLayout;

