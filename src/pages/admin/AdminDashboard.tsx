import { useState, useEffect } from 'react';
import '../../assets/css/admin-dashboard.css';
import DoctorPatientRatioChart from '../../components/charts/DoctorPatientRatioChart';


// Sample data - in a real application, this would come from an API
interface DashboardStats {
  hospitals: number;
  patients: number;
  doctors: number;
  appointments: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    hospitals: 0,
    patients: 0,
    doctors: 0,
    appointments: 0
  });
  
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulating data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        hospitals: 12,
        patients: 3548,
        doctors: 284,
        appointments: 856
      });
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="wrapper-right-dashboard">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <p>Welcome to the HMS Admin Dashboard</p>
        </div>
        
        <div className="dashboard-stats">
          {/* Hospital Stats Card */}
          <div className="stat-card">
            <div className="stat-card-header">
              <div className="stat-card-icon icon-blue">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#5e63ff">
                  <path d="M19 7H11V5.82C11.5 5.4 12 4.94 12 4C12 2.9 11.1 2 10 2S8 2.9 8 4C8 4.94 8.5 5.4 9 5.82V7H5C3.34 7 2 8.34 2 10V22H22V10C22 8.34 20.66 7 19 7ZM4 20V10C4 9.45 4.45 9 5 9H19C19.55 9 20 9.45 20 10V20H15V14H9V20H4ZM11 12H13V14H11V12ZM7 16H9V18H7V16ZM15 16H17V18H15V16Z" />
                </svg>
              </div>
            </div>
            <div className="stat-card-title">Hospitals</div>
            {isLoading ? (
              <div className="stat-card-value">Loading...</div>
            ) : (
              <>
                <div className="stat-card-value">{stats.hospitals}</div>
                <div className="stat-card-change change-up">
                  <span>+2 this month</span>
                </div>
              </>
            )}
          </div>
          
          {/* Patients Stats Card */}
          <div className="stat-card">
            <div className="stat-card-header">
              <div className="stat-card-icon icon-green">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#49a598">
                  <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 6C13.1 6 14 6.9 14 8C14 9.1 13.1 10 12 10C10.9 10 10 9.1 10 8C10 6.9 10.9 6 12 6ZM12 13C9.33 13 4 14.34 4 17V20H20V17C20 14.34 14.67 13 12 13ZM18 18H6V17.01C6.2 16.29 9.3 15 12 15C14.7 15 17.8 16.29 18 17V18Z" />
                </svg>
              </div>
            </div>
            <div className="stat-card-title">Patients</div>
            {isLoading ? (
              <div className="stat-card-value">Loading...</div>
            ) : (
              <>
                <div className="stat-card-value">{stats.patients}</div>
                <div className="stat-card-change change-up">
                  <span>+124 this month</span>
                </div>
              </>
            )}
          </div>
          
          {/* Doctors Stats Card */}
          <div className="stat-card">
            <div className="stat-card-header">
              <div className="stat-card-icon icon-orange">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ff9f43">
                  <path d="M20 6H16V4C16 2.9 15.1 2 14 2H10C8.9 2 8 2.9 8 4V6H4C2.9 6 2 6.9 2 8V20C2 21.1 2.9 22 4 22H20C21.1 22 22 21.1 22 20V8C22 6.9 21.1 6 20 6ZM10 4H14V6H10V4ZM20 20H4V8H20V20ZM13 10H11V12H9V14H11V16H13V14H15V12H13V10Z" />
                </svg>
              </div>
            </div>
            <div className="stat-card-title">Doctors</div>
            {isLoading ? (
              <div className="stat-card-value">Loading...</div>
            ) : (
              <>
                <div className="stat-card-value">{stats.doctors}</div>
                <div className="stat-card-change change-up">
                  <span>+8 this month</span>
                </div>
              </>
            )}
          </div>
          
          {/* Appointments Stats Card */}
          <div className="stat-card">
            <div className="stat-card-header">
              <div className="stat-card-icon icon-purple">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#9b51e0">
                  <path d="M19 3H18V1H16V3H8V1H6V3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V9H19V19ZM19 7H5V5H19V7ZM7 11H12V16H7V11Z" />
                </svg>
              </div>
            </div>
            <div className="stat-card-title">Appointments</div>
            {isLoading ? (
              <div className="stat-card-value">Loading...</div>
            ) : (
              <>
                <div className="stat-card-value">{stats.appointments}</div>
                <div className="stat-card-change change-up">
                  <span>+32 this week</span>
                </div>
              </>
            )}
          </div>
        </div>
        
        {/* Recent Activity Section */}
        <div className="recent-activity">
          <h2 className="section-title">Recent Activity</h2>
          <p>No recent activities to display.</p>
        </div>
        
        {/* Chart Section */}
        <div className="chart-container">
          {isLoading ? (
            <div className="chart-placeholder">
              <p>Loading chart data...</p>
            </div>
          ) : (
            <DoctorPatientRatioChart 
              doctors={stats.doctors} 
              appointments={stats.appointments} 
            />
          )}
        </div>
      </div>
    </div>
  );
}
