import React from "react";

const AssignInspectorModal = ({
  showAssignModal,
  setShowAssignModal,
  selectedApplication,
  assignmentData,
  setAssignmentData,
  inspectors,
  handleAssignInspector,
}) => {
  return (
    <div className={`modal-overlay ${showAssignModal ? "active" : ""}`}>
      <div className="modal-container">
        <div className="modal-header">
          <h2>Assign Inspector</h2>
          <button className="close-modal-btn" onClick={() => setShowAssignModal(false)}>
            ×
          </button>
        </div>

        <div className="modal-body">
          {selectedApplication && (
            <div className="application-info">
              <p>
                <strong>Application ID:</strong> {selectedApplication.id}
              </p>
              <p>
                <strong>User:</strong> {selectedApplication.userName}
              </p>
              <p>
                <strong>Property Type:</strong> {selectedApplication.propertyType}
              </p>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="inspector">Select Inspector:</label>
            <select
              id="inspector"
              value={assignmentData.inspectorId}
              onChange={(e) => setAssignmentData({ ...assignmentData, inspectorId: e.target.value })}
              className="form-control"
            >
              <option value="">-- Select an Inspector --</option>
              {inspectors
                .filter((inspector) => inspector.availability === "Available")
                .map((inspector) => (
                  <option key={inspector.id} value={inspector.id}>
                    {inspector.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="date">Inspection Date:</label>
            <input
              type="date"
              id="date"
              value={assignmentData.date}
              onChange={(e) => setAssignmentData({ ...assignmentData, date: e.target.value })}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="time">Inspection Time:</label>
            <input
              type="time"
              id="time"
              value={assignmentData.time}
              onChange={(e) => setAssignmentData({ ...assignmentData, time: e.target.value })}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="comments">Additional Comments:</label>
            <textarea
              id="comments"
              value={assignmentData.comments}
              onChange={(e) => setAssignmentData({ ...assignmentData, comments: e.target.value })}
              className="form-control"
              rows="3"
            ></textarea>
          </div>
        </div>

        <div className="modal-footer">
          <button className="cancel-btn" onClick={() => setShowAssignModal(false)}>
            Cancel
          </button>
          <button
            className="assign-btn"
            onClick={handleAssignInspector}
            disabled={!assignmentData.inspectorId || !assignmentData.date}
          >
            Assign Inspector
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignInspectorModal;