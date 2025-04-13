import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { registerHospital } from "../../store/hospitalRegistrationSlice";
import "../../assets/css/login.css";

interface HospitalFormData {
  firstname: string;
  email: string;
  phonenumber: string;
  status: string;
  role: string;
  password: string;
  address: string;
}

interface FormErrors {
  firstname?: string;
  email?: string;
  phonenumber?: string;
  password?: string;
  address?: string;
}

export default function HospitalRegistration() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, success, error } = useAppSelector(
    (state) => state.hospitalRegistration
  );

  const [formData, setFormData] = useState<HospitalFormData>({
    firstname: "",
    email: "",
    phonenumber: "",
    status: "active",
    role: "hospital",
    password: "",
    address: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (success) {
      navigate("/hospital-listing");
    }
  }, [success, navigate]);

  useEffect(() => {
    if (error) {
      setIsSubmitting(false);
    }
  }, [error]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstname.trim()) {
      newErrors.firstname = "Hospital name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phonenumber.trim()) {
      newErrors.phonenumber = "Phone number is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (validateForm()) {
      await dispatch(registerHospital(formData));
    }
    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev: HospitalFormData) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="wrapper-right-dashboard">
      <h1>Hospital Registration</h1>

      {error && (
        <div className="error-notice">
          <div className="oaerror danger">
            <strong>Error</strong> - {error}
          </div>
        </div>
      )}

      {Object.keys(errors).length > 0 && (
        <div className="error-notice">
          <div className="oaerror warning">
            <strong>Validation Error</strong> <h5>Please correct the errors below.</h5>
            <ul>
              {Object.values(errors).map(
                (error, index) => error && <li key={index}>{error}</li>
              )}
            </ul>
          </div>
        </div>
      )}

      <form id="form" onSubmit={handleSubmit}>
        <div className={`form-group ${errors.firstname ? "incorrect" : ""}`}>
          <label htmlFor="firstname-input">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
            >
              <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z" />
            </svg>
          </label>
          <input
            type="text"
            name="firstname"
            id="firstname-input"
            placeholder="Hospital Name"
            value={formData.firstname}
            onChange={handleChange}
          />
        </div>

        <div className={`form-group ${errors.email ? "incorrect" : ""}`}>
          <label htmlFor="email-input">
            <span>@</span>
          </label>
          <input
            type="email"
            name="email"
            id="email-input"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className={`form-group ${errors.phonenumber ? "incorrect" : ""}`}>
          <label htmlFor="phone-input">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
            >
              <path d="M798-120q-125 0-247-58.5T329-329Q229-429 170.5-551T112-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12Z" />
            </svg>
          </label>
          <input
            type="tel"
            name="phonenumber"
            id="phone-input"
            placeholder="Phone Number"
            value={formData.phonenumber}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="status-input">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
            >
              <path d="M480-120q-138 0-240.5-91T120-440q0-138 102.5-229T480-760q138 0 240.5 91T823-440q0 138-102.5 229T480-120Zm0-60q29 0 51-20t22-49q0-29-22-49t-51-20q-29 0-51 20t-22 49q0 29 22 49t51 20ZM380-360h200v-60H380v60Zm0-120h200v-60H380v60Zm0-120h200v-60H380v60Z" />
            </svg>
          </label>
          <select
            name="status"
            id="status-input"
            value={formData.status}
            onChange={handleChange}
            style={{
              width: "100%",
              height: "50px",
              padding: "0 1em",
              borderRadius: "0 10px 10px 0",
              border: "2px solid var(--accent-color)",
              borderLeft: "none",
              fontFamily: "inherit",
            }}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        <div className={`form-group ${errors.password ? "incorrect" : ""}`}>
          <label htmlFor="password-input">
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
            name="password"
            id="password-input"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className={`form-group ${errors.address ? "incorrect" : ""}`}>
          <label htmlFor="address-input">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
            >
              <path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480ZM240-240h480v-66q0-24-13.5-44T670-380q-32-20-71-30t-119-10q-80 0-119 10t-71 30q-23 14-36.5 34T240-306v66Zm-80 80v-160q0-35 18-63.5t50-42.5q47-28 118-43t134-15q63 0 134 15t118 43q32 14 50 42.5t18 63.5v160H160Zm160-400q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47q-66 0-113-47t-47-113Zm160 0Zm0 320Z" />
            </svg>
          </label>
          <textarea
            name="address"
            id="address-input"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            style={{
              width: "100%",
              minHeight: "100px",
              padding: "1em",
              borderRadius: "0 10px 10px 0",
              border: "2px solid var(--accent-color)",
              borderLeft: "none",
              fontFamily: "inherit",
              resize: "vertical",
            }}
          ></textarea>
        </div>

        <button type="submit" disabled={isSubmitting || isLoading}>
          {isSubmitting || isLoading ? "Registering..." : "Register Hospital"}
        </button>

        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate("/admin-dashboard");
          }}
          className="back-link"
        >
          Back to Dashboard
        </a>
      </form>
    </div>
  );
}
