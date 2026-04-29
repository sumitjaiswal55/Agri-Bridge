import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  MapPin, User, Phone, Mail, Lock, 
  ArrowRight, Sprout, Wheat, Loader2, CheckCircle 
} from "lucide-react";
import "./Auth.css";
import Navbar from "../../component/layout/Navbar.jsx";
import Footer from "../../component/layout/Footer.jsx";

const FarmerSignup = () => {
  const navigate = useNavigate();

  // --- Form State ---
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    latitude: 0,
    longitude: 0,
    farmSize: "",
  });

  const [loading, setLoading] = useState(false);
  const [locationStatus, setLocationStatus] = useState("");
  const [isLocating, setIsLocating] = useState(false);

  // --- Input Change Handler ---
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- GPS Address Detection ---
  const fetchAddress = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
      );
      const data = await response.json();
      if (data && data.display_name) {
        setFormData(prev => ({
          ...prev,
          address: data.display_name,
          latitude: lat,
          longitude: lon
        }));
        setLocationStatus("Farm Location Verified ✅");
      }
    } catch (error) {
      setLocationStatus("GPS coordinates found!");
    } finally {
      setIsLocating(false);
    }
  };

  const handleLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus("GPS not supported.");
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchAddress(position.coords.latitude, position.coords.longitude);
      },
      () => {
        setIsLocating(false);
        setLocationStatus("Failed to get location.");
      }
    );
  };

  // --- Submit Handler ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.phone.toString(),
      role: "farmer",
      location: {
        type: "Point",
        coordinates: [parseFloat(formData.longitude), parseFloat(formData.latitude)],
        address: formData.address,
      },
      farmDetails: {
        size: parseFloat(formData.farmSize) || 0,
        crops: [], // Initially empty
      }
    };

    try {
      const response = await fetch("https://agribridgebackend-xi.vercel.app/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Farmer Account Created! Welcome to AgriBridge.");
        navigate("/login");
      } else {
        const data = await response.json();
        alert(data.message || "Registration Failed");
      }
    } catch (error) {
      alert("Server error, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-root">
      <Navbar />
      
      <main className="signup-main-content">
        <div className="signup-split">
          
          {/* LEFT: Farmer Marketing Side */}
          <div className="visual-side farmer-bg">
            <div className="visual-overlay-content">
              <span className="b2b-tag">Seller Dashboard</span>
              <h1>Apni Fasal, <br/>Sahi Daam.</h1>
              <p>Directly sell your harvest to big hotels and retailers across India. No more middleman commissions.</p>
              
              <ul className="benefit-list">
                <li><Wheat size={18} color="#0c831f" /> List your crops in 2 minutes</li>
                <li><CheckCircle size={18} color="#0c831f" /> Get paid directly in Bank</li>
                <li><CheckCircle size={18} color="#0c831f" /> Free Quality Certification</li>
              </ul>
            </div>
          </div>

          {/* RIGHT: Farmer Signup Form */}
          <div className="form-side">
            <div className="form-wrapper-box">
              <div className="form-intro">
                <h2>Farmer Registration</h2>
                <p>Register to start selling your fresh produce</p>
              </div>

              <form onSubmit={handleSubmit} className="professional-form">
                <div className="form-grid">
                  <div className="input-box">
                    <label><User size={16}/> Farmer Name</label>
                    <input type="text" name="name" placeholder="Full Name" required onChange={handleChange} />
                  </div>
                  <div className="input-box">
                    <label><Phone size={16}/> Mobile Number</label>
                    <input type="text" name="phone" placeholder="10 digits" maxLength="10" required onChange={handleChange} />
                  </div>
                </div>

                <div className="form-grid">
                  <div className="input-box">
                    <label><Mail size={16}/> Email (Optional)</label>
                    <input type="email" name="email" placeholder="example@mail.com" onChange={handleChange} />
                  </div>
                  <div className="input-box">
                    <label><Sprout size={16}/> Farm Size (Acres)</label>
                    <input type="number" name="farmSize" placeholder="e.g. 5" required onChange={handleChange} />
                  </div>
                </div>

                <div className="input-box location-group">
                  <label><MapPin size={16}/> Farm / Village Address</label>
                  <div className="location-input-wrapper">
                    <textarea 
                      name="address" 
                      placeholder="Enter Village Name & Area..." 
                      value={formData.address}
                      required 
                      onChange={handleChange}
                      rows="2"
                    ></textarea>
                    
                    <button 
                      type="button" 
                      className={`gps-btn-pro ${isLocating ? 'loading' : ''}`} 
                      onClick={handleLocation}
                      disabled={isLocating}
                    >
                      {isLocating ? <Loader2 className="spinner" size={16} /> : <MapPin size={16} />}
                      {formData.latitude ? "Verified" : "Detect Farm"}
                    </button>
                  </div>
                  {locationStatus && (
                    <small className={`loc-status-msg ${formData.latitude ? 'success' : ''}`}>
                      {locationStatus}
                    </small>
                  )}
                </div>

                <div className="input-box">
                  <label><Lock size={16}/> Create Login Password</label>
                  <input type="password" name="password" placeholder="Create a strong password" required onChange={handleChange} />
                </div>

                <button type="submit" className="submit-btn-pro" disabled={loading}>
                  {loading ? "Registering..." : "Start Selling Now"} <ArrowRight size={18} />
                </button>
              </form>

              <div className="form-extra-links">
                <p>Already a member? <Link to="/login">Login</Link></p>
                <div className="farmer-cta">
                  <span>Are you a Merchant/Hotel?</span>
                  <Link to="/signup" className="farmer-link">Buyer Signup <ArrowRight size={14}/></Link>
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

export default FarmerSignup;