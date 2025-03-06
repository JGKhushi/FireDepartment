// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import Login from "./pages/Auth/Login";
// import Footer from "./components/Footer";
// import Register from "./pages/Auth/Register";
// import Contact from "./pages/Contact";
// import ForgotPassword from "./pages/Auth/ForgotPassword";
// import NotFound from "./pages/NotFound";
// import ApplyNOC from "./pages/NOC/ApplyNOC";
// import TrackNOC from "./pages/NOC/TrackNOC";
// import EmergencyContact from "./pages/EmergencyContact";
// import UserDashboard from "./pages/Dashboard/UserDashboard"
// import AdminDashboard from "./pages/Dashboard/AdminDashboard"
// import ResetPassword from "./pages/Auth/ResetPassword";
// function App() {
//   return (
//     <Router>
//       <Navbar /> {/* Navigation for switching between pages */}
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path='/login' element={<Login />}/>
//         <Route path="/register" element={<Register />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/reset-password" element={<ResetPassword />}/>
//         <Route path="*" element={<NotFound />} />
//         <Route path="/apply-noc" element={<ApplyNOC />} />
//         <Route path="/track-application" element={<TrackNOC/>} />
//         <Route path="/emergency-contact" element={<EmergencyContact/>} />
//         <Route path="/user-dashboard" element={<UserDashboard/>}/>
//         <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
//       </Routes>
//       <Footer />
//     </Router>
//   );
// }

// export default App;


import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Footer from "./components/Footer";
import Register from "./pages/Auth/Register";
import Contact from "./pages/Contact";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import NotFound from "./pages/NotFound";
import ApplyNOC from "./pages/NOC/ApplyNOC";
import TrackNOC from "./pages/NOC/TrackNOC";
import EmergencyContact from "./pages/EmergencyContact";
import UserDashboard from "./pages/Dashboard/UserDashboard";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import ResetPassword from "./pages/Auth/ResetPassword";
import PrivacyPolicy from "./pages/pri/PrivacyPolicy";

// Function to check authentication
const isAuthenticated = () => {
  return localStorage.getItem("token"); // Returns the token if user is logged in
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/emergency-contact" element={<EmergencyContact />} />
<Route path="/privacy-policy" element={<PrivacyPolicy />} />
        {/* Protected Routes */}
        <Route
          path="/apply-noc"
          element={
            <ProtectedRoute>
              <ApplyNOC />
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/track-application"
          element={
            <ProtectedRoute>
              <TrackNOC />
            </ProtectedRoute>
          }
        /> */}
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
