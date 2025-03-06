import React from "react";

const ApplicationDetailsModal = ({
  showDetailsModal,
  setShowDetailsModal,
  selectedApplication,
  handleAction,
}) => {
  return (
    <div className={`modal-overlay ${showDetailsModal ? "active" : ""}`}>
      <div className="modal-container details-modal">
        <div className="modal-header">
          <h2>Application Details</h2>
          <button className="close-modal-btn" onClick={() => setShowDetailsModal(false)}>
            ×
          </button>
        </div>

        <div className="modal-body">
          {selectedApplication && (
            <div className="details-content">
              <div className="details-section">
                <h3>Basic Information</h3>
                <div className="details-row">
                  <span className="details-label">Application ID:</span>
                  <span className="details-value">{selectedApplication.id}</span>
                </div>
                <div className="details-row">
                  <span className="details-label">Submission Date:</span>
                  <span className="details-value">{selectedApplication.date}</span>
                </div>
                <div className="details-row">
                  <span className="details-label">Status:</span>
                  <span className={`status-badge ${selectedApplication.status.toLowerCase().replace(" ", "-")}`}>
                    {selectedApplication.status}
                  </span>
                </div>
                <div className="details-row">
                  <span className="details-label">Priority:</span>
                  <span className={`priority-badge ${selectedApplication.priority.toLowerCase()}`}>
                    {selectedApplication.priority}
                  </span>
                </div>
              </div>

              <div className="details-section">
                <h3>Applicant Information</h3>
                <div className="details-row">
                  <span className="details-label">Name:</span>
                  <span className="details-value">{selectedApplication.userName}</span>
                </div>
                <div className="details-row">
                  <span className="details-label">Contact:</span>
                  <span className="details-value">+91 98765 43210</span>
                </div>
                <div className="details-row">
                  <span className="details-label">Email:</span>
                  <span className="details-value">
                    {selectedApplication.userName.toLowerCase().replace(" ", ".")}@example.com
                  </span>
                </div>
              </div>

              <div className="details-section">
                <h3>Property Information</h3>
                <div className="details-row">
                  <span className="details-label">Type:</span>
                  <span className="details-value">{selectedApplication.propertyType}</span>
                </div>
                <div className="details-row">
                  <span className="details-label">Address:</span>
                  <span className="details-value">{selectedApplication.address}</span>
                </div>
                <div className="details-row">
                  <span className="details-label">Area:</span>
                  <span className="details-value">2,500 sq. ft.</span>
                </div>
                <div className="details-row">
                  <span className="details-label">Floors:</span>
                  <span className="details-value">3</span>
                </div>
              </div>

              <div className="details-section">
                <h3>Fire Safety Measures</h3>
                <div className="details-row">
                  <span className="details-label">Fire Extinguishers:</span>
                  <span className="details-value">Yes (10)</span>
                </div>
                <div className="details-row">
                  <span className="details-label">Sprinkler System:</span>
                  <span className="details-value">Yes</span>
                </div>
                <div className="details-row">
                  <span className="details-label">Fire Alarm:</span>
                  <span className="details-value">Yes</span>
                </div>
                <div className="details-row">
                  <span className="details-label">Emergency Exits:</span>
                  <span className="details-value">Yes (2)</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          {selectedApplication && selectedApplication.status === "Pending" && (
            <>
              <button
                className="reject-btn"
                onClick={() => {
                  handleAction("reject", selectedApplication);
                  setShowDetailsModal(false);
                }}
              >
                Reject
              </button>
              <button
                className="assign-btn"
                onClick={() => {
                  setShowDetailsModal(false);
                  handleAction("assign", selectedApplication);
                }}
              >
                Assign Inspector
              </button>
              <button
                className="approve-btn"
                onClick={() => {
                  handleAction("approve", selectedApplication);
                  setShowDetailsModal(false);
                }}
              >
                Approve
              </button>
            </>
          )}
          <button className="close-btn" onClick={() => setShowDetailsModal(false)}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetailsModal;