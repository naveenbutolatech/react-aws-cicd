import React from "react";

import Sidebar from "./Sidebar"; // Ensure Sidebar is properly imported

interface DoctorLayoutProps {
  children: React.ReactNode;
}

import "../../assets/css/dashboard-layout.css";

const DoctorLayout: React.FC<DoctorLayoutProps> = ({ children }) => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      {children}
    </div>
  );
}; // Close the DoctorLayout component

export default DoctorLayout;
