import React from "react";

const Header = ({
  activeSection,
  searchTerm,
  setSearchTerm,
  notifications,
  showNotifications,
  setShowNotifications,
  markAllNotificationsAsRead,
}) => {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="dashboard-header">
      <div className="page-title">
        {activeSection === "dashboard" && "Dashboard Overview"}
        {activeSection === "pending" && "Pending Applications"}
        {activeSection === "inspections" && "Inspection Management"}
        {activeSection === "approved" && "Approved NOCs"}
        {activeSection === "settings" && "System Settings"}
      </div>

      <div className="header-actions">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search applications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="notification-container">
          <button className="notification-btn" onClick={() => setShowNotifications(!showNotifications)}>
            🔔{unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
          </button>

          {showNotifications && (
            <div className="notification-dropdown">
              <div className="notification-header">
                <h3>Notifications</h3>
                <button className="mark-read-btn" onClick={markAllNotificationsAsRead}>
                  Mark all as read
                </button>
              </div>

              <div className="notification-list">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div key={notification.id} className={`notification-item ${!notification.read ? "unread" : ""}`}>
                      <div className="notification-content">
                        <p>{notification.message}</p>
                        <span className="notification-time">{notification.time}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-notifications">No notifications</div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="user-menu">
          <span className="user-greeting">Welcome, Admin</span>
          <button className="logout-btn">Logout</button>
        </div>
      </div>
    </header>
  );
};

export default Header;