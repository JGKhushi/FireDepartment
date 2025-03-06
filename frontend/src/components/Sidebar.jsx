import React from "react";

const Sidebar = ({ activeSection, setActiveSection, sidebarCollapsed, setSidebarCollapsed }) => {
  return (
    <div className={`sidebar ${sidebarCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-icon">🔥</span>
          {!sidebarCollapsed && <span className="logo-text">Fire NOC Admin</span>}
        </div>
        <button className="collapse-btn" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
          {sidebarCollapsed ? "→" : "←"}
        </button>
      </div>

      <nav className="sidebar-nav">
        <ul>
          <li className={activeSection === "dashboard" ? "active" : ""}>
            <a href="#" onClick={() => setActiveSection("dashboard")}>
              <span className="nav-icon">📊</span>
              {!sidebarCollapsed && <span>Dashboard</span>}
            </a>
          </li>
          <li className={activeSection === "pending" ? "active" : ""}>
            <a href="#" onClick={() => setActiveSection("pending")}>
              <span className="nav-icon">📋</span>
              {!sidebarCollapsed && <span>Pending Applications</span>}
            </a>
          </li>
          <li className={activeSection === "inspections" ? "active" : ""}>
            <a href="#" onClick={() => setActiveSection("inspections")}>
              <span className="nav-icon">🔍</span>
              {!sidebarCollapsed && <span>Inspections</span>}
            </a>
          </li>
          <li className={activeSection === "approved" ? "active" : ""}>
            <a href="#" onClick={() => setActiveSection("approved")}>
              <span className="nav-icon">✅</span>
              {!sidebarCollapsed && <span>Approved NOCs</span>}
            </a>
          </li>
          <li className={activeSection === "settings" ? "active" : ""}>
            <a href="#" onClick={() => setActiveSection("settings")}>
              <span className="nav-icon">⚙️</span>
              {!sidebarCollapsed && <span>Settings</span>}
            </a>
          </li>
        </ul>
      </nav>

      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">👨‍🚒</div>
          {!sidebarCollapsed && (
            <div className="user-details">
              <div className="user-name">Admin User</div>
              <div className="user-role">Fire Safety Officer</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;