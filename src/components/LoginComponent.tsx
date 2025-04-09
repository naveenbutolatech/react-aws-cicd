import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';// Ensure this path is correct
import { login } from '../store/authSlice'; // Fix the import of login action

const LoginComponent = () => {
const dispatch = useDispatch<AppDispatch>(); // Ensure dispatch is correctly typed
const error = useSelector((state: RootState) => state.auth.error);
const [loginId, setLoginId] = React.useState('');
const [password, setPassword] = React.useState('');

  // Example usage of dispatch and state hooks, if applicable to avoid "unused" error
  const handleLogin = async () => {
    dispatch(login({ loginId, password }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin(); // Ensure method called on submit
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Login ID"
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <div className="error-message">{error}</div>}
        </form>
    </div>
  );
};

export default LoginComponent;
