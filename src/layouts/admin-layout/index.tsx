import React from 'react';
import Sidebar from './Sidebar'; // Ensure Sidebar is properly imported


interface AdminLayoutProps {
  children: React.ReactNode;
}

import "../../assets/css/dashboard-layout.css";

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div style={{display:'flex'}}>
      <Sidebar />
      {children}
    </div>
  );
}; 

export default AdminLayout;

