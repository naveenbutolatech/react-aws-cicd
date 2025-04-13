import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import handleLogout from '../utils/authHelpers';
import '../assets/css/header.css';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogoutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    handleLogout(dispatch, navigate);
  };

  return (
    <header className="main-header">
      <div className="header-container">
        <div className="logo-container">
          <Link to="/" className="logo">
            HMS
          </Link>
        </div>
        
        <nav className="main-nav">
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
        
        <div className="user-actions">
          <ul className="nav-links">
            <li>
              <Link to="/profile" className="profile-link">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                  <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z"/>
                </svg>
                <span>Profile</span>
              </Link>
            </li>
            <li>
              <a href="#" onClick={handleLogoutClick} className="logout-link">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                  <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/>
                </svg>
                <span>Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;

