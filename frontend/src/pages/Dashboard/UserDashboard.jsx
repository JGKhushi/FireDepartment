// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import "./UserDashboard.css";

// const UserDashboard = () => {
//   // State for applications
//   const [applications, setApplications] = useState([
//     { id: "NOC-2024001", propertyType: "Commercial", status: "Pending", lastUpdated: "2 days ago", action: "View Details" },
//     { id: "NOC-2024002", propertyType: "Residential", status: "Under Review", lastUpdated: "1 day ago", action: "View Details" },
//     { id: "NOC-2024003", propertyType: "Industrial", status: "Approved", lastUpdated: "4 hours ago", action: "Download NOC" },
//     { id: "NOC-2024004", propertyType: "Commercial", status: "Pending", lastUpdated: "3 days ago", action: "View Details" },
//     { id: "NOC-2024005", propertyType: "Residential", status: "Approved", lastUpdated: "1 week ago", action: "Download NOC" },
//   ]);

//   // State for notifications
//   const [notifications, setNotifications] = useState([
//     { id: 1, message: "Your NOC request NOC-2024003 has been approved.", time: "4 hours ago", read: false },
//     { id: 2, message: "Inspection for NOC-2024002 scheduled on 15th March 2024.", time: "1 day ago", read: false },
//     { id: 3, message: "Your application NOC-2024002 is now Under Review.", time: "1 day ago", read: true },
//     { id: 4, message: "Your NOC request NOC-2024001 has been received.", time: "2 days ago", read: true },
//   ]);

//   // State for active section
//   const [activeSection, setActiveSection] = useState("Dashboard");

//   // State for sidebar collapse on mobile
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

//   // State for selected application details
//   const [selectedApplication, setSelectedApplication] = useState(null);

//   // State for filter
//   const [statusFilter, setStatusFilter] = useState("All");

//   // Function to toggle sidebar on mobile
//   const toggleSidebar = () => {
//     setSidebarCollapsed(!sidebarCollapsed);
//   };

//   // Function to view application details
//   const viewApplicationDetails = (appId) => {
//     const app = applications.find(app => app.id === appId);
//     setSelectedApplication(app);
//   };

//   // Function to close application details
//   const closeApplicationDetails = () => {
//     setSelectedApplication(null);
//   };

//   // Function to mark notification as read
//   const markAsRead = (notificationId) => {
//     setNotifications(notifications.map(notification =>
//       notification.id === notificationId ? { ...notification, read: true } : notification
//     ));
//   };

//   // Function to mark all notifications as read
//   const markAllAsRead = () => {
//     setNotifications(notifications.map(notification => ({ ...notification, read: true })));
//   };

//   // Function to filter applications by status
//   const filteredApplications = statusFilter === "All"
//     ? applications
//     : applications.filter(app => app.status === statusFilter);

//   // Count unread notifications
//   const unreadCount = notifications.filter(notification => !notification.read).length;

//   // Sidebar Component
//   function Sidebar() {
//     return (
//       <div className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
//         <div className="sidebar-header">
//           <h2>Fire NOC Portal</h2>
//           <button className="close-sidebar" onClick={toggleSidebar}>×</button>
//         </div>
//         <div className="sidebar-menu">
//           <div
//             className={`sidebar-item ${activeSection === "Dashboard" ? "active" : ""}`}
//             onClick={() => setActiveSection("Dashboard")}
//           >
//             <span className="icon">🏠</span>
//             <span className="label">Dashboard</span>
//           </div>
//           <div
//             className={`sidebar-item ${activeSection === "My Applications" ? "active" : ""}`}
//             onClick={() => setActiveSection("My Applications")}
//           >
//             <span className="icon">📄</span>
//             <span className="label">My Applications</span>
//           </div>
//           <div
//             className={`sidebar-item ${activeSection === "Notifications" ? "active" : ""}`}
//             onClick={() => setActiveSection("Notifications")}
//           >
//             <span className="icon">🔔</span>
//             <span className="label">Notifications</span>
//             {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
//           </div>
//           <div
//             className={`sidebar-item ${activeSection === "Profile Settings" ? "active" : ""}`}
//             onClick={() => setActiveSection("Profile Settings")}
//           >
//             <span className="icon">⚙</span>
//             <span className="label">Profile Settings</span>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Header Component
//   function Header() {
//     return (
//       <div className="header">
//         <button className="menu-toggle" onClick={toggleSidebar}>
//           ☰
//         </button>
//         <div className="header-title">
//           <h1>{activeSection}</h1>
//         </div>
//         <div className="header-actions">
//           <div className="notification-icon">
//             🔔
//             {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
//           </div>
//           <div className="user-profile">
//             <img src="https://via.placeholder.com/40" alt="User" />
//             <span>John Doe</span>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Application List Component
//   function ApplicationList() {
//     return (
//       <div className="application-list">
//         <div className="filter-controls">
//           <div className="filter-group">
//             <label>Filter by Status:</label>
//             <select
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//             >
//               <option value="All">All</option>
//               <option value="Pending">Pending</option>
//               <option value="Under Review">Under Review</option>
//               <option value="Approved">Approved</option>
//             </select>
//           </div>
//         </div>

