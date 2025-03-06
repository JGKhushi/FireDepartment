"use client"

import { useState, useEffect } from "react"
import {
  Home,
  FileText,
  Calendar,
  CheckSquare,
  Settings,
  Bell,
  Search,
  ChevronDown,
  Menu,
  X,
  User,
  LogOut,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Download,
} from "lucide-react"
import "./AdminDashboard.css"

const AdminDashboard = () => {
  // State management
  const [activeMenuItem, setActiveMenuItem] = useState("pending")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [selectedApplication, setSelectedApplication] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("date")
  const [sortOrder, setSortOrder] = useState("desc")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterPriority, setFilterPriority] = useState("all")
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  // Sample data for applications
  const [applications, setApplications] = useState([
    {
      id: "NOC-2024001",
      userName: "John Doe",
      propertyType: "Commercial",
      status: "pending",
      priority: "high",
      date: "2024-03-01",
      address: "123 Business Park, Central Avenue",
      contactNumber: "+91 9876543210",
      email: "john.doe@example.com",
      documents: ["floor-plan.pdf", "fire-safety-equipment.pdf"],
    },
    // ... other application objects
  ])

  // Sample data for inspectors
  const inspectors = [
    { id: 1, name: "Inspector Vikram Singh", availability: "Available", expertise: "Commercial" },
    // ... other inspector objects
  ]

  // Sample notifications
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New NOC application submitted: NOC-2024006", time: "10 minutes ago", read: false },
    // ... other notification objects
  ])

  // Form state for inspector assignment
  const [inspectionForm, setInspectionForm] = useState({
    inspectorId: "",
    date: "",
    time: "",
    comments: "",
  })

  // Handle window resize for responsive design
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (mobile) setSidebarOpen(false)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Filter and sort applications
  const filteredApplications = applications
    .filter((app) => {
      const matchesSearch =
        searchTerm === "" ||
        app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.userName.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = filterStatus === "all" || app.status === filterStatus
      const matchesPriority = filterPriority === "all" || app.priority === filterPriority

      return matchesSearch && matchesStatus && matchesPriority
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return sortOrder === "asc" ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date)
      } else if (sortBy === "priority") {
        const priorityOrder = { high: 3, medium: 2, low: 1 }
        return sortOrder === "asc"
          ? priorityOrder[a.priority] - priorityOrder[b.priority]
          : priorityOrder[b.priority] - priorityOrder[a.priority]
      } else if (sortBy === "status") {
        const statusOrder = { pending: 3, review: 2, approved: 1, rejected: 0 }
        return sortOrder === "asc"
          ? statusOrder[a.status] - statusOrder[b.status]
          : statusOrder[b.status] - statusOrder[a.status]
      }
      return 0
    })

  // Handle application actions
  const handleApprove = (appId) => {
    setApplications(applications.map((app) => (app.id === appId ? { ...app, status: "approved" } : app)))
    addNotification(`${appId} has been approved`)
  }

  const handleReject = (appId) => {
    setApplications(applications.map((app) => (app.id === appId ? { ...app, status: "rejected" } : app)))
    addNotification(`${appId} has been rejected`)
  }

  const handleAssignInspector = (appId) => {
    setSelectedApplication(applications.find((app) => app.id === appId))
    setModalOpen(true)
  }

  const submitInspectionAssignment = () => {
    if (!inspectionForm.inspectorId || !inspectionForm.date || !inspectionForm.time) {
      alert("Please fill all required fields")
      return
    }

    setApplications(applications.map((app) => (app.id === selectedApplication.id ? { ...app, status: "review" } : app)))

    const inspector = inspectors.find((insp) => insp.id === Number.parseInt(inspectionForm.inspectorId))
    addNotification(`Inspector ${inspector.name} assigned to ${selectedApplication.id}`)

    setModalOpen(false)
    setInspectionForm({
      inspectorId: "",
      date: "",
      time: "",
      comments: "",
    })
  }

  // Add a new notification
  const addNotification = (message) => {
    const newNotification = {
      id: notifications.length + 1,
      message,
      time: "Just now",
      read: false,
    }
    setNotifications([newNotification, ...notifications])
  }

  // Mark all notifications as read
  const markAllNotificationsAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, read: true })))
  }

  // Get unread notifications count
  const unreadCount = notifications.filter((n) => !n.read).length

  // Status badge component
  const StatusBadge = ({ status }) => {
    let badgeClass = "status-badge"
    let icon = null

    switch (status) {
      case "pending":
        badgeClass += " status-pending"
        icon = <Clock size={14} />
        break
      case "review":
        badgeClass += " status-review"
        icon = <AlertTriangle size={14} />
        break
      case "approved":
        badgeClass += " status-approved"
        icon = <CheckCircle size={14} />
        break
      case "rejected":
        badgeClass += " status-rejected"
        icon = <XCircle size={14} />
        break
      default:
        break
    }

    return (
      <span className={badgeClass}>
        {icon}
        <span>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
      </span>
    )
  }

  // Priority badge component
  const PriorityBadge = ({ priority }) => {
    let badgeClass = "priority-badge"

    switch (priority) {
      case "high":
        badgeClass += " priority-high"
        break
      case "medium":
        badgeClass += " priority-medium"
        break
      case "low":
        badgeClass += " priority-low"
        break
      default:
        break
    }

    return <span className={badgeClass}>{priority.charAt(0).toUpperCase() + priority.slice(1)}</span>
  }

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <div className="logo">
            <AlertTriangle size={24} />
            <h2>Fire NOC</h2>
          </div>
          {isMobile && (
            <button className="close-sidebar" onClick={() => setSidebarOpen(false)}>
              <X size={24} />
            </button>
          )}
        </div>

        <nav className="sidebar-nav">
          <ul>
            <li className={activeMenuItem === "dashboard" ? "active" : ""}>
              <button onClick={() => setActiveMenuItem("dashboard")}>
                <Home size={20} />
                <span>Dashboard</span>
              </button>
            </li>
            <li className={activeMenuItem === "pending" ? "active" : ""}>
              <button onClick={() => setActiveMenuItem("pending")}>
                <FileText size={20} />
                <span>Pending Applications</span>
              </button>
            </li>
            <li className={activeMenuItem === "inspections" ? "active" : ""}>
              <button onClick={() => setActiveMenuItem("inspections")}>
                <Calendar size={20} />
                <span>Inspections</span>
              </button>
            </li>
            <li className={activeMenuItem === "approved" ? "active" : ""}>
              <button onClick={() => setActiveMenuItem("approved")}>
                <CheckSquare size={20} />
                <span>Approved NOCs</span>
              </button>
            </li>
            <li className={activeMenuItem === "settings" ? "active" : ""}>
              <button onClick={() => setActiveMenuItem("settings")}>
                <Settings size={20} />
                <span>System Settings</span>
              </button>
            </li>
          </ul>
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="avatar">AD</div>
            <div className="user-details">
              <p className="user-name">Admin User</p>
              <p className="user-role">Fire Department</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="header">
          <div className="header-left">
            <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu size={24} />
            </button>
            <h1 className="page-title">
              {activeMenuItem === "dashboard" && "Dashboard"}
              {activeMenuItem === "pending" && "Pending Applications"}
              {activeMenuItem === "inspections" && "Inspections"}
              {activeMenuItem === "approved" && "Approved NOCs"}
              {activeMenuItem === "settings" && "System Settings"}
            </h1>
          </div>

          <div className="header-right">
            <div className="notification-bell" onClick={() => setNotificationsOpen(!notificationsOpen)}>
              <Bell size={20} />
              {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}

              {/* Notifications dropdown */}
              {notificationsOpen && (
                <div className="notifications-dropdown">
                  <div className="notifications-header">
                    <h3>Notifications</h3>
                    <button onClick={markAllNotificationsAsRead}>Mark all as read</button>
                  </div>
                  <div className="notifications-list">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`notification-item ${!notification.read ? "unread" : ""}`}
                        >
                          <p className="notification-message">{notification.message}</p>
                          <span className="notification-time">{notification.time}</span>
                        </div>
                      ))
                    ) : (
                      <p className="no-notifications">No notifications</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="user-menu-container">
              <button className="user-menu-button" onClick={() => setUserMenuOpen(!userMenuOpen)}>
                <div className="avatar">AD</div>
                <ChevronDown size={16} />
              </button>

              {userMenuOpen && (
                <div className="user-dropdown">
                  <div className="user-dropdown-header">
                    <div className="avatar">AD</div>
                    <div>
                      <p className="user-name">Admin User</p>
                      <p className="user-email">admin@firedept.gov</p>
                    </div>
                  </div>
                  <ul className="user-dropdown-menu">
                    <li>
                      <User size={16} />
                      <span>Profile</span>
                    </li>
                    <li>
                      <Settings size={16} />
                      <span>Settings</span>
                    </li>
                    <li className="logout">
                      <LogOut size={16} />
                      <span>Logout</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="content-area">
          {/* Dashboard View */}
          {activeMenuItem === "dashboard" && (
            <div className="dashboard-view">
              <div className="stats-cards">
                <div className="stat-card">
                  <div className="stat-icon pending">
                    <Clock size={24} />
                  </div>
                  <div className="stat-details">
                    <h3>Pending Applications</h3>
                    <p className="stat-number">{applications.filter((app) => app.status === "pending").length}</p>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon review">
                    <AlertTriangle size={24} />
                  </div>
                  <div className="stat-details">
                    <h3>Under Review</h3>
                    <p className="stat-number">{applications.filter((app) => app.status === "review").length}</p>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon approved">
                    <CheckCircle size={24} />
                  </div>
                  <div className="stat-details">
                    <h3>Approved NOCs</h3>
                    <p className="stat-number">{applications.filter((app) => app.status === "approved").length}</p>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon rejected">
                    <XCircle size={24} />
                  </div>
                  <div className="stat-details">
                    <h3>Rejected Applications</h3>
                    <p className="stat-number">{applications.filter((app) => app.status === "rejected").length}</p>
                  </div>
                </div>
              </div>

              <div className="dashboard-charts">
                <div className="chart-container">
                  <h3>Recent Applications</h3>
                  <div className="recent-applications">
                    {applications.slice(0, 5).map((app) => (
                      <div key={app.id} className="recent-application-item">
                        <div className="app-info">
                          <p className="app-id">{app.id}</p>
                          <p className="app-name">{app.userName}</p>
                        </div>
                        <StatusBadge status={app.status} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="chart-container">
                  <h3>Inspector Availability</h3>
                  <div className="inspector-list">
                    {inspectors.map((inspector) => (
                      <div key={inspector.id} className="inspector-item">
                        <div className="inspector-info">
                          <p className="inspector-name">{inspector.name}</p>
                          <p className="inspector-expertise">{inspector.expertise}</p>
                        </div>
                        <span
                          className={`availability ${inspector.availability === "Available" ? "available" : "unavailable"}`}
                        >
                          {inspector.availability}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Applications Table View */}
          {(activeMenuItem === "pending" || activeMenuItem === "approved" || activeMenuItem === "inspections") && (
            <div className="applications-view">
              {/* Filters and Search */}
              <div className="filters-bar">
                <div className="search-container">
                  <Search size={18} />
                  <input
                    type="text"
                    placeholder="Search by ID or name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="filters">
                  <div className="filter-group">
                    <label>Status:</label>
                    <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                      <option value="all">All</option>
                      <option value="pending">Pending</option>
                      <option value="review">Under Review</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>

                  <div className="filter-group">
                    <label>Priority:</label>
                    <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
                      <option value="all">All</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>

                  <div className="filter-group">
                    <label>Sort By:</label>
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                      <option value="date">Date</option>
                      <option value="priority">Priority</option>
                      <option value="status">Status</option>
                    </select>
                  </div>

                  <div className="filter-group">
                    <label>Order:</label>
                    <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                      <option value="desc">Descending</option>
                      <option value="asc">Ascending</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Desktop Table View */}
              <div className="table-container desktop-view">
                <table className="applications-table">
                  <thead>
                    <tr>
                      <th>Application ID</th>
                      <th>User Name</th>
                      <th>Property Type</th>
                      <th>Status</th>
                      <th>Priority</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredApplications.map((app) => (
                      <tr key={app.id}>
                        <td>{app.id}</td>
                        <td>{app.userName}</td>
                        <td>{app.propertyType}</td>
                        <td>
                          <StatusBadge status={app.status} />
                        </td>
                        <td>
                          <PriorityBadge priority={app.priority} />
                        </td>
                        <td>{new Date(app.date).toLocaleDateString()}</td>
                        <td className="actions-cell">
                          {app.status === "pending" && (
                            <>
                              <button
                                className="action-button approve"
                                onClick={() => handleApprove(app.id)}
                                title="Approve"
                              >
                                <CheckCircle size={16} />
                              </button>
                              <button
                                className="action-button reject"
                                onClick={() => handleReject(app.id)}
                                title="Reject"
                              >
                                <XCircle size={16} />
                              </button>
                              <button
                                className="action-button assign"
                                onClick={() => handleAssignInspector(app.id)}
                                title="Assign Inspector"
                              >
                                <Calendar size={16} />
                              </button>
                            </>
                          )}
                          {app.status === "review" && (
                            <>
                              <button
                                className="action-button approve"
                                onClick={() => handleApprove(app.id)}
                                title="Approve"
                              >
                                <CheckCircle size={16} />
                              </button>
                              <button
                                className="action-button reject"
                                onClick={() => handleReject(app.id)}
                                title="Reject"
                              >
                                <XCircle size={16} />
                              </button>
                            </>
                          )}
                          {(app.status === "approved" || app.status === "rejected") && (
                            <button className="action-button download" title="Download Certificate">
                              <Download size={16} />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="mobile-view">
                {filteredApplications.map((app) => (
                  <div key={app.id} className="application-card">
                    <div className="card-header">
                      <div className="app-id">{app.id}</div>
                      <div className="app-date">{new Date(app.date).toLocaleDateString()}</div>
                    </div>

                    <div className="card-body">
                      <div className="app-detail">
                        <span className="label">Name:</span>
                        <span className="value">{app.userName}</span>
                      </div>
                      <div className="app-detail">
                        <span className="label">Property:</span>
                        <span className="value">{app.propertyType}</span>
                      </div>
                      <div className="app-detail">
                        <span className="label">Status:</span>
                        <StatusBadge status={app.status} />
                      </div>
                      <div className="app-detail">
                        <span className="label">Priority:</span>
                        <PriorityBadge priority={app.priority} />
                      </div>
                    </div>

                    <div className="card-actions">
                      {app.status === "pending" && (
                        <>
                          <button className="action-button approve" onClick={() => handleApprove(app.id)}>
                            <CheckCircle size={16} />
                            <span>Approve</span>
                          </button>
                          <button className="action-button reject" onClick={() => handleReject(app.id)}>
                            <XCircle size={16} />
                            <span>Reject</span>
                          </button>
                          <button className="action-button assign" onClick={() => handleAssignInspector(app.id)}>
                            <Calendar size={16} />
                            <span>Assign</span>
                          </button>
                        </>
                      )}
                      {app.status === "review" && (
                        <>
                          <button className="action-button approve" onClick={() => handleApprove(app.id)}>
                            <CheckCircle size={16} />
                            <span>Approve</span>
                          </button>
                          <button className="action-button reject" onClick={() => handleReject(app.id)}>
                            <XCircle size={16} />
                            <span>Reject</span>
                          </button>
                        </>
                      )}
                      {(app.status === "approved" || app.status === "rejected") && (
                        <button className="action-button download">
                          <Download size={16} />
                          <span>Download</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Settings View */}
          {activeMenuItem === "settings" && (
            <div className="settings-view">
              <div className="settings-card">
                <h3>System Settings</h3>
                <div className="settings-form">
                  <div className="form-group">
                    <label>Email Notifications</label>
                    <div className="toggle-switch">
                      <input type="checkbox" id="email-toggle" defaultChecked />
                      <label htmlFor="email-toggle"></label>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>SMS Notifications</label>
                    <div className="toggle-switch">
                      <input type="checkbox" id="sms-toggle" defaultChecked />
                      <label htmlFor="sms-toggle"></label>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Auto-assign Inspectors</label>
                    <div className="toggle-switch">
                      <input type="checkbox" id="auto-assign-toggle" />
                      <label htmlFor="auto-assign-toggle"></label>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Default Priority for New Applications</label>
                    <select defaultValue="medium">
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Inspection Reminder (days before)</label>
                    <select defaultValue="1">
                      <option value="1">1 day</option>
                      <option value="2">2 days</option>
                      <option value="3">3 days</option>
                      <option value="7">1 week</option>
                    </select>
                  </div>

                  <button className="save-settings-button">Save Settings</button>
                </div>
              </div>

              <div className="settings-card">
                <h3>User Management</h3>
                <div className="user-management">
                  <div className="user-list">
                    <div className="user-item">
                      <div className="user-info">
                        <div className="avatar">AD</div>
                        <div>
                          <p className="user-name">Admin User</p>
                          <p className="user-role">Administrator</p>
                        </div>
                      </div>
                      <button className="edit-user">Edit</button>
                    </div>

                    <div className="user-item">
                      <div className="user-info">
                        <div className="avatar">VS</div>
                        <div>
                          <p className="user-name">Vikram Singh</p>
                          <p className="user-role">Inspector</p>
                        </div>
                      </div>
                      <button className="edit-user">Edit</button>
                    </div>

                    <div className="user-item">
                      <div className="user-info">
                        <div className="avatar">NK</div>
                        <div>
                          <p className="user-name">Neha Kapoor</p>
                          <p className="user-role">Inspector</p>
                        </div>
                      </div>
                      <button className="edit-user">Edit</button>
                    </div>
                  </div>

                  <button className="add-user-button">Add New User</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Inspector Assignment Modal */}
      {modalOpen && selectedApplication && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Assign Inspector</h3>
              <button className="close-modal" onClick={() => setModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div className="application-details">
                <p>
                  <strong>Application ID:</strong> {selectedApplication.id}
                </p>
                <p>
                  <strong>Applicant:</strong> {selectedApplication.userName}
                </p>
                <p>
                  <strong>Property Type:</strong> {selectedApplication.propertyType}
                </p>
                <p>
                  <strong>Address:</strong> {selectedApplication.address}
                </p>
              </div>

              <div className="form-group">
                <label htmlFor="inspector">Select Inspector:</label>
                <select
                  id="inspector"
                  value={inspectionForm.inspectorId}
                  onChange={(e) => setInspectionForm({ ...inspectionForm, inspectorId: e.target.value })}
                  required
                >
                  <option value="">-- Select Inspector --</option>
                  {inspectors
                    .filter((inspector) => inspector.availability === "Available")
                    .map((inspector) => (
                      <option key={inspector.id} value={inspector.id}>
                        {inspector.name} - {inspector.expertise}
                      </option>
                    ))}
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="date">Inspection Date:</label>
                  <input
                    type="date"
                    id="date"
                    value={inspectionForm.date}
                    onChange={(e) => setInspectionForm({ ...inspectionForm, date: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="time">Inspection Time:</label>
                  <input
                    type="time"
                    id="time"
                    value={inspectionForm.time}
                    onChange={(e) => setInspectionForm({ ...inspectionForm, time: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="comments">Additional Comments:</label>
                <textarea
                  id="comments"
                  value={inspectionForm.comments}
                  onChange={(e) => setInspectionForm({ ...inspectionForm, comments: e.target.value })}
                  placeholder="Any special instructions for the inspector..."
                  rows={3}
                ></textarea>
              </div>
            </div>

            <div className="modal-footer">
              <button className="cancel-button" onClick={() => setModalOpen(false)}>
                Cancel
              </button>
              <button className="assign-button" onClick={submitInspectionAssignment}>
                Assign Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard


// import React, { useState, useEffect } from "react";
// import {
//   Home,
//   FileText,
//   Calendar,
//   CheckSquare,
//   Settings,
//   Bell,
//   Search,
//   ChevronDown,
//   Menu,
//   X,
//   User,
//   LogOut,
//   CheckCircle,
//   XCircle,
//   AlertTriangle,
//   Clock,
//   Download,
// } from "lucide-react";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import api from "../../api/api1"
// import "./AdminDashboard.css";

// const AdminDashboard = () => {
//   const [activeMenuItem, setActiveMenuItem] = useState("pending");
//   const [applications, setApplications] = useState([]);
//   const [selectedApplication, setSelectedApplication] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterStatus, setFilterStatus] = useState("all");
//   const [loading, setLoading] = useState(true);

//   // Fetch all NOC applications
//   useEffect(() => {
//     const fetchApplications = async () => {
//       try {
//         const response = await api.get("/noc/all");
//         setApplications(response.data);
//         setLoading(false);
//       } catch (error) {
//         toast.error("Failed to fetch applications");
//         setLoading(false);
//       }
//     };
//     fetchApplications();
//   }, []);

//   // Handle application approval
//   const handleApprove = async (id) => {
//     try {
//       const response = await api.put(`/noc/${id}/status`, { status: "approved" });
//       setApplications((prev) =>
//         prev.map((app) => (app._id === id ? response.data : app))
//       );
//       toast.success("Application approved successfully");
//     } catch (error) {
//       toast.error("Failed to approve application");
//     }
//   };

//   // Handle application rejection
//   const handleReject = async (id) => {
//     try {
//       const response = await api.put(`/noc/${id}/status`, { status: "rejected" });
//       setApplications((prev) =>
//         prev.map((app) => (app._id === id ? response.data : app))
//       );
//       toast.success("Application rejected successfully");
//     } catch (error) {
//       toast.error("Failed to reject application");
//     }
//   };

//   // Filter applications based on search term and status
//   const filteredApplications = applications.filter((app) => {
//     const matchesSearch =
//       searchTerm === "" ||
//       app.applicationId.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       app.fullName.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesStatus = filterStatus === "all" || app.status === filterStatus;
//     return matchesSearch && matchesStatus;
//   });

//   return (
//     <div className="admin-dashboard">
//       <ToastContainer />
//       {/* Sidebar and Header (unchanged) */}

//       {/* Content Area */}
//       <div className="content-area">
//         {/* Applications Table View */}
//         {activeMenuItem === "pending" && (
//           <div className="applications-view">
//             {/* Filters and Search */}
//             <div className="filters-bar">
//               <div className="search-container">
//                 <Search size={18} />
//                 <input
//                   type="text"
//                   placeholder="Search by ID or name..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>

//               <div className="filters">
//                 <div className="filter-group">
//                   <label>Status:</label>
//                   <select
//                     value={filterStatus}
//                     onChange={(e) => setFilterStatus(e.target.value)}
//                   >
//                     <option value="all">All</option>
//                     <option value="pending">Pending</option>
//                     <option value="approved">Approved</option>
//                     <option value="rejected">Rejected</option>
//                   </select>
//                 </div>
//               </div>
//             </div>

//             {/* Applications Table */}
//             <div className="table-container">
//               <table className="applications-table">
//                 <thead>
//                   <tr>
//                     <th>Application ID</th>
//                     <th>Full Name</th>
//                     <th>Email</th>
//                     <th>Status</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {loading ? (
//                     <tr>
//                       <td colSpan="5">Loading...</td>
//                     </tr>
//                   ) : filteredApplications.length > 0 ? (
//                     filteredApplications.map((app) => (
//                       <tr key={app._id}>
//                         <td>{app.applicationId}</td>
//                         <td>{app.fullName}</td>
//                         <td>{app.email}</td>
//                         <td>
//                           <span className={`status-badge status-${app.status}`}>
//                             {app.status}
//                           </span>
//                         </td>
//                         <td className="actions-cell">
//                           {app.status === "pending" && (
//                             <>
//                               <button
//                                 className="action-button approve"
//                                 onClick={() => handleApprove(app._id)}
//                               >
//                                 <CheckCircle size={16} /> Approve
//                               </button>
//                               <button
//                                 className="action-button reject"
//                                 onClick={() => handleReject(app._id)}
//                               >
//                                 <XCircle size={16} /> Reject
//                               </button>
//                             </>
//                           )}
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="5">No applications found</td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;