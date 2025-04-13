import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import HospitalRegistration from './pages/admin/HospitalRegistration';
import AdminLayout from './layouts/admin-layout';
import DoctorLayout from './layouts/doctor-layout/index';
import HospitalListing from './pages/admin/HospitalListing';

import WelcomePage from './pages/Welcome';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/admin-dashboard" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
        <Route path="/doctor-dashboard" element={<DoctorLayout><DoctorDashboard /></DoctorLayout>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/hospital-registration" element={<AdminLayout><HospitalRegistration /></AdminLayout>} />
        <Route path="/hospital-listing" element={<AdminLayout><HospitalListing /></AdminLayout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;