//         <div className="table-container">
//           <table className="applications-table">
//             <thead>
//               <tr>
//                 <th>Application ID</th>
//                 <th>Property Type</th>
//                 <th>Status</th>
//                 <th>Last Updated</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredApplications.map((app) => (
//                 <tr key={app.id}>
//                   <td>{app.id}</td>
//                   <td>{app.propertyType}</td>
//                   <td>
//                     <span className={`status-indicator ${app.status.replace(/\s+/g, '-').toLowerCase()}`}>
//                       {app.status}
//                     </span>
//                   </td>
//                   <td>{app.lastUpdated}</td>
//                   <td>
//                     <button
//                       className="action-button"
//                       onClick={() => viewApplicationDetails(app.id)}
//                     >
//                       {app.action}
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <div className="card-container">
//           {filteredApplications.map((app) => (
//             <div className="application-card" key={app.id}>
//               <div className="card-header">
//                 <h3>{app.id}</h3>
//                 <span className={`status-indicator ${app.status.replace(/\s+/g, '-').toLowerCase()}`}>
//                   {app.status}
//                 </span>
//               </div>
//               <div className="card-body">
//                 <p><strong>Property Type:</strong> {app.propertyType}</p>
//                 <p><strong>Last Updated:</strong> {app.lastUpdated}</p>
//               </div>
//               <div className="card-footer">
//                 <button
//                   className="action-button"
//                   onClick={() => viewApplicationDetails(app.id)}
//                 >
//                   {app.action}
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   // Notification Panel Component
//   function NotificationPanel() {
//     return (
//       <div className="notification-panel">
//         <div className="panel-header">
//           <h2>Notifications</h2>
//           <button className="clear-all" onClick={markAllAsRead}>Mark all as read</button>
//         </div>
//         <div className="notification-list">
//           {notifications.map((notification) => (
//             <div
//               key={notification.id}
//               className={`notification-item ${notification.read ? 'read' : 'unread'}`}
//               onClick={() => markAsRead(notification.id)}
//             >
//               <div className="notification-content">
//                 <p>{notification.message}</p>
//                 <span className="notification-time">{notification.time}</span>
//               </div>
//               {!notification.read && <div className="unread-indicator"></div>}
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   // Application Detail Component
//   function ApplicationDetail() {
//     if (!selectedApplication) return null;

//     return (
//       <div className="application-detail-overlay">
//         <div className="application-detail">
//           <div className="detail-header">
//             <h2>Application Details</h2>
//             <button className="close-button" onClick={closeApplicationDetails}>×</button>
//           </div>
//           <div className="detail-content">
//             <div className="detail-section">
//               <h3>Application Summary</h3>
//               <div className="detail-row">
//                 <span className="detail-label">Application ID:</span>
//                 <span className="detail-value">{selectedApplication.id}</span>
//               </div>
//               <div className="detail-row">
//                 <span className="detail-label">Property Type:</span>
//                 <span className="detail-value">{selectedApplication.propertyType}</span>
//               </div>
//               <div className="detail-row">
//                 <span className="detail-label">Status:</span>
//                 <span className={`status-indicator ${selectedApplication.status.replace(/\s+/g, '-').toLowerCase()}`}>
//                   {selectedApplication.status}
//                 </span>
//               </div>
//               <div className="detail-row">
//                 <span className="detail-label">Last Updated:</span>
//                 <span className="detail-value">{selectedApplication.lastUpdated}</span>
//               </div>
//             </div>

//             <div className="detail-section">
//               <h3>Documents Uploaded</h3>
//               <ul className="document-list">
//                 <li>
//                   <span className="document-name">Aadhaar Card</span>
//                   <span className="document-status">Verified</span>
//                 </li>
//                 <li>
//                   <span className="document-name">PAN Card</span>
//                   <span className="document-status">Verified</span>
//                 </li>
//                 <li>
//                   <span className="document-name">Fire Safety Certificate</span>
//                   <span className="document-status">Under Review</span>
//                 </li>
//               </ul>
//             </div>

