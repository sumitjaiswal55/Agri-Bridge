import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css"


const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // API Call
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        // 1. Token aur User Info ko LocalStorage mein save karo
        // (Isse hum baad mein check karenge ki user logged in hai ya nahi)
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("userInfo", JSON.stringify(data.data));

        // 2. Role Based Redirect (The Pro Move) 🚀
        if (data.data.role === "farmer") {
          navigate("/dashboardr");
        } else {
          navigate("/dashboard/buyer");
        }
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      setError("Server Error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        
        {/* Left Side: Welcome Back Message */}
        {/* Note: CSS class 'auth-left' Signup wali hi use ho rahi hai consistency ke liye */}
        <div className="auth-left">
          <div className="auth-overlay">
            <h1>Welcome Back!</h1>
            <p>Login to manage your crops, orders, and connect with the market.</p>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="auth-right">
          <div className="auth-header">
            <h2>Sign In</h2>
            <p>Access your AgriBridge account</p>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="example@gmail.com"
                required
                onChange={handleChange}
                value={formData.email}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                required
                onChange={handleChange}
                value={formData.password}
              />
            </div>

            <button
              type="submit"
              className="btn btn-filled btn-block"
              disabled={loading}
            >
              {loading ? "Logging In..." : "Login"}
            </button>
          </form>

          <p className="auth-footer">
            Don't have an account? <Link to="/signup">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;