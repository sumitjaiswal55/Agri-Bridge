import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

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
    latitude: 0, // Default 0 to match Schema default
    longitude: 0, // Default 0
    farmSize: "",
    businessName: "",
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
        setLocationStatus("Location Fetched!");
      },
      (error) => {
        console.error(error);
        setLocationStatus("Unable to retrieve location. Please type address.");
      }
    );
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);


    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.phone.toString(), // Schema expects String
      role: formData.role,
      location: {
        type: "Point",
        coordinates: [
            parseFloat(formData.longitude) || 0, 
            parseFloat(formData.latitude) || 0
        ],
        address: formData.address, // "Village/Area Name" maps here
      },
    };

    // 2. Add Role Specific Data (Strictly)
    if (formData.role === "farmer") {
      payload.farmDetails = {
        size: parseFloat(formData.farmSize) || 0,
        crops: [], // Default empty array
      };
    } else if (formData.role === "buyer") {
      payload.businessName = formData.businessName;
    }

    console.log("Sending Clean Payload:", payload);

    try {
      const response = await fetch("https://agribridgebackend-xi.vercel.app/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration Successful! Please Login.");
        navigate("/login");
      } else {
        // Backend validation errors show here
        alert(data.message || "Registration Failed");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      alert("Server Error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        {/* Left Side */}
        <div className="auth-left">
          <div className="auth-overlay">
            <h1>Join AgriBridge</h1>
            <p>Direct Farm-to-Table Connection.</p>
          </div>
        </div>

        {/* Right Side */}
        <div className="auth-right">
          <div className="auth-header">
            <h2>Create Account</h2>
            <p>Fill details to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-row">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Ram Lal"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Phone (10 digits)</label>
                {/* Changed type to text to strictly enforce maxLength */}
                <input
                  type="text" 
                  name="phone"
                  placeholder="9876543210"
                  required
                  maxLength="10"
                  pattern="\d{10}"
                  title="Please enter exactly 10 digits"
                  onChange={(e) => {
                    // Only allow numbers
                    const re = /^[0-9\b]+$/;
                    if (e.target.value === '' || re.test(e.target.value)) {
                       handleChange(e)
                    }
                  }}
                  value={formData.phone}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="example@gmail.com"
                required
                onChange={handleChange}
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
              />
            </div>

            <div className="form-group">
              <label>I am a</label>
              <select
                name="role"
                onChange={handleChange}
                value={formData.role}
                className="form-select"
              >
                <option value="buyer">Buyer (Hotel/Merchant)</option>
                <option value="farmer">Farmer (Kisan)</option>
              </select>
            </div>

            {/* Conditional Fields */}
            {formData.role === "farmer" && (
              <div className="form-group">
                <label>Farm Size (Acres)</label>
                <input
                  type="number"
                  name="farmSize"
                  placeholder="e.g. 5"
                  required
                  onChange={handleChange}
                />
              </div>
            )}
            
            {formData.role === "buyer" && (
              <div className="form-group">
                <label>Business/Hotel Name</label>
                <input
                  type="text"
                  name="businessName"
                  placeholder="e.g. Taj Hotel"
                  required
                  onChange={handleChange}
                />
              </div>
            )}

            {/* Location Section */}
            <div className="form-group">
              <label>Location & Address</label>
              <div className="location-box">
                <input
                  type="text"
                  name="address"
                  placeholder="Village / Area Name"
                  required
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className={`btn-location ${formData.latitude ? 'active' : ''}`}
                  onClick={handleLocation}
                >
                  {formData.latitude ? "✅ Saved" : "📍 Detect GPS"}
                </button>
              </div>
              {locationStatus && (
                <small className="status-text">{locationStatus}</small>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-filled btn-block"
              disabled={loading}
            >
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
