import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, ChevronRight,  
  Wheat, Leaf, Apple, Flame, Sprout 
} from 'lucide-react';

// Product Grid Component ko import kar rahe hain (Next step me banayenge)
import ProductGrid from './ProductGrid'; 
import './buyer.css'; // Separate CSS file
import Navbar from './Navbar';
import Filter from "./Filter";

const BuyerDashboard = () => {
  // --- States ---
  const [currentSlide, setCurrentSlide] = useState(0);

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
      
      <Navbar />

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
        {/* --- SIDEBAR FILTERS --- */}
        <Filter />

        {/* --- PRODUCT GRID AREA --- */}
        <main className="product-content-area">
          <ProductGrid /> 
        </main>

      </div>
    </div>
  );
};

export default BuyerDashboard;
