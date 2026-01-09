import React from "react";
import {
  FaHome,
  FaLeaf,
  FaShoppingCart,
  FaPlus,
  FaSignOutAlt,
  FaMoneyCheck,
} from "react-icons/fa";
// Note: Hum 'Outlet' aur 'NavLink' use karenge
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import "./farmer.css";

// Yahan ab Page components (Home, AddListing etc) import karne ki zaroorat nahi hai.
// Wo sab App.jsx me handle ho rahe hain.

const Dashboard = () => {
  const navigate = useNavigate();

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem("token"); // Token delete karo
    navigate("/login"); // Login page pe bhej do
  };

  return (
    <div className="dashboard-container">
      {/* --- Sidebar --- */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h3>
            AgriBridge <span>Panel</span>
          </h3>
        </div>
        
        <ul className="sidebar-menu">
          {/* Dashboard Home */}
          <li>
            <NavLink 
              to="/dashboard" 
              end // 'end' ka matlab ye tabhi active hoga jab URL exactly '/dashboard' ho
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FaHome /> Dashboard
            </NavLink>
          </li>

          {/* Add Crops */}
          <li>
            <NavLink 
              to="/dashboard/add-listing"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FaPlus /> Add Crops
            </NavLink>
          </li>

          {/* My Crops */}
          <li>
            <NavLink 
              to="/dashboard/my-listings"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FaLeaf /> My Crops
            </NavLink>
          </li>

          {/* Transactions */}
          <li>
            <NavLink 
              to="/dashboard/transactions"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FaMoneyCheck /> Transaction
            </NavLink>
          </li>

          {/* Orders */}
          <li>
            <NavLink 
              to="/dashboard/orders"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FaShoppingCart /> Orders
            </NavLink>
          </li>

          {/* Logout Button */}
          <li className="logout" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </li>
        </ul>
      </aside>

      {/* --- Main Content --- */}
      <main className="main-content">
        <header className="dashboard-header">
          <div className="header-left">
            <h2>Welcome back, Sumit! 👋</h2>
            <p>Here's what's happening with your farm today.</p>
          </div>
          
          <button 
            className="btn-add-crop" 
            onClick={() => navigate("/dashboard/add-listing")}
          >
            <FaPlus /> Add New Crop
          </button>
        </header>

        {/* 👇 JAADU YAHAN HOGA (Dynamic Content) */}
        {/* URL ke hisaab se App.jsx yahan sahi component fit kar dega */}
        <div className="page-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;