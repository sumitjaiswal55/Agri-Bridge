import React, { useState } from 'react';
import { 
  User, Package, Heart, MapPin, 
  CreditCard, Bell, LogOut, ChevronRight 
} from 'lucide-react';
import './Buyer.css';

const Profile = () => {
  const [activeSection, setActiveSection] = useState('orders');
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div className="buyer-profile-root">
      <div className="profile-hero">
        <div className="hero-content">
          <div className="avatar-big">{user?.name?.charAt(0)}</div>
          <div className="user-text">
            <h1>{user?.name}</h1>
            <p>{user?.email} • Member since 2024</p>
          </div>
        </div>
      </div>

      <div className="profile-main-layout">
        {/* --- LEFT: Navigation Menu --- */}
        <aside className="profile-nav-card">
          <button 
            className={activeSection === 'orders' ? 'active' : ''} 
            onClick={() => setActiveSection('orders')}
          >
            <Package size={20} /> My Orders
          </button>
          <button 
            className={activeSection === 'wishlist' ? 'active' : ''} 
            onClick={() => setActiveSection('wishlist')}
          >
            <Heart size={20} /> Wishlist
          </button>
          <button 
            className={activeSection === 'address' ? 'active' : ''} 
            onClick={() => setActiveSection('address')}
          >
            <MapPin size={20} /> Saved Addresses
          </button>
          <button 
            className={activeSection === 'payments' ? 'active' : ''} 
            onClick={() => setActiveSection('payments')}
          >
            <CreditCard size={20} /> Payment Methods
          </button>
          <div className="nav-divider"></div>
          <button className="logout-nav-item" onClick={handleLogout}>
            <LogOut size={20} /> Logout
          </button>
        </aside>

        {/* --- RIGHT: Content Area --- */}
        <section className="profile-render-area">
          {activeSection === 'orders' && <OrderHistory />}
          {activeSection === 'wishlist' && <WishlistGrid />}
          {/* Baki components hum line-wise add kar sakte hain */}
        </section>
      </div>
    </div>
  );
};

// --- Sub-Component: Order History ---
const OrderHistory = () => {
  return (
    <div className="content-section">
      <h2>Recent Orders</h2>
      <div className="order-card-pro">
        <div className="order-header">
          <div className="order-id">Order #AB-9921</div>
          <span className="status-pill arriving">Arriving Tomorrow</span>
        </div>
        <div className="order-body">
          <img src="https://via.placeholder.com/60) " alt="product" />
          <div className="order-info">
            <h4>Organic Red Onions</h4>
            <p>Qty: 50Kg • Total: ₹1850</p>
          </div>
          <button className="track-btn">Track Order</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;