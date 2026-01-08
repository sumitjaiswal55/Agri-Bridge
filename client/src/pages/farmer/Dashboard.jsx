import React, { useState } from 'react';
import { FaHome, FaLeaf, FaShoppingCart, FaWallet, FaPlus, FaSignOutAlt } from 'react-icons/fa';
import './farmer.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const stats = [
    { id: 1, title: 'Total Earnings', value: '₹ 45,000', icon: <FaWallet />, color: 'green' },
    { id: 2, title: 'Total Orders', value: '12', icon: <FaShoppingCart />, color: 'blue' },
    { id: 3, title: 'Active Listings', value: '5', icon: <FaLeaf />, color: 'orange' },
  ];

  const recentOrders = [
    { id: '#ORD001', crop: 'Wheat (Sharbati)', quantity: '100 Kg', price: '₹3,200', status: 'Delivered' },
    { id: '#ORD002', crop: 'Basmati Rice', quantity: '50 Kg', price: '₹4,500', status: 'Pending' },
    { id: '#ORD003', crop: 'Potatoes', quantity: '200 Kg', price: '₹2,000', status: 'Shipped' },
  ];

  return (
    <div className="dashboard-container">
      {/* --- Sidebar --- */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h3>AgriBridge <span>Panel</span></h3>
        </div>
        <ul className="sidebar-menu">
          <li className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>
            <FaHome /> Dashboard
          </li>
          <li className={activeTab === 'listings' ? 'active' : ''} onClick={() => setActiveTab('listings')}>
            <FaLeaf /> My Crops
          </li>
          <li className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>
            <FaShoppingCart /> Orders
          </li>
          <li className="logout">
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
          <button className="btn-add-crop">
            <FaPlus /> Add New Crop
          </button>
        </header>

        {/* Stats Grid */}
        <section className="stats-grid">
          {stats.map((stat) => (
            <div className={`stat-card ${stat.color}`} key={stat.id}>
              <div className="stat-info">
                <h4>{stat.title}</h4>
                <h2>{stat.value}</h2>
              </div>
              <div className="stat-icon">{stat.icon}</div>
            </div>
          ))}
        </section>

        {/* Recent Orders Table */}
        <section className="recent-orders">
          <div className="section-header">
            <h3>Recent Orders</h3>
            <a href="#" className="view-all">View All</a>
          </div>
          
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Crop Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, index) => (
                  <tr key={index}>
                    <td>{order.id}</td>
                    <td>{order.crop}</td>
                    <td>{order.quantity}</td>
                    <td>{order.price}</td>
                    <td>
                      <span className={`status-badge ${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;