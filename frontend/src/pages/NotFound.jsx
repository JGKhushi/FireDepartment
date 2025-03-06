import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="not-found-content">
        <h1 className="not-found-heading">404</h1>
        <p className="not-found-text">Oops! The page you're looking for doesn't exist.</p>
        <Link to="/" className="not-found-button">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;