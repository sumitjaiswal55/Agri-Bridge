import React, { useState, } from 'react';
import { Search, MapPin, ShoppingCart, User, Menu, X } from 'lucide-react';
import Profile from './Profile';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div>
      <nav className="navbar">
        <div className="nav-wrapper">
          
          {/* 1. LEFT SIDE: Logo Only */}
          <div className="nav-left">
            <div className="brand">
              <div className="logo-box">A</div>
              <h1>Agri<span>Bridge</span></h1>
            </div>
          </div>

          {/* 2. CENTER: Search (Hidden on Mobile) */}
          <div className="nav-center">
            <div className="search-box">
              <Search className="search-icon" />
              <input type="text" placeholder="Search for Crops, Vegetables..." />
            </div>
          </div>

          {/* 3. RIGHT: Actions (Hidden on Mobile) */}
          <div className="nav-right">
            <div className="location-box">
              <MapPin className="icon-green" />
              <div>
                <small>Deliver to</small>
                <span>Nagpur Mandi</span>
              </div>
            </div>
            <button className="icon-btn cart-btn" onClick={() => navigate('/cart')}>
              <ShoppingCart size={22} />
              <span className="badge">3</span>
            </button>
            <button className="icon-btn" onClick={() => navigate('/profile')}>
              <User size={22} />
              
            </button>
          </div>

          {/* 4. HAMBURGER (Visible Only on Mobile - Moved Outside nav-left) */}
          <button 
            className="mobile-menu-btn" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

        </div>
      </nav>

      {/* MOBILE DROPDOWN */}
      {mobileMenuOpen && (
        <div className="mobile-menu-container">
          <div className="mobile-search">
             <div className="search-box">
              <Search className="search-icon" />
              <input type="text" placeholder="Search..." />
            </div>
          </div>

          <div className="mobile-actions">
            <div className="mobile-item">
              <MapPin className="icon-green" />
              <span>Deliver to: <strong>Nagpur Mandi</strong></span>
            </div>
            <div className="mobile-item">
              <ShoppingCart />
              <span>My Cart (3)</span>
            </div>
            <div className="mobile-item">
              <User />
              <span>My Profile</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}