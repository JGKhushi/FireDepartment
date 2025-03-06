
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "user", // Default to 'user'
    // mobileNumber: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const validateMobileNumber = (mobileNumber) => {
    // Basic validation for mobile number (10 digits)
    return /^\d{10}$/.test(mobileNumber);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { fullName, email, password, confirmPassword, userType, mobileNumber } = formData;
  
    // Validate all fields
    if (!fullName || !email || !password || !confirmPassword || !userType || !mobileNumber) {
      setError("All fields are required.");
      return;
    }
  
    // Validate password length
    if (!validatePassword(password)) {
      setError("Password must be at least 6 characters.");
      return;
    }
  
    // Validate password match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
  
    // Validate mobile number
    if (!validateMobileNumber(mobileNumber)) {
      setError("Mobile number must be 10 digits.");
      return;
    }
  
    // Clear errors
    setError("");
  
    try {
      // Send a POST request to the backend
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fullName, // Ensure the field names match the backend
          email,
          password,
          mobile: mobileNumber,
          role: userType,
        }),
      });
  
      // Parse the response
      const data = await response.json();
  
      // Handle the response from the backend
      if (!response.ok) {
        // If the response is not OK, display the error message from the backend
        setError(data.message || "Registration failed. Please try again.");
      } else {
        // If the response is OK, log the success message or redirect the user
        console.log("Registration successful:", data);
        navigate("/login"); // Redirect to the login page
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error during registration:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Register</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email */}
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
          </div>

{/* Mobile Number */}
          <div className="input-group">
            <label>Mobile Number</label>
            <input
              type="text"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              placeholder="Enter your mobile number"
              required
            />
          </div>
          {/* User Type */}
          <div className="input-group">
            <label>User Type</label>
            <select
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Submit Button */}
          <button type="submit" className="register-button">
            Register
          </button>
        </form>

        {/* Login Link */}
        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;


