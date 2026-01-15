import React, { useState } from "react";
import {
  FaHome,
  FaLeaf,
  FaShoppingCart,
  FaPlus,
  FaSignOutAlt,
  FaMoneyCheck,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import "./farmer.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">

      {/* ===== MOBILE HEADER ===== */}
      <header className="mobile-header">
        <h3 className="mobile-logo">
          AgriBridge <span>Panel</span>
        </h3>

        <button
          className="hamburger-btn"
          onClick={() => setSidebarOpen(true)}
        >
          <FaBars />
        </button>
      </header>

      <div
        className={`sidebar-overlay ${sidebarOpen ? "show" : ""}`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h3>
            AgriBridge <span>Panel</span>
          </h3>

          <button
            className="close-sidebar"
            onClick={() => setSidebarOpen(false)}
          >
            <FaTimes />
          </button>
        </div>

        <ul className="sidebar-menu">
          <li>
            <NavLink to="/dashboard" end>
              <FaHome /> Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/add-listing">
              <FaPlus /> Add Crops
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/my-listings">
              <FaLeaf /> My Crops
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/transactions">
              <FaMoneyCheck /> Transaction
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/orders">
              <FaShoppingCart /> Orders
            </NavLink>
          </li>

          <li className="logout" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </li>
        </ul>
      </aside>

      <main className="main-content">
        <header className="dashboard-header">
          <div>
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

        <div className="page-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
