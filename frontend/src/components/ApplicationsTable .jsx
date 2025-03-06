import React from "react";

const ApplicationsTable = ({
  applications,
  handleAction,
  sortBy,
  sortOrder,
  setSortBy,
  setSortOrder,
  filterStatus,
  setFilterStatus,
}) => {
  const handleSortChange = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  return (
    <div className="table-container">
      <div className="table-actions">
        <div className="filter-controls">
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="status-filter">
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="under review">Under Review</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <table className="applications-table">
        <thead>
          <tr>
            <th onClick={() => handleSortChange("id")}>
              Application ID
              {sortBy === "id" && <span className="sort-indicator">{sortOrder === "asc" ? "↑" : "↓"}</span>}
            </th>
            <th>User Name</th>
            <th>Property Type</th>
            <th>Status</th>
            <th onClick={() => handleSortChange("priority")}>
              Priority
              {sortBy === "priority" && <span className="sort-indicator">{sortOrder === "asc" ? "↑" : "↓"}</span>}
            </th>
            <th onClick={() => handleSortChange("date")}>
              Date
              {sortBy === "date" && <span className="sort-indicator">{sortOrder === "asc" ? "↑" : "↓"}</span>}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.length > 0 ? (
            applications.map((application) => (
              <tr key={application.id}>
                <td>{application.id}</td>
                <td>{application.userName}</td>
                <td>{application.propertyType}</td>
                <td>
                  <span className={`status-badge ${application.status.toLowerCase().replace(" ", "-")}`}>
                    {application.status}
                  </span>
                </td>
                <td>
                  <span className={`priority-badge ${application.priority.toLowerCase()}`}>{application.priority}</span>
                </td>
                <td>{application.date}</td>
                <td className="actions-cell">
                  <div className="action-buttons">
                    <button
                      className="action-btn view-btn"
                      onClick={() => handleAction("details", application)}
                      title="View Details"
                    >
                      👁️
                    </button>

                    {application.status === "Pending" && (
                      <>
                        <button
                          className="action-btn approve-btn"
                          onClick={() => handleAction("approve", application)}
                          title="Approve"
                        >
                          ✅
                        </button>
                        <button
                          className="action-btn reject-btn"
                          onClick={() => handleAction("reject", application)}
                          title="Reject"
                        >
                          ❌
                        </button>
                        <button
                          className="action-btn assign-btn"
                          onClick={() => handleAction("assign", application)}
                          title="Assign Inspector"
                        >
                          👨‍🚒
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="no-data">
                No applications found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationsTable;