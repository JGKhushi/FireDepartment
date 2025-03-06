import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Quick Links */}
        <div className="footer-section">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-links">
            <li>
              <Link to="/" className="footer-link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/apply-noc" className="footer-link">
                Apply for NOC
              </Link>
            </li>
            {/* <li>
              <Link to="/track-application" className="footer-link">
                Track Application
              </Link>
            </li> */}
            <li>
              <Link to="/contact" className="footer-link">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="footer-section">
          <h3 className="footer-heading">Contact Us</h3>
          <ul className="footer-contact">
            <li>📞 Emergency Helpline: 1800-XXX-XXXX</li>
            <li>📧 Email: support@firedepartment.gov</li>
            <li>📍 Address: Fire Department HQ, City, Country</li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="footer-section">
          <h3 className="footer-heading">Follow Us</h3>
          <ul className="footer-social">
            <li>
              <a href="https://www.facebook.com/" className="footer-link">
                Facebook
              </a>
            </li>
            <li>
              <a href="https://x.com/?lang=en" className="footer-link">
                Twitter
              </a>
            </li>
            <li>
              <a href="https://in.linkedin.com/" className="footer-link">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div className="footer-section">
          <h3 className="footer-heading">Legal</h3>
          <ul className="footer-links">
            <li>
              <Link to="/privacy-policy" className="footer-link">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms-of-service" className="footer-link">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Notice */}
      <div className="footer-copyright">
        <p className="footer-copyright-text">
          © {new Date().getFullYear()} Fire Department. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;