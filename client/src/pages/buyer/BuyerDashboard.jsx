import React, { useState, useEffect } from 'react';
import { 
  Search, MapPin, ShoppingCart, User, Menu, X, 
  ChevronLeft, ChevronRight, SlidersHorizontal, 
  Wheat, Leaf, Apple, Flame, Sprout 
} from 'lucide-react';

// Product Grid Component ko import kar rahe hain (Next step me banayenge)
// import ProductGrid from './ProductGrid'; 
import './Buyer.css'; // Separate CSS file

const BuyerDashboard = () => {
  // --- States ---
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [filters, setFilters] = useState({
    priceRange: [0, 10000],
    grades: [],
    location: ''
  });

  // --- Hero Slider Data ---
  const slides = [
    { id: 1, title: 'Seasonal Harvest 2026', subtitle: 'Fresh Wheat & Rice - Direct from Farms', cta: 'Shop Now', class: 'slide-emerald' },
    { id: 2, title: 'Bulk Deal Offers', subtitle: 'Save up to 30% on wholesale orders', cta: 'View Deals', class: 'slide-amber' },
    { id: 3, title: 'Organic Collection', subtitle: 'Certified organic produce from Nashik', cta: 'Explore', class: 'slide-green' }
  ];

  // --- Category Data ---
  const categories = [
    { id: 1, name: 'Grains', icon: Wheat, colorClass: 'cat-amber' },
    { id: 2, name: 'Vegetables', icon: Leaf, colorClass: 'cat-green' },
    { id: 3, name: 'Fruits', icon: Apple, colorClass: 'cat-red' },
    { id: 4, name: 'Spices', icon: Flame, colorClass: 'cat-orange' },
    { id: 5, name: 'Organic', icon: Sprout, colorClass: 'cat-emerald' },
  ];

  // --- Slider Logic ---
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="dashboard-container">
      
      {/* ================= NAVIGATION ================= */}
      <nav className="navbar">
        <div className="nav-wrapper">
          <div className="nav-left">
            <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Menu />
            </button>
            <div className="brand">
              <div className="logo-box">A</div>
              <h1>Agri<span>Bridge</span></h1>
            </div>
          </div>

          <div className="nav-center">
            <div className="search-box">
              <Search className="search-icon" />
              <input type="text" placeholder="Search for Crops, Vegetables..." />
            </div>
          </div>

          <div className="nav-right">
            <div className="location-box">
              <MapPin className="icon-green" />
              <div>
                <small>Deliver to</small>
                <span>Nagpur Mandi</span>
              </div>
            </div>
            <button className="icon-btn cart-btn">
              <ShoppingCart />
              <span className="badge">3</span>
            </button>
            <button className="icon-btn">
              <User />
            </button>
          </div>
        </div>
      </nav>

      {/* ================= HERO SLIDER ================= */}
      <section className="hero-slider">
        {slides.map((slide, index) => (
          <div key={slide.id} className={`slide ${index === currentSlide ? 'active' : ''} ${slide.class}`}>
            <div className="slide-content">
              <h2>{slide.title}</h2>
              <p>{slide.subtitle}</p>
              <button className="cta-btn">{slide.cta}</button>
            </div>
          </div>
        ))}
        <button className="slider-arrow left" onClick={prevSlide}><ChevronLeft /></button>
        <button className="slider-arrow right" onClick={nextSlide}><ChevronRight /></button>
        
        <div className="slider-dots">
          {slides.map((_, index) => (
            <span key={index} className={`dot ${index === currentSlide ? 'active' : ''}`} onClick={() => setCurrentSlide(index)}></span>
          ))}
        </div>
      </section>

      {/* ================= CATEGORY RAIL ================= */}
      <section className="category-rail">
        <div className="rail-wrapper">
          <h3>Categories</h3>
          <div className="rail-items">
            {categories.map((cat) => (
              <div key={cat.id} className="cat-item">
                <div className={`cat-icon ${cat.colorClass}`}>
                  <cat.icon />
                </div>
                <span>{cat.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= MAIN LAYOUT (Filter + Products) ================= */}
      <div className="main-layout">
        
        {/* Mobile Filter Toggle */}
        <div className="mobile-filter-bar">
          <button className="filter-toggle-btn" onClick={() => setMobileFiltersOpen(true)}>
            <SlidersHorizontal size={18} /> Filters
          </button>
        </div>

        {/* --- SIDEBAR FILTERS --- */}
        <aside className={`filter-sidebar ${mobileFiltersOpen ? 'open' : ''}`}>
          <div className="sidebar-header">
            <h3>Filters</h3>
            <button className="close-btn" onClick={() => setMobileFiltersOpen(false)}><X /></button>
          </div>

          <div className="filter-group">
            <label>Price Range (per Quintal)</label>
            <input 
              type="range" min="0" max="10000" 
              value={filters.priceRange[1]} 
              onChange={(e) => setFilters({...filters, priceRange: [0, parseInt(e.target.value)]})}
            />
            <div className="price-labels">
              <span>₹0</span>
              <span className="price-highlight">₹{filters.priceRange[1]}</span>
            </div>
          </div>

          <div className="filter-group">
            <label>Quality Grade</label>
            <div className="checkbox-list">
              {['Grade A', 'Grade B', 'Grade C'].map(g => (
                <label key={g}><input type="checkbox" /> {g}</label>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <label>Location</label>
            <select>
              <option>All Mandis</option>
              <option>Nagpur</option>
              <option>Nashik</option>
              <option>Pune</option>
            </select>
          </div>

          <button className="apply-btn">Apply Filters</button>
        </aside>

        {/* --- PRODUCT GRID AREA --- */}
        <main className="product-content-area">
          {/* Yahan par wo ProductGrid component render hoga jo hum next step me banayenge */}
          <ProductGrid /> 
        </main>

      </div>
    </div>
  );
};

export default BuyerDashboard;