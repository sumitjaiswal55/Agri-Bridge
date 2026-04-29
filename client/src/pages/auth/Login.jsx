import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import "./Auth.css";
import Navbar from "../../component/layout/Navbar.jsx";
import Footer from "../../component/layout/Footer.jsx";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(""); 
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
        localStorage.setItem("user", JSON.stringify(data.data));
        localStorage.setItem("token", data.data.token);

        const userRole = data.data.role; 
        // Redirect logic based on role
        if (userRole === "buyer") {
          navigate("/"); // Seedha home page par (Buyer First)
        } else {
          navigate("/dashboard");
        }
      } else {
        setError(data.message || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("Connection error. Please check your internet.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-root">
      <Navbar />
      
      <main className="signup-main-content">
        <div className="signup-split">
          
          {/* LEFT: Marketing Visual (Matching Signup) */}
          <div className="visual-side login-bg">
            <div className="visual-overlay-content">
              <span className="b2b-tag">Secure Access</span>
              <h1>Welcome <br/>Back.</h1>
              <p>Manage your orders, track shipments, and check real-time mandi rates.</p>
              
              <ul className="benefit-list">
                <li><CheckCircle2 size={18} color="#0c831f" /> Personalized Dashboard</li>
                <li><CheckCircle2 size={18} color="#0c831f" /> Order History Tracking</li>
                <li><CheckCircle2 size={18} color="#0c831f" /> Fast Bulk Re-ordering</li>
              </ul>
            </div>
          </div>

          {/* RIGHT: Login Form */}
          <div className="form-side">
            <div className="form-wrapper-box">
              <div className="form-intro">
                <h2>Sign In</h2>
                <p>Enter your credentials to access AgriBridge</p>
              </div>

              {error && (
                <div className="auth-error-box">
                  <AlertCircle size={18} />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="professional-form">
                <div className="input-box">
                  <label><Mail size={16}/> Email Address</label>
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="name@business.com" 
                    required 
                    value={formData.email}
                    onChange={handleChange} 
                  />
                </div>

                <div className="input-box">
                  <div className="label-row">
                    <label><Lock size={16}/> Password</label>
                    <Link to="/forgot-password" style={{fontSize: '12px', color: '#0c831f', fontWeight: '700'}}>Forgot?</Link>
                  </div>
                  <input 
                    type="password" 
                    name="password" 
                    placeholder="••••••••" 
                    required 
                    value={formData.password}
                    onChange={handleChange} 
                  />
                </div>

                <button type="submit" className="submit-btn-pro" disabled={loading}>
                  {loading ? (
                    <><Loader2 className="spinner" size={18} /> Validating...</>
                  ) : (
                    <>Login to Account <ArrowRight size={18} /></>
                  )}
                </button>
              </form>

              <div className="form-extra-links">
                <p>New to AgriBridge? <Link to="/signup">Create an Account</Link></p>
                <div className="farmer-cta">
                  <span>Having trouble logging in?</span>
                  <Link to="/support" className="farmer-link">Contact Support <ArrowRight size={14}/></Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;