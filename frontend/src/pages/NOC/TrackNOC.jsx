import React, { useState } from "react";
import "./TrackNOC.css";

const TrackNOC = () => {
  const [applications, setApplications] = useState([
    { id: "NOC-2024001", property: "Commercial", status: "Pending", updated: "2 days ago" },
    { id: "NOC-2024002", property: "Residential", status: "Under Review", updated: "1 day ago" },
    { id: "NOC-2024003", property: "Industrial", status: "Approved", updated: "4 hours ago" },
  ]);

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "status-pending";
      case "Under Review":
        return "status-review";
      case "Approved":
        return "status-approved";
      default:
        return "";
    }
  };

  return (
    <div className="tracknoc-container">
      <h2 className="tracknoc-title">📍 Track Your NOC Application</h2>
      <table className="tracknoc-table">
        <thead>
          <tr>
            <th>Application ID</th>
            <th>Property Type</th>
            <th>Status</th>
            <th>Last Updated</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app.id} className="fade-in">
              <td>{app.id}</td>
              <td>{app.property}</td>
              <td className={getStatusClass(app.status)}>{app.status}</td>
              <td>{app.updated}</td>
              <td>
                {app.status === "Approved" ? (
                  <button className="download-btn">Download NOC</button>
                ) : (
                  <button className="view-btn">View Details</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrackNOC;