//             <div className="detail-section">
//               <h3>Inspection Status</h3>
//               <div className="timeline">
//                 <div className="timeline-item completed">
//                   <div className="timeline-marker"></div>
//                   <div className="timeline-content">
//                     <h4>Application Submitted</h4>
//                     <p>Your application has been received</p>
//                     <span className="timeline-date">March 10, 2024</span>
//                   </div>
//                 </div>
//                 <div className={`timeline-item ${selectedApplication.status !== "Pending" ? "completed" : ""}`}>
//                   <div className="timeline-marker"></div>
//                   <div className="timeline-content">
//                     <h4>Document Verification</h4>
//                     <p>Your documents are being verified</p>
//                     <span className="timeline-date">March 11, 2024</span>
//                   </div>
//                 </div>
//                 <div className={`timeline-item ${selectedApplication.status === "Approved" ? "completed" : ""}`}>
//                   <div className="timeline-marker"></div>
//                   <div className="timeline-content">
//                     <h4>Inspection</h4>
//                     <p>Fire department inspection</p>
//                     <span className="timeline-date">
//                       {selectedApplication.status === "Approved" ? "March 12, 2024" : "Pending"}
//                     </span>
//                   </div>
//                 </div>
//                 <div className={`timeline-item ${selectedApplication.status === "Approved" ? "completed" : ""}`}>
//                   <div className="timeline-marker"></div>
//                   <div className="timeline-content">
//                     <h4>NOC Issuance</h4>
//                     <p>Final approval and certificate issuance</p>
//                     <span className="timeline-date">
//                       {selectedApplication.status === "Approved" ? "March 13, 2024" : "Pending"}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {selectedApplication.status === "Approved" && (
//               <div className="detail-actions">
//                 <button className="download-button">Download NOC Certificate</button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Profile Settings Component
//   function ProfileSettings() {
//     return (
//       <div className="profile-settings">
//         <div className="settings-section">
//           <h2>Personal Information</h2>
//           <div className="form-group">
//             <label>Full Name</label>
//             <input type="text" defaultValue="John Doe" />
//           </div>
//           <div className="form-group">
//             <label>Email Address</label>
//             <input type="email" defaultValue="john.doe@example.com" />
//           </div>
//           <div className="form-group">
//             <label>Contact Number</label>
//             <input type="tel" defaultValue="+91 9876543210" />
//           </div>
//           <button className="save-button">Save Changes</button>
//         </div>

//         <div className="settings-section">
//           <h2>Change Password</h2>
//           <div className="form-group">
//             <label>Current Password</label>
//             <input type="password" />
//           </div>
//           <div className="form-group">
//             <label>New Password</label>
//             <input type="password" />
//           </div>
//           <div className="form-group">
//             <label>Confirm New Password</label>
//             <input type="password" />
//           </div>
//           <button className="save-button">Update Password</button>
//         </div>

//         <div className="settings-section">
//           <h2>Notification Preferences</h2>
//           <div className="checkbox-group">
//             <input type="checkbox" id="email-notifications" defaultChecked />
//             <label htmlFor="email-notifications">Email Notifications</label>
//           </div>
//           <div className="checkbox-group">
//             <input type="checkbox" id="sms-notifications" defaultChecked />
//             <label htmlFor="sms-notifications">SMS Notifications</label>
//           </div>
//           <div className="checkbox-group">
//             <input type="checkbox" id="app-notifications" defaultChecked />
//             <label htmlFor="app-notifications">In-App Notifications</label>
//           </div>
//           <button className="save-button">Save Preferences</button>
//         </div>
//       </div>
//     );
//   }

//   // Main Content Component
//   function MainContent() {
//     return (
//       <div className="main-content">
//         {activeSection === "Dashboard" && <ApplicationList />}
//         {activeSection === "My Applications" && <ApplicationList />}
//         {activeSection === "Notifications" && (
//           <div className="full-width-notifications">
//             <NotificationPanel />
//           </div>
//         )}
//         {activeSection === "Profile Settings" && <ProfileSettings />}
//       </div>
//     );
//   }

//   return (
//     <div className="dashboard-container">
//       <Sidebar />
//       <div className="content-wrapper">
//         <Header />
//         <div className="dashboard-layout">
//           <MainContent />
//           {(activeSection === "Dashboard" || activeSection === "My Applications") && (
//             <NotificationPanel />
//           )}
//         </div>
//       </div>
//       <ApplicationDetail />
//     </div>
//   );
// };

// export default UserDashboard;

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import "./UserDashboard.css";
// import user from "../../assets/users.jpg"

// const UserDashboard = () => {
//   // State for applications
//   const [applications, setApplications] = useState([]);
//   const [userData, setUser] = useState({});

//   // State for notifications
//   const [notifications, setNotifications] = useState([]);

//   // State for active section
//   const [activeSection, setActiveSection] = useState("Dashboard");

//   // State for sidebar collapse on mobile
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

//   // State for selected application details
//   const [selectedApplication, setSelectedApplication] = useState(null);

//   // State for filter
//   const [statusFilter, setStatusFilter] = useState("All");

//   // Fetch applications and notifications on component mount
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch applications
//         const appsResponse = await axios.get('http://localhost:5000/api/noc/all');
//         setApplications(appsResponse.data);
//         const userResponse = await axios.get('http://localhost:5000/api/users/userdetaile');
//         setUser(userResponse.data);

//         // Fetch notifications (assuming you have an endpoint for this)
//         // const notifsResponse = await axios.get('/api/notifications');
//         // setNotifications(notifsResponse.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   // Function to toggle sidebar on mobile
//   const toggleSidebar = () => {
//     setSidebarCollapsed(!sidebarCollapsed);
//   };

//   // Function to view application details
//   const viewApplicationDetails = (appId) => {
//     const app = applications.find(app => app.applicationId === appId);
//     setSelectedApplication(app);
//   };

//   // Function to close application details
//   const closeApplicationDetails = () => {
//     setSelectedApplication(null);
//   };

//   // Function to mark notification as read
//   const markAsRead = (notificationId) => {
//     setNotifications(notifications.map(notification =>
//       notification.id === notificationId ? { ...notification, read: true } : notification
//     ));
//   };

//   // Function to mark all notifications as read
//   const markAllAsRead = () => {
//     setNotifications(notifications.map(notification => ({ ...notification, read: true })));
//   };

//   // Function to filter applications by status
//   const filteredApplications = statusFilter === "All"
//     ? applications
//     : applications.filter(app => app.status === statusFilter);

//   // Count unread notifications
//   const unreadCount = notifications.filter(notification => !notification.read).length;

//   // Sidebar Component
//   function Sidebar() {
//     return (
//       <div className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
//         <div className="sidebar-header">
//           <h2>Fire NOC Portal</h2>
//           <button className="close-sidebar" onClick={toggleSidebar}>×</button>
//         </div>
//         <div className="sidebar-menu">
//           <div
//             className={`sidebar-item ${activeSection === "Dashboard" ? "active" : ""}`}
//             onClick={() => setActiveSection("Dashboard")}
//           >
//             <span className="icon">🏠</span>
//             <span className="label">Dashboard</span>
//           </div>
//           <div
//             className={`sidebar-item ${activeSection === "My Applications" ? "active" : ""}`}
//             onClick={() => setActiveSection("My Applications")}
//           >
//             <span className="icon">📄</span>
//             <span className="label">My Applications</span>
//           </div>
//           <div
//             className={`sidebar-item ${activeSection === "Notifications" ? "active" : ""}`}
//             onClick={() => setActiveSection("Notifications")}
//           >
//             <span className="icon">🔔</span>
//             <span className="label">Notifications</span>
//             {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
//           </div>
//           <div
//             className={`sidebar-item ${activeSection === "Profile Settings" ? "active" : ""}`}
//             onClick={() => setActiveSection("Profile Settings")}
//           >
//             <span className="icon">⚙</span>
//             <span className="label">Profile Settings</span>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Header Component
//   function Header() {
//     return (
//       <div className="header">
//         <button className="menu-toggle" onClick={toggleSidebar}>
//           ☰
//         </button>
//         <div className="header-title">
//           <h1>{activeSection}</h1>
//         </div>
//         <div className="header-actions">
//           <div className="notification-icon">
//             🔔
//             {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
//           </div>
//           <div className="user-profile">
//             <img src={user} alt="User"  height={"40px"} width={"40px"}/>
//             <span>{userData.name}</span>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Application List Component
//   function ApplicationList() {
//     return (
//       <div className="application-list">
//         <div className="filter-controls">
//           <div className="filter-group">
//             <label>Filter by Status:</label>
//             <select
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//             >
//               <option value="All">All</option>
//               <option value="Pending">Pending</option>
//               <option value="Under Review">Under Review</option>
//               <option value="Approved">Approved</option>
//             </select>
//           </div>
//         </div>

//         <div className="table-container">
//           <table className="applications-table">
//             <thead>
//               <tr>
//                 <th>Application ID</th>
//                 <th>Property Type</th>
//                 <th>Status</th>
//                 <th>Last Updated</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredApplications.map((app) => (
//                 <tr key={app.applicationId}>
//                   <td>{app.applicationId}</td>
//                   <td>{app.buildingType}</td>
//                   <td>
//                     <span className={`status-indicator ${app.status.replace(/\s+/g, '-').toLowerCase()}`}>
//                       {app.status}
//                     </span>
//                   </td>
//                   <td>{new Date(app.updatedAt).toLocaleDateString()}</td>
//                   <td>
//                     <button
//                       className="action-button"
//                       onClick={() => viewApplicationDetails(app.applicationId)}
//                     >
//                       View Details
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <div className="card-container">
//           {filteredApplications.map((app) => (
//             <div className="application-card" key={app.applicationId}>
//               <div className="card-header">
//                 <h3>{app.applicationId}</h3>
//                 <span className={`status-indicator ${app.status.replace(/\s+/g, '-').toLowerCase()}`}>
//                   {app.status}
//                 </span>
//               </div>
//               <div className="card-body">
//                 <p><strong>Property Type:</strong> {app.buildingType}</p>
//                 <p><strong>Last Updated:</strong> {new Date(app.updatedAt).toLocaleDateString()}</p>
//               </div>
//               <div className="card-footer">
//                 <button
//                   className="action-button"
//                   onClick={() => viewApplicationDetails(app.applicationId)}
//                 >
//                   View Details
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   // Notification Panel Component
//   function NotificationPanel() {
//     return (
//       <div className="notification-panel">
//         <div className="panel-header">
//           <h2>Notifications</h2>
//           <button className="clear-all" onClick={markAllAsRead}>Mark all as read</button>
//         </div>
//         <div className="notification-list">
//           {notifications.map((notification) => (
//             <div
//               key={notification.id}
//               className={`notification-item ${notification.read ? 'read' : 'unread'}`}
//               onClick={() => markAsRead(notification.id)}
//             >
//               <div className="notification-content">
//                 <p>{notification.message}</p>
//                 <span className="notification-time">{notification.time}</span>
//               </div>
//               {!notification.read && <div className="unread-indicator"></div>}
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   // Application Detail Component
//   function ApplicationDetail() {
//     if (!selectedApplication) return null;

//     return (
//       <div className="application-detail-overlay">
//         <div className="application-detail">
//           <div className="detail-header">
//             <h2>Application Details</h2>
//             <button className="close-button" onClick={closeApplicationDetails}>×</button>
//           </div>
//           <div className="detail-content">
//             <div className="detail-section">
//               <h3>Application Summary</h3>
//               <div className="detail-row">
//                 <span className="detail-label">Application ID:</span>
//                 <span className="detail-value">{selectedApplication.applicationId}</span>
//               </div>
//               <div className="detail-row">
//                 <span className="detail-label">Property Type:</span>
//                 <span className="detail-value">{selectedApplication.buildingType}</span>
//               </div>
//               <div className="detail-row">
//                 <span className="detail-label">Status:</span>
//                 <span className={`status-indicator ${selectedApplication.status.replace(/\s+/g, '-').toLowerCase()}`}>
//                   {selectedApplication.status}
//                 </span>
//               </div>
//               <div className="detail-row">
//                 <span className="detail-label">Last Updated:</span>
//                 <span className="detail-value">{new Date(selectedApplication.updatedAt).toLocaleDateString()}</span>
//               </div>
//             </div>

//             <div className="detail-section">
//               <h3>Documents Uploaded</h3>
//               <ul className="document-list">
//                 <li>
//                   <span className="document-name">Aadhaar Card</span>
//                   <span className="document-status">Verified</span>
//                 </li>
//                 <li>
//                   <span className="document-name">PAN Card</span>
//                   <span className="document-status">Verified</span>
//                 </li>
//                 <li>
//                   <span className="document-name">Fire Safety Certificate</span>
//                   <span className="document-status">Under Review</span>
//                 </li>
//               </ul>
//             </div>

//             <div className="detail-section">
//               <h3>Inspection Status</h3>
//               <div className="timeline">
//                 <div className="timeline-item completed">
//                   <div className="timeline-marker"></div>
//                   <div className="timeline-content">
//                     <h4>Application Submitted</h4>
//                     <p>Your application has been received</p>
//                     <span className="timeline-date">March 10, 2024</span>
//                   </div>
//                 </div>
//                 <div className={`timeline-item ${selectedApplication.status !== "Pending" ? "completed" : ""}`}>
//                   <div className="timeline-marker"></div>
//                   <div className="timeline-content">
//                     <h4>Document Verification</h4>
//                     <p>Your documents are being verified</p>
//                     <span className="timeline-date">March 11, 2024</span>
//                   </div>
//                 </div>
//                 <div className={`timeline-item ${selectedApplication.status === "Approved" ? "completed" : ""}`}>
//                   <div className="timeline-marker"></div>
//                   <div className="timeline-content">
//                     <h4>Inspection</h4>
//                     <p>Fire department inspection</p>
//                     <span className="timeline-date">
//                       {selectedApplication.status === "Approved" ? "March 12, 2024" : "Pending"}
//                     </span>
//                   </div>
//                 </div>
//                 <div className={`timeline-item ${selectedApplication.status === "Approved" ? "completed" : ""}`}>
//                   <div className="timeline-marker"></div>
//                   <div className="timeline-content">
//                     <h4>NOC Issuance</h4>
//                     <p>Final approval and certificate issuance</p>
//                     <span className="timeline-date">
//                       {selectedApplication.status === "Approved" ? "March 13, 2024" : "Pending"}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {selectedApplication.status === "Approved" && (
//               <div className="detail-actions">
//                 <button className="download-button">Download NOC Certificate</button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Profile Settings Component
//   function ProfileSettings() {
//     return (
//       <div className="profile-settings">
//         <div className="settings-section">
//           <h2>Personal Information</h2>
//           <div className="form-group">
//             <label>Full Name</label>
//             <input type="text" defaultValue="John Doe" />
//           </div>
//           <div className="form-group">
//             <label>Email Address</label>
//             <input type="email" defaultValue="john.doe@example.com" />
//           </div>
//           <div className="form-group">
//             <label>Contact Number</label>
//             <input type="tel" defaultValue="+91 9876543210" />
//           </div>
//           <button className="save-button">Save Changes</button>
//         </div>

