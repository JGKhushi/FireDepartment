// import React, { useState } from "react";
// import { Link, useNavigate  } from "react-router-dom";
// import "./Login.css";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   // const history = useHistory(); // For redirecting after login
//   const navigate = useNavigate()

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Simple validation
//     if (!email || !password) {
//       setError("Please fill in all fields.");
//       return;
//     }

//     // Clear previous errors
//     setError("");

//     try {
//       // Send a POST request to the backend
//       const response = await fetch("http://localhost:5000/api/users/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email,
//           password,
//         }),
//       });

//       // Parse the response
//       const data = await response.json();

//       // Handle the response from the backend
//       if (!response.ok) {
//         // If the response is not OK, display the error message from the backend
//         setError(data.message || "Login failed. Please try again.");
//       } else {
//         // If the response is OK, log the success message
//         console.log("Login successful:", data);

//         // Save the token and user role to localStorage (or context)
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("role", data.role);

//         // Redirect based on user role
//         if (data.role === "admin") {
//           console.log(data.role);
          
//           navigate("/admin-dashboard");
//            // Redirect to Admin Dashboard
//         } else {
//           console.log(data.role);
          
//           navigate("/user-dashboard") // Redirect to User Dashboard
//         }
//       }
//     } catch (error) {
//       // Handle network or other errors
//       console.error("Error during login:", error);
//       setError("An error occurred. Please try again later.");
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <h2>Login</h2>
//         {error && <p className="error-message">{error}</p>}
//         <form onSubmit={handleSubmit}>
//           <div className="input-group">
//             <label>Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter your email"
//               required
//             />
//           </div>
//           <div className="input-group">
//             <label>Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Enter your password"
//               required
//             />
//           </div>
//           <p className="forgot-password">
//             <Link to="/forgot-password">Forgot Password?</Link>
//           </p>
//           <button type="submit" className="login-button">
//             Login
//           </button>
//         </form>
//         <p className="register-link">
//           Don't have an account? <Link to="/register">Register</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed. Please try again.");
        return;
      }

      console.log("Login successful:", data);

      // Store authToken instead of token for consistency
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem('userId', data._id);

      // Redirect based on user role
      navigate(data.role === "admin" ? "/admin-dashboard" : "/user-dashboard");

    } catch (error) {
      console.error("Error during login:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <p className="forgot-password">
            <Link to="/forgot-password">Forgot Password?</Link>
          </p>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <p className="register-link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
