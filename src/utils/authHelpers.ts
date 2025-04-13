import { Dispatch } from '@reduxjs/toolkit';
import { logout } from '../store/authSlice';
import { NavigateFunction } from 'react-router-dom';

const handleLogout = (dispatch: Dispatch, navigate: NavigateFunction) => {
  localStorage.removeItem('token'); // Remove the token
  dispatch(logout()); // Clear Redux store state
  navigate('/'); // Redirect to login page
};

export default handleLogout;