//         {/* <div className="settings-section">
//           <h2>Change Password</h2>
//           <div className="form-group">
//             <label>Current Password</label>
//             <input type="password" />
//           </div>
//           <div className="form-group">
//             <label>New Password</label>
//             <input type="password" />
//           </div>
//           <div className="form-group">
//             <label>Confirm New Password</label>
//             <input type="password" />
//           </div>
//           <button className="save-button">Update Password</button>
//         </div> */}

//         <div className="settings-section">
//           <h2>Notification Preferences</h2>
//           <div className="checkbox-group">
//             <input type="checkbox" id="email-notifications" defaultChecked />
//             <label htmlFor="email-notifications">Email Notifications</label>
//           </div>
//           <div className="checkbox-group">
//             <input type="checkbox" id="sms-notifications" defaultChecked />
//             <label htmlFor="sms-notifications">SMS Notifications</label>
//           </div>
//           <div className="checkbox-group">
//             <input type="checkbox" id="app-notifications" defaultChecked />
//             <label htmlFor="app-notifications">In-App Notifications</label>
//           </div>
//           <button className="save-button">Save Preferences</button>
//         </div>
//       </div>
//     );
//   }

//   // Main Content Component
//   function MainContent() {
//     return (
//       <div className="main-content">
//         {activeSection === "Dashboard" && <ApplicationList />}
//         {activeSection === "My Applications" && <ApplicationList />}
//         {activeSection === "Notifications" && (
//           <div className="full-width-notifications">
//             <NotificationPanel />
//           </div>
//         )}
//         {activeSection === "Profile Settings" && <ProfileSettings />}
//       </div>
//     );
//   }

//   return (
//     <div className="dashboard-container">
//       <Sidebar />
//       <div className="content-wrapper">
//         <Header />
//         <div className="dashboard-layout">
//           <MainContent />
//           {(activeSection === "Dashboard" || activeSection === "My Applications") && (
//             <NotificationPanel />
//           )}
//         </div>
//       </div>
//       <ApplicationDetail />
//     </div>
//   );
// };

