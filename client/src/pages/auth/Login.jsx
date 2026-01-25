import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import Navbar from "../../component/layout/Navbar.jsx";
import Footer from "../../component/layout/Footer.jsx";

const Login = () => {
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // UI States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Typing shuru karte hi error hata do
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("https://agribridgebackend-xi.vercel.app/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        // User data save karo
        localStorage.setItem("user", JSON.stringify(data.data));
        localStorage.setItem("token", data.data.token);

        alert("Login Successful! Redirecting...");

        const userRole = data.data.role; 

        if (userRole === "buyer") {
          navigate("/product");
        } else if (userRole === "farmer") {
          navigate("/dashboard"); // Ya jo bhi seller ka route hai
        } else {
          navigate("/profile"); // Fallback agar role match na ho
        }
      } else {
        setError(data.message || "Login Failed");
      }
    } catch (err) {
      console.error("Login Request Error:", err);
      setError("Server Error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
    <div className="auth-wrapper">
      <div className="auth-container">
        {/* Left Side: Welcome Graphic */}
        <div className="auth-left">
          <div className="auth-overlay">
            <h1>Welcome Back!</h1>
            <p>
              Login to manage your crops, orders, and connect with the market.
            </p>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="auth-right">
          <div className="auth-header">
            <h2>Sign In</h2>
            <p>Access your AgriBridge account</p>
          </div>

          {/* Error Message Display */}
          {error && (
            <div
              className="error-message"
              style={{
                color: "red",
                marginBottom: "10px",
                textAlign: "center",
              }}
            >
              {error}
            </div>
          )}

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
      <Footer />
    </div>
  );
};

export default Login;
