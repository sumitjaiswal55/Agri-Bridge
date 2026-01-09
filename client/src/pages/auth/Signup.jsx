import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css"

const Signup = () => {
  const navigate = useNavigate();
  
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "buyer", // Default
    address: "",
    latitude: "",
    longitude: "",
    farmSize: "",
    businessName: ""
  });

  const [loading, setLoading] = useState(false);
  const [locationStatus, setLocationStatus] = useState("");

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔥 Feature: Get GPS Location
  const handleLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus("Geolocation is not supported by your browser.");
      return;
    }
    setLocationStatus("Locating...");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData({
          ...formData,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLocationStatus("Location Fetched! ✅");
      },
      () => {
        setLocationStatus("Unable to retrieve your location.");
      }
    );
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Backend ke liye payload structure
    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      role: formData.role,
      location: {
        type: "Point",
        coordinates: [
          parseFloat(formData.longitude) || 0, 
          parseFloat(formData.latitude) || 0
        ],
        address: formData.address,
      },
      // Conditional Fields
      ...(formData.role === "farmer" && { farmDetails: { size: formData.farmSize } }),
      ...(formData.role === "buyer" && { businessName: formData.businessName }),
    };

    console.log("Sending Data:", payload);

    try {
      // API call (Example)
      const response = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        alert("Registration Successful!");
        navigate("/login");
      } else {
        alert(data.message || "Registration Failed");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        {/* Left Side: Image/Welcome */}
        <div className="auth-left">
          <div className="auth-overlay">
            <h1>Join the Revolution</h1>
            <p>Connect directly with markets. No Middlemen.</p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="auth-right">
          <div className="auth-header">
            <h2>Create Account</h2>
            <p>Welcome to AgriBridge! Please enter your details.</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-row">
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" name="name" placeholder="Ram Lal" required onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Phone (10 digits)</label>
                <input type="number" name="phone" placeholder="9876543210" required minLength="10" maxLength="10" onChange={handleChange} />
              </div>
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input type="email" name="email" placeholder="example@gmail.com" required onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="password" name="password" placeholder="••••••••" required onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>I am a</label>
              <select name="role" onChange={handleChange} value={formData.role} className="form-select">
                <option value="farmer">Farmer (Kisan)</option>
                <option value="buyer">Buyer (Hotel/Merchant)</option>
              </select>
            </div>

            {/* Conditional Fields */}
            {formData.role === "farmer" && (
              <div className="form-group">
                <label>Farm Size (Acres)</label>
                <input type="number" name="farmSize" placeholder="e.g. 5" onChange={handleChange} />
              </div>
            )}
            {formData.role === "buyer" && (
              <div className="form-group">
                <label>Business/Hotel Name</label>
                <input type="text" name="businessName" placeholder="e.g. Taj Hotel" onChange={handleChange} />
              </div>
            )}

            {/* Location Section */}
            <div className="form-group">
              <label>Location & Address</label>
              <div className="location-box">
                <input type="text" name="address" placeholder="Village/Area Name" required onChange={handleChange} />
                <button type="button" className="btn-location" onClick={handleLocation}>
                  📍 Detect GPS
                </button>
              </div>
              {locationStatus && <small className="status-text">{locationStatus}</small>}
            </div>

            <button type="submit" className="btn btn-filled btn-block" disabled={loading}>
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <p className="auth-footer">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;