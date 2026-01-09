import React, { useState } from "react";
import { 
  FaBox, 
  FaTruck, 
  FaCheckCircle, 
  FaClock, 
  FaSearch, 
  FaEllipsisV 
} from "react-icons/fa";

const Orders = () => {
  const [activeTab, setActiveTab] = useState("All");

  // Mock Data (Backend se replace hoga)
  // Statuses: Pending, Shipped, Delivered, Cancelled
  const [orders, setOrders] = useState([
    {
      id: "ORD-7782",
      customer: "Hotel Radisson",
      item: "Sharbati Wheat",
      qty: "500 Kg",
      price: "₹18,000",
      date: "2025-12-20",
      status: "Pending",
      payment: "Paid"
    },
    {
      id: "ORD-7783",
      customer: "Fresh Mart",
      item: "Red Onions",
      qty: "100 Kg",
      price: "₹4,500",
      date: "2025-12-19",
      status: "Shipped",
      payment: "COD"
    },
    {
      id: "ORD-7784",
      customer: "Ramesh Wholesaler",
      item: "Potatoes (Agra)",
      qty: "2000 Kg",
      price: "₹40,000",
      date: "2025-12-18",
      status: "Delivered",
      payment: "Paid"
    },
    {
      id: "ORD-7785",
      customer: "Local Mandi Agent",
      item: "Green Chillies",
      qty: "50 Kg",
      price: "₹2,500",
      date: "2025-12-21",
      status: "Pending",
      payment: "Pending"
    },
  ]);

  // Handle Status Update
  const handleStatusChange = (id, newStatus) => {
    // Backend API call yahan aayegi
    const updatedOrders = orders.map(order => 
      order.id === id ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    alert(`Order ${id} marked as ${newStatus}`);
  };

  // Filter Logic
  const filteredOrders = activeTab === "All" 
    ? orders 
    : orders.filter(order => order.status === activeTab);

  return (
    <div className="orders-container">
      
      {/* --- Section 1: Order Stats --- */}
      <div className="stats-row">
        <div className="stat-box blue">
          <FaBox />
          <div>
            <h3>Total Orders</h3>
            <span>{orders.length}</span>
          </div>
        </div>
        <div className="stat-box orange">
          <FaClock />
          <div>
            <h3>Pending</h3>
            <span>{orders.filter(o => o.status === "Pending").length}</span>
          </div>
        </div>
        <div className="stat-box green">
          <FaCheckCircle />
          <div>
            <h3>Completed</h3>
            <span>{orders.filter(o => o.status === "Delivered").length}</span>
          </div>
        </div>
      </div>

      {/* --- Section 2: Order Management --- */}
      <div className="orders-content">
        <div className="orders-header">
          <h2>Manage Orders</h2>
          <div className="search-bar">
            <FaSearch />
            <input type="text" placeholder="Search Order ID or Customer..." />
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs">
          {["All", "Pending", "Shipped", "Delivered"].map((tab) => (
            <button 
              key={tab} 
              className={activeTab === tab ? "active" : ""} 
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Item & Qty</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="fw-bold">{order.id}</td>
                    <td>
                      <div className="customer-info">
                        <span>{order.customer}</span>
                        <small className={order.payment === "Paid" ? "pay-success" : "pay-pending"}>
                          {order.payment}
                        </small>
                      </div>
                    </td>
                    <td>{order.item} <br /><small>{order.qty}</small></td>
                    <td className="fw-bold">{order.price}</td>
                    <td>{order.date}</td>
                    <td>
                      <span className={`status-pill ${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <select 
                        className="status-select"
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="no-data">No orders found in this category.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;