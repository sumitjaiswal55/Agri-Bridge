import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  Save,
  Edit2,
  ShoppingBag,
  Camera,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  // --- User State ---
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  // --- Password State ---
  const [passData, setPassData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // --- Real Data Fetching ---
  // --- Real Data Fetching ---
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // 1. Data retrieve karo
        const storedUserString = localStorage.getItem("user");
        console.log("LocalStorage Raw Data:", storedUserString); // Check Console

        const storedUser = JSON.parse(storedUserString);
        console.log("Parsed User Object:", storedUser); // Check Console

        // 2. ID nikaalne ki koshish (Safety Check ke sath)
        // Kabhi kabhi data direct object hota hai, kabhi 'data' key ke andar hota hai
        const userId =
          storedUser?._id || storedUser?.data?._id || storedUser?.user?._id;

        if (!userId) {
          console.warn("User ID not found! Redirecting to Login...");
          // Agar ID nahi mili to localStorage clear krdo taaki fresh login ho sake
          localStorage.removeItem("user");
          navigate("/login");
          return;
        }

        // 3. API Call
        const res = await axios.get(
          `http://localhost:3000/api/users/${userId}`
        );

        if (res.data) {
          // Backend se jo data aaya use set karo (Backend structure ke hisaab se)
          // Usually backend sends { success: true, data: { ... } } or just { ... }
          const user = res.data.data || res.data;

          setFormData({
            name: user.name || "",
            email: user.email || "",
            phone: user.phone || "",
            // Address check safe tarike se
            address: user.location?.address || "",
            // Agar tumhare model me city/pincode alag nahi hai to address string hi dikhao
            city: "",
            pincode: "",
          });
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  // --- Handlers ---
  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePassInput = (e) => {
    setPassData({ ...passData, [e.target.name]: e.target.value });
  };

  const saveProfile = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const userId = storedUser ? storedUser._id : null;

      const updatedData = {
        name: formData.name,
        phone: formData.phone,
        address: [
          {
            street: formData.address,
            city: formData.city,
            pincode: formData.pincode,
          },
        ],
      };

      await axios.put(`http://localhost:3000/api/users/${userId}`, updatedData);

      setIsEditing(false);
      alert("Profile Updated Successfully!");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update profile.");
    }
  };

  const updatePassword = async (e) => {
    e.preventDefault();
    if (passData.newPassword !== passData.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }

    try {
      // Password update API call logic here
      // await axios.put(...)
      alert("Password update logic abhi backend me connect karna hai!");
      setPassData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      alert("Error updating password", err);
    }
  };

  if (loading) return <div className="loading-screen">Loading Profile...</div>;

  return (
    <div className="profile-container">
      <div className="profile-wrapper">
        {/* --- LEFT SIDEBAR (Identity) --- */}
        <div className="profile-sidebar">
          <div className="profile-card">
            <div className="avatar-wrapper">
              <div className="avatar-box">
                {formData.name ? formData.name.charAt(0).toUpperCase() : "U"}
              </div>
              <button className="camera-btn">
                <Camera size={14} />
              </button>
            </div>

            <h2 className="user-name">{formData.name}</h2>
            <span className="user-role">Buyer Account</span>

            <div className="sidebar-menu">
              <div className="menu-item active">
                <User size={18} /> Personal Details
              </div>
              <div className="menu-item">
                <ShoppingBag size={18} /> My Orders
              </div>
            </div>
          </div>
        </div>

        {/* --- RIGHT CONTENT (Forms) --- */}
        <div className="profile-content">
          {/* 1. PERSONAL DETAILS SECTION */}
          <div className="content-section">
            <div className="section-header">
              <h3>Personal Information</h3>
              {!isEditing ? (
                <button
                  className="action-btn edit-btn"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit2 size={16} /> Edit
                </button>
              ) : (
                <div className="btn-group">
                  <button
                    className="action-btn cancel-btn"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                  <button className="action-btn save-btn" onClick={saveProfile}>
                    <Save size={16} /> Save
                  </button>
                </div>
              )}
            </div>

            <div className="form-grid">
              {/* Name */}
              <div className="form-group">
                <label>Full Name</label>
                <div className="input-wrapper">
                  <User size={18} className="input-icon" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInput}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              {/* Email (Read Only usually) */}
              <div className="form-group">
                <label>Email Address</label>
                <div className="input-wrapper">
                  <Mail size={18} className="input-icon" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    disabled={true}
                    className="read-only"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="form-group">
                <label>Phone Number</label>
                <div className="input-wrapper">
                  <Phone size={18} className="input-icon" />
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInput}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              {/* City */}
              <div className="form-group">
                <label>City</label>
                <div className="input-wrapper">
                  <MapPin size={18} className="input-icon" />
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInput}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              {/* Address (Full Width) */}
              <div className="form-group full-width">
                <label>Delivery Address</label>
                <textarea
                  name="address"
                  rows="2"
                  value={formData.address}
                  onChange={handleInput}
                  disabled={!isEditing}
                ></textarea>
              </div>
            </div>
          </div>

          {/* 2. PASSWORD UPDATE SECTION */}
          <div className="content-section">
            <div className="section-header">
              <h3>Security & Password</h3>
            </div>

            <form onSubmit={updatePassword} className="password-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Current Password</label>
                  <div className="input-wrapper">
                    <Lock size={18} className="input-icon" />
                    <input
                      type="password"
                      name="currentPassword"
                      placeholder="••••••••"
                      value={passData.currentPassword}
                      onChange={handlePassInput}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>New Password</label>
                  <div className="input-wrapper">
                    <Lock size={18} className="input-icon" />
                    <input
                      type="password"
                      name="newPassword"
                      placeholder="New Password"
                      value={passData.newPassword}
                      onChange={handlePassInput}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Confirm Password</label>
                  <div className="input-wrapper">
                    <Lock size={18} className="input-icon" />
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm New Password"
                      value={passData.confirmPassword}
                      onChange={handlePassInput}
                    />
                  </div>
                </div>
              </div>

              <div className="password-actions">
                <button type="submit" className="update-pass-btn">
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