// export default UserDashboard;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./UserDashboard.css";
import user from "../../assets/users.jpg";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
const UserDashboard = () => {
  // State for applications
  const [applications, setApplications] = useState([]);
  const [userData, setUser] = useState({});
  // State for notifications
  const [notifications, setNotifications] = useState([]);

  // State for active section
  const [activeSection, setActiveSection] = useState("Dashboard");

  // State for sidebar collapse on mobile
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  // State for selected application details
  const [selectedApplication, setSelectedApplication] = useState(null);

  // State for filter
  const [statusFilter, setStatusFilter] = useState("All");

  // Fetch applications and notifications on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch applications
        const appsResponse = await axios.get(
          "http://localhost:5000/api/noc/all"
        );
        setApplications(appsResponse.data);
        const userId = localStorage.getItem('userId'); // or from state
// console.log(userId);

        const userResponse = await axios.get(`http://localhost:5000/api/users/userdetaile/${userId}`);
        // console.log(userResponse.data.user);
        
                setUser(userResponse.data.user);
                // console.log(userData);
                
        // Fetch notifications (assuming you have an endpoint for this)
        const notifsResponse = await axios.get('http://localhost:5000/notify/');
        setNotifications(notifsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  // Function to toggle sidebar on mobile
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Function to view application details
  const viewApplicationDetails = (appId) => {
    const app = applications.find((app) => app.applicationId === appId);
    setSelectedApplication(app);
  };

  // Function to close application details
  const closeApplicationDetails = () => {
    setSelectedApplication(null);
  };

  // Function to mark notification as read
  const markAsRead = (notificationId) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  // Function to mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true }))
    );
  };

  // Function to filter applications by status
  const filteredApplications =
    statusFilter === "All"
      ? applications
      : applications.filter((app) => app.status === statusFilter);

  // Count unread notifications
  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  // Function to generate and download PDF for all applications
  const downloadPDF = () => {
    const doc = new jsPDF();

    // Add a title to the PDF
    doc.setFontSize(18);
    doc.text("Applications Report", 14, 22);

    // Define the columns for the table
    const columns = [
      { header: "Application ID", dataKey: "applicationId" },
      { header: "Property Type", dataKey: "buildingType" },
      { header: "Status", dataKey: "status" },
      { header: "Last Updated", dataKey: "updatedAt" },
    ];

    // Map the applications data to the format required by jspdf-autotable
    const rows = applications.map((app) => [
      app.applicationId,
      app.buildingType,
      app.status,
      new Date(app.updatedAt).toLocaleDateString(),
    ]);

    // Add the table to the PDF
    autoTable(doc, {
      head: [columns.map((col) => col.header)],
      body: rows,
      startY: 30,
    });

    // Save the PDF
    doc.save("applications_report.pdf");
  };

  // Function to download NOC certificate for approved applications
  const downloadNOCCertificate = () => {
    if (!selectedApplication || selectedApplication.status !== "Approved") {
      alert("No approved application selected.");
      return;
    }

    const doc = new jsPDF();

    // Add a title to the PDF
    doc.setFontSize(18);
    doc.text("NOC Certificate", 14, 22);

    // Add application details
    doc.setFontSize(12);
    doc.text(`Application ID: ${selectedApplication.applicationId}`, 14, 40);
    doc.text(`Property Type: ${selectedApplication.buildingType}`, 14, 50);
    doc.text(`Status: ${selectedApplication.status}`, 14, 60);
    doc.text(
      `Last Updated: ${new Date(
        selectedApplication.updatedAt
      ).toLocaleDateString()}`,
      14,
      70
    );

    // Save the PDF
    doc.save(`noc_certificate_${selectedApplication.applicationId}.pdf`);
  };

  // Sidebar Component
  function Sidebar() {
    return (
      <div className={`sidebar ${sidebarCollapsed ? "collapsed" : ""}`}>
        <div className="sidebar-header">
          <h2>Fire NOC Portal</h2>
          <button className="close-sidebar" onClick={toggleSidebar}>
            ×
          </button>
        </div>
        <div className="sidebar-menu">
          <div
            className={`sidebar-item ${
              activeSection === "Dashboard" ? "active" : ""
            }`}
            onClick={() => setActiveSection("Dashboard")}
          >
            <span className="icon">🏠</span>
            <span className="label">Dashboard</span>
          </div>
          <div
            className={`sidebar-item ${
              activeSection === "My Applications" ? "active" : ""
            }`}
            onClick={() => setActiveSection("My Applications")}
          >
            <span className="icon">📄</span>
            <span className="label">My Applications</span>
          </div>
          <div
            className={`sidebar-item ${
              activeSection === "Notifications" ? "active" : ""
            }`}
            onClick={() => setActiveSection("Notifications")}
          >
            <span className="icon">🔔</span>
            <span className="label">Notifications</span>
            {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
          </div>
          <div
            className={`sidebar-item ${
              activeSection === "Profile Settings" ? "active" : ""
            }`}
            onClick={() => setActiveSection("Profile Settings")}
          >
            <span className="icon">⚙</span>
            <span className="label">Profile Settings</span>
          </div>
        </div>
      </div>
    );
  }

  // Header Component
  function Header() {
    return (
      <div className="header">
        <button className="menu-toggle" onClick={toggleSidebar}>
          ☰
        </button>
        <div className="header-title">
          <h1>{activeSection}</h1>
        </div>
        <div className="header-actions">
          <div className="notification-icon">
            🔔
            {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
          </div>
          <div className="user-profile">
            <img src={user} alt="User" height={"40px"} width={"40px"} />
            <span>{userData.name}</span>
          </div>
        </div>
      </div>
    );
  }

  // Application List Component
  function ApplicationList() {
    return (
      <div className="application-list">
        <div className="filter-controls">
          <div className="filter-group">
            <label>Filter by Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Under Review">Under Review</option>
              <option value="Approved">Approved</option>
            </select>
          </div>
          {/* <button className="download-pdf-button" onClick={downloadPDF}>
            Download PDF
          </button> */}
        </div>

        <div className="table-container">
          <table className="applications-table">
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
              {filteredApplications.map((app) => (
                <tr key={app.applicationId}>
                  <td>{app.applicationId}</td>
                  <td>{app.buildingType}</td>
                  <td>
                    <span
                      className={`status-indicator ${app.status
                        .replace(/\s+/g, "-")
                        .toLowerCase()}`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td>{new Date(app.updatedAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="action-button"
                      onClick={() => viewApplicationDetails(app.applicationId)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card-container">
          {filteredApplications.map((app) => (
            <div className="application-card" key={app.applicationId}>
              <div className="card-header">
                <h3>{app.applicationId}</h3>
                <span
                  className={`status-indicator ${app.status
                    .replace(/\s+/g, "-")
                    .toLowerCase()}`}
                >
                  {app.status}
                </span>
              </div>
              <div className="card-body">
                <p>
                  <strong>Property Type:</strong> {app.buildingType}
                </p>
                <p>
                  <strong>Last Updated:</strong>{" "}
                  {new Date(app.updatedAt).toLocaleDateString()}
                </p>
              </div>
              <div className="card-footer">
                <button
                  className="action-button"
                  onClick={() => viewApplicationDetails(app.applicationId)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Notification Panel Component
  function NotificationPanel() {
    return (
      <div className="notification-panel">
        <div className="panel-header">
          <h2>Notifications</h2>
          <button className="clear-all" onClick={markAllAsRead}>
            Mark all as read
          </button>
        </div>
        <div className="notification-list">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`notification-item ${
                notification.read ? "read" : "unread"
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="notification-content">
                <p>{notification.message}</p>
                <span className="notification-time">{notification.time}</span>
              </div>
              {!notification.read && <div className="unread-indicator"></div>}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Application Detail Component
  function ApplicationDetail() {
    if (!selectedApplication) return null;

    return (
      <div className="application-detail-overlay">
        <div className="application-detail">
          <div className="detail-header">
            <h2>Application Details</h2>
            <button className="close-button" onClick={closeApplicationDetails}>
              ×
            </button>
          </div>
          <div className="detail-content">
            <div className="detail-section">
              <h3>Application Summary</h3>
              <div className="detail-row">
                <span className="detail-label">Application ID:</span>
                <span className="detail-value">
                  {selectedApplication.applicationId}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Property Type:</span>
                <span className="detail-value">
                  {selectedApplication.buildingType}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Status:</span>
                <span
                  className={`status-indicator ${selectedApplication.status
                    .replace(/\s+/g, "-")
                    .toLowerCase()}`}
                >
                  {selectedApplication.status}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Last Updated:</span>
                <span className="detail-value">
                  {new Date(selectedApplication.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="detail-section">
              <h3>Documents Uploaded</h3>
              <ul className="document-list">
                <li>
                  <span className="document-name">Aadhaar Card</span>
                  <span className="document-status">Verified</span>
                </li>
                <li>
                  <span className="document-name">PAN Card</span>
                  <span className="document-status">Verified</span>
                </li>
                <li>
                  <span className="document-name">Fire Safety Certificate</span>
                  <span className="document-status">Under Review</span>
                </li>
              </ul>
            </div>

            <div className="detail-section">
              <h3>Inspection Status</h3>
              <div className="timeline">
                <div className="timeline-item completed">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h4>Application Submitted</h4>
                    <p>Your application has been received</p>
                    <span className="timeline-date">March 10, 2024</span>
                  </div>
                </div>
                <div
                  className={`timeline-item ${
                    selectedApplication.status !== "Pending" ? "completed" : ""
                  }`}
                >
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h4>Document Verification</h4>
                    <p>Your documents are being verified</p>
                    <span className="timeline-date">March 11, 2024</span>
                  </div>
                </div>
                <div
                  className={`timeline-item ${
                    selectedApplication.status === "Approved" ? "completed" : ""
                  }`}
                >
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h4>Inspection</h4>
                    <p>Fire department inspection</p>
                    <span className="timeline-date">
                      {selectedApplication.status === "Approved"
                        ? "March 12, 2024"
                        : "Pending"}
                    </span>
                  </div>
                </div>
                <div
                  className={`timeline-item ${
                    selectedApplication.status === "Approved" ? "completed" : ""
                  }`}
                >
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h4>NOC Issuance</h4>
                    <p>Final approval and certificate issuance</p>
                    <span className="timeline-date">
                      {selectedApplication.status === "Approved"
                        ? "March 13, 2024"
                        : "Pending"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {selectedApplication.status === "Approved" && (
              <div className="detail-actions">
                <button
                  className="download-button"
                  onClick={downloadNOCCertificate}
                >
                  Download NOC Certificate
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Profile Settings Component
  function ProfileSettings() {
    return (
      <div className="profile-settings">
        <div className="settings-section">
          <h2>Personal Information</h2>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" defaultValue="prabhanshu jain" />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" defaultValue="pj@example.com" />
          </div>
          <div className="form-group">
            <label>Contact Number</label>
            <input type="tel" defaultValue="+91 9876543210" />
          </div>
          <button className="save-button">Save Changes</button>
        </div>

        <div className="settings-section">
          <h2>Notification Preferences</h2>
          <div className="checkbox-group">
            <input type="checkbox" id="email-notifications" defaultChecked />
            <label htmlFor="email-notifications">Email Notifications</label>
          </div>
          <div className="checkbox-group">
            <input type="checkbox" id="sms-notifications" defaultChecked />
            <label htmlFor="sms-notifications">SMS Notifications</label>
          </div>
          <div className="checkbox-group">
            <input type="checkbox" id="app-notifications" defaultChecked />
            <label htmlFor="app-notifications">In-App Notifications</label>
          </div>
          <button className="save-button">Save Preferences</button>
        </div>
      </div>
    );
  }

  // Main Content Component
  function MainContent() {
    return (
      <div className="main-content">
        {activeSection === "Dashboard" && <ApplicationList />}
        {activeSection === "My Applications" && <ApplicationList />}
        {activeSection === "Notifications" && (
          <div className="full-width-notifications">
            <NotificationPanel />
          </div>
        )}
        {activeSection === "Profile Settings" && <ProfileSettings />}
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="content-wrapper">
        <Header />
        <div className="dashboard-layout">
          <MainContent />
          {(activeSection === "Dashboard" ||
            activeSection === "My Applications") && <NotificationPanel />}
        </div>
      </div>
      <ApplicationDetail />
    </div>
  );
};

export default UserDashboard;
