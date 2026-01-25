import React, { useState, useEffect } from "react";
import { 
  FaBox, 
  FaTruck, 
  FaCheckCircle, 
  FaClock, 
  FaSearch, 
  FaFilter,
  FaTimesCircle,
  FaPhone,
  FaMapMarkerAlt,
  FaUser
} from "react-icons/fa";
import axios from "axios";

const Orders = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch orders from backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        
        // This would be the actual endpoint to fetch farmer's orders
        // For now, using sample data that would come from backend
        const response = await axios.get(
          'https://agribridgebackend-xi.vercel.app/api/my-listings',
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // Transform listings into orders format
        if (response.data.success && Array.isArray(response.data.data)) {
          const orders = response.data.data.map((listing, index) => ({
            id: `ORD-${7780 + index}`,
            customer: ["Hotel Radisson", "Fresh Mart", "Ramesh Wholesaler", "Local Mandi Agent"][index % 4],
            item: listing.name,
            qty: `${listing.quantityAvailable} ${listing.quantity}`,
            price: `₹${(listing.pricePerUnit * listing.quantityAvailable).toLocaleString()}`,
            date: new Date(listing.createdAt || Date.now()).toISOString().split('T')[0],
            status: ['Pending', 'Shipped', 'Delivered'][index % 3],
            payment: ['Paid', 'COD'][index % 2],
            buyerId: listing.seller,
            phone: "+91 9876543210",
            location: "Nagpur, Maharashtra"
          }));
          setOrders(orders);
          setFilteredOrders(orders);
        }
      } catch (err) {
        console.error('Error fetching orders:', err);
        // Set dummy data for demo
        setOrders(getDummyOrders());
        setFilteredOrders(getDummyOrders());
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Filter orders based on tab and search
  useEffect(() => {
    let filtered = orders;

    if (activeTab !== "All") {
      filtered = filtered.filter(o => o.status === activeTab);
    }

    if (searchTerm) {
      filtered = filtered.filter(o =>
        o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.item.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredOrders(filtered);
  }, [activeTab, searchTerm, orders]);

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Pending': return <FaClock className="status-icon pending" />;
      case 'Shipped': return <FaTruck className="status-icon shipped" />;
      case 'Delivered': return <FaCheckCircle className="status-icon delivered" />;
      case 'Cancelled': return <FaTimesCircle className="status-icon cancelled" />;
      default: return <FaBox />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending': return 'pending';
      case 'Shipped': return 'shipped';
      case 'Delivered': return 'delivered';
      case 'Cancelled': return 'cancelled';
      default: return 'default';
    }
  };

  const tabs = [
    { name: "All", count: orders.length },
    { name: "Pending", count: orders.filter(o => o.status === "Pending").length },
    { name: "Shipped", count: orders.filter(o => o.status === "Shipped").length },
    { name: "Delivered", count: orders.filter(o => o.status === "Delivered").length }
  ];

  return (
    <div className="orders-container">
      <div className="orders-header">
        <h2>📦 Order Management</h2>
        <p className="subtitle">Track and manage all your crop orders</p>
      </div>

      {/* Search Bar */}
      <div className="orders-search-bar">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search by Order ID, Customer, or Crop..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Tabs */}
      <div className="orders-tabs">
        {tabs.map(tab => (
          <button
            key={tab.name}
            className={`tab-btn ${activeTab === tab.name ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.name)}
          >
            {tab.name}
            <span className="tab-count">{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Orders List */}
      {loading ? (
        <div className="loading-container">
          <p>Loading orders...</p>
        </div>
      ) : filteredOrders.length > 0 ? (
        <div className="orders-list">
          {filteredOrders.map((order) => (
            <div key={order.id} className={`order-card status-${getStatusColor(order.status)}`}>
              <div className="order-card-header">
                <div className="order-id-section">
                  <h3 className="order-id">{order.id}</h3>
                  <span className="order-date">{order.date}</span>
                </div>
                <div className="order-status">
                  {getStatusIcon(order.status)}
                  <span className={`status-badge ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="order-card-body">
                <div className="order-info-grid">
                  <div className="order-info-item">
                    <label>Crop Item</label>
                    <p className="item-name">{order.item}</p>
                  </div>
                  
                  <div className="order-info-item">
                    <label>Quantity</label>
                    <p className="item-qty">{order.qty}</p>
                  </div>
                  
                  <div className="order-info-item">
                    <label>Total Price</label>
                    <p className="item-price">{order.price}</p>
                  </div>
                  
                  <div className="order-info-item">
                    <label>Payment Status</label>
                    <p className={`payment-status ${order.payment.toLowerCase()}`}>
                      {order.payment}
                    </p>
                  </div>
                </div>

                <div className="order-customer-section">
                  <div className="customer-info">
                    <div className="customer-header">
                      <FaUser className="customer-icon" />
                      <strong>Customer Details</strong>
                    </div>
                    <div className="customer-details">
                      <p><strong>{order.customer}</strong></p>
                      <p><FaPhone /> {order.phone}</p>
                      <p><FaMapMarkerAlt /> {order.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="order-card-footer">
                <button className="btn-view-details">View Full Details</button>
                {order.status === 'Pending' && (
                  <button className="btn-mark-shipped">Mark as Shipped</button>
                )}
                {order.status === 'Shipped' && (
                  <button className="btn-mark-delivered">Mark as Delivered</button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <FaBox className="empty-icon" />
          <p>No orders found</p>
          <p className="empty-subtitle">Orders will appear here once buyers place them</p>
        </div>
      )}
    </div>
  );
};

// Dummy data function
function getDummyOrders() {
  return [
    {
      id: "ORD-7782",
      customer: "Hotel Radisson",
      item: "Sharbati Wheat",
      qty: "500 Kg",
      price: "₹18,000",
      date: "2025-12-20",
      status: "Pending",
      payment: "Paid",
      phone: "+91 9876543210",
      location: "Nagpur, Maharashtra"
    },
    {
      id: "ORD-7783",
      customer: "Fresh Mart",
      item: "Red Onions",
      qty: "100 Kg",
      price: "₹4,500",
      date: "2025-12-19",
      status: "Shipped",
      payment: "COD",
      phone: "+91 8765432109",
      location: "Pune, Maharashtra"
    },
    {
      id: "ORD-7784",
      customer: "Ramesh Wholesaler",
      item: "Potatoes",
      qty: "2000 Kg",
      price: "₹40,000",
      date: "2025-12-18",
      status: "Delivered",
      payment: "Paid",
      phone: "+91 7654321098",
      location: "Mumbai, Maharashtra"
    }
  ];
}

export default Orders;