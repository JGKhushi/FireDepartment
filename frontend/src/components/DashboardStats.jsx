import React from "react";

const DashboardStats = ({ stats }) => {
  return (
    <div className="stats-container">
      <div className="stat-card">
        <div className="stat-icon pending">📋</div>
        <div className="stat-details">
          <h3>Pending</h3>
          <div className="stat-value">{stats.pending}</div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon review">🔍</div>
        <div className="stat-details">
          <h3>Under Review</h3>
          <div className="stat-value">{stats.underReview}</div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon approved">✅</div>
        <div className="stat-details">
          <h3>Approved</h3>
          <div className="stat-value">{stats.approved}</div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon rejected">❌</div>
        <div className="stat-details">
          <h3>Rejected</h3>
          <div className="stat-value">{stats.rejected}</div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon high-priority">🔥</div>
        <div className="stat-details">
          <h3>High Priority</h3>
          <div className="stat-value">{stats.highPriority}</div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon total">📊</div>
        <div className="stat-details">
          <h3>Total</h3>
          <div className="stat-value">{stats.totalApplications}</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;