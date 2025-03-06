import React from "react";

const Settings = () => {
  return (
    <div className="settings-container">
      <div className="settings-section">
        <h2>System Settings</h2>

        {/* Notification Preferences */}
        <div className="settings-card">
          <h3>Notification Preferences</h3>
          <div className="settings-option">
            <label className="toggle-switch">
              <input type="checkbox" defaultChecked />
              <span className="toggle-slider"></span>
            </label>
            <span className="option-label">Email notifications for new applications</span>
          </div>

          <div className="settings-option">
            <label className="toggle-switch">
              <input type="checkbox" defaultChecked />
              <span className="toggle-slider"></span>
            </label>
            <span className="option-label">SMS alerts for high priority applications</span>
          </div>

          <div className="settings-option">
            <label className="toggle-switch">
              <input type="checkbox" />
              <span className="toggle-slider"></span>
            </label>
            <span className="option-label">Daily summary reports</span>
          </div>
        </div>

        {/* User Management */}
        <div className="settings-card">
          <h3>User Management</h3>
          <div className="user-management-controls">
            <button className="settings-btn">Add New Admin</button>
            <button className="settings-btn">Manage Inspectors</button>
            <button className="settings-btn">View User Roles</button>
          </div>
        </div>

        {/* Application Settings */}
        <div className="settings-card">
          <h3>Application Settings</h3>
          <div className="settings-option">
            <label className="toggle-switch">
              <input type="checkbox" defaultChecked />
              <span className="toggle-slider"></span>
            </label>
            <span className="option-label">Auto-assign inspectors based on location</span>
          </div>

          <div className="settings-option">
            <label className="toggle-switch">
              <input type="checkbox" />
              <span className="toggle-slider"></span>
            </label>
            <span className="option-label">Enable fast-track for priority applications</span>
          </div>

          <div className="form-group">
            <label>Default inspection scheduling window (days):</label>
            <input type="number" className="form-control" defaultValue="7" min="1" max="30" />
          </div>
        </div>

        {/* System Maintenance */}
        <div className="settings-card">
          <h3>System Maintenance</h3>
          <div className="maintenance-controls">
            <button className="settings-btn">Backup Database</button>
            <button className="settings-btn">View System Logs</button>
            <button className="settings-btn danger">Clear Cache</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;