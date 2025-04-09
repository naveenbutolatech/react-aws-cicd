import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import AdminLayout from './layouts/admin-layout';
import DoctorLayout from './layouts/doctor-layout/index'; // Ensure correct path
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin-dashboard" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
        <Route path="/doctor-dashboard" element={<DoctorLayout><DoctorDashboard /></DoctorLayout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;

