import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { login } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import styles from "./LoginForm.module.css";

interface Errors {
  loginId?: string;
  password?: string;
}

export default function LoginForm() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const dispatch = useAppDispatch();
  const {
    isLoading: isSubmitting,
    error: apiError,
    role,
  } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (role) {
      if (role === "admin") {
        navigate("/admin-dashboard");
      } else if (role === "doctor") {
        navigate("/doctor-dashboard");
      }
    }
  }, [role, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Errors = {};

    if (!loginId) {
      newErrors.loginId = "Email or phone is required";
    } else if (
      !/\S+@\S+\.\S+/.test(loginId) &&
      !/(\+?\d{1,3}[- ]?)?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}/.test(loginId)
    ) {
      newErrors.loginId = "Invalid email or phone format";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      dispatch(login({ loginId, password }));
      setErrors({});
    }
  };

  return (
    <div className="topWrapper">
    <div className="wrapperLogin">
      <h1>Login</h1>
      <p id="error-message"></p>
      <form id="form" onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label htmlFor="loginId">
            <span>@</span>
          </label>
          <input
            type="text"
            id="loginId"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            className={`${styles.input} ${errors.loginId ? styles.error : ""}`}
            placeholder="email or mobile number"
          />
        </div>
        <div>
          <label htmlFor="password">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
            >
              <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm240-200q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80Z" />
            </svg>
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`${styles.input} ${errors.password ? styles.error : ""}`}
          />
        </div>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>

        {apiError && (
        <div className="error-notice">
          <div className="oaerror danger">
            <strong>Error</strong>- {apiError}
          </div>
        </div>
      )}
       {(errors.loginId || errors.password)  &&  (
        <div className="error-notice">
          <div className="oaerror danger">
            <strong>Error</strong>- Please enter the login details!
          </div>
        </div>
      )}
      </form>
      <p>
      <a href="signup.html">Forgot password?</a>
      </p>
    </div>
    </div>
  );
}
