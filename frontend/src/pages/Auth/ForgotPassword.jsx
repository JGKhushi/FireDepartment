import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    if (!email.trim()) {
      setMessage("Please enter your email.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/users/forgot-password", { email });

      if (response.data.message) {
        setMessage(response.data.message);
      } else {
        setMessage("A password reset link has been sent to your email.");
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message || "Something went wrong. Please try again.");
      } else if (error.request) {
        setMessage("No response from the server. Please check your connection.");
      } else {
        setMessage("An error occurred. Please try again.");
      }
    }

    setLoading(false);
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h2>Forgot Password</h2>
        <p className="forgot-description">Enter your registered email to receive a password reset link.</p>

        {message && <p className="response-message">{message}</p>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <button type="submit" className="forgot-button" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <div className="back-to-login">
          <Link to="/login" className="back-link">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;