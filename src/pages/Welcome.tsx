import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/welcome.css'; // We'll create this file next

export default function WelcomePage() {
  const navigate = useNavigate();
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    // Set a timeout to mark the animation as complete after 3 seconds
    const animationTimer = setTimeout(() => {
      setAnimationComplete(true);
    }, 3000);

    // Set a timeout to navigate to the login page after 5 seconds
    const navigationTimer = setTimeout(() => {
      navigate('/login');
    }, 5000);

    // Clean up timers if component unmounts
    return () => {
      clearTimeout(animationTimer);
      clearTimeout(navigationTimer);
    };
  }, [navigate]);

  return (
    <div className="splash-container">
      <div className={`splash-content ${animationComplete ? 'fade-out' : ''}`}>
        <div className="logo-container">
          <div className="welcome-logo">HMS</div>
        </div>
        <h1 className="app-title">Hospital Management System</h1>
        <div className="loading-bar">
          <div className="loading-progress"></div>
        </div>
        <p className="tagline">Streamlining Healthcare Administration</p>
      </div>
    </div>
  );
}
