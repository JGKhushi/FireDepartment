import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token) {
      setIsLoggedIn(true);
      setUserRole(role);
    } else {
      setIsLoggedIn(false);
      setUserRole(null);
    }
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    setUserRole(null);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">
            <img src={logo} alt="Fire Department Logo" />
          </Link>
        </div>

        <div className="navbar-mobile-menu" onClick={toggleMenu}>
          <div className={`menu-icon ${isMenuOpen ? "open" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
          <Link to="/" className="navbar-link">
            Home
          </Link>
          <Link to="/apply-noc" className="navbar-link">
            Apply for NOC
          </Link>
          <Link to="/contact" className="navbar-link">
            Contact Us
          </Link>

          {isLoggedIn && (
            <Link
              to={userRole === "admin" ? "/admin-dashboard" : "/user-dashboard"}
              className="navbar-link"
            >
              Dashboard
            </Link>
          )}

          {isLoggedIn ? (
            <button onClick={handleLogout} className="navbar-link logout-button">
              Logout
            </button>
          ) : (
            <Link to="/login" className="navbar-link">
              Login
            </Link>
          )}
        </div>

        <div className="navbar-emergency">
          <Link to="/emergency-contact" className="emergency-button">
            Emergency Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;