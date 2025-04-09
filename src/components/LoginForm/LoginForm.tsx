import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { login } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import styles from './LoginForm.module.css';

interface Errors {
  loginId?: string;
  password?: string;
}

export default function LoginForm() {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const dispatch = useAppDispatch();
  const { isLoading: isSubmitting, error: apiError, role } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (role) {
      if (role === 'admin') {
        navigate('/admin-dashboard');
      } else if (role === 'doctor') {
        navigate('/doctor-dashboard');
      }
    }
  }, [role, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Errors = {};

    if (!loginId) {
      newErrors.loginId = 'Email or phone is required';
    } else if (
      !/\S+@\S+\.\S+/.test(loginId) &&
      !/(\+?\d{1,3}[- ]?)?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}/.test(loginId)
    ) {
      newErrors.loginId = 'Invalid email or phone format';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      dispatch(login({ loginId, password }));
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="loginId">Email or Phone</label>
          <input
            type="text"
            id="loginId"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            className={`${styles.input} ${errors.loginId ? styles.error : ''}`}
            placeholder="user@example.com or 123-456-7890"
          />
          {errors.loginId && (
            <span className={styles.errorMessage}>{errors.loginId}</span>
          )}
        </div>
        {apiError && (
          <div className={styles.apiError}>
            {apiError}
          </div>
        )}

        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`${styles.input} ${errors.password ? styles.error : ''}`}
          />
          {errors.password && <span className={styles.errorMessage}>{errors.password}</span>}
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
