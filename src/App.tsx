import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import DashboardLayout from './layouts/DashboardLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        } />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
