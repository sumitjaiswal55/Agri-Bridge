import React from 'react';
import Navbar from '../../component/layout/Navbar.jsx';
import Footer from '../../component/layout/Footer.jsx';
import { Truck, ListChecks, CreditCard, BarChart3, Shield, Headphones } from 'lucide-react';
import './Services.css';

const Services = () => {
  const services = [
    {
      icon: <ListChecks size={50} />,
      title: "Easy Listing",
      description: "Upload your produce details in seconds. Set your prices and connect with hundreds of buyers instantly."
    },
    {
      icon: <Truck size={50} />,
      title: "Logistics Support",
      description: "Partner with trusted transporters. We handle pickups, delivery, and ensure your produce reaches buyers fresh."
    },
    {
      icon: <CreditCard size={50} />,
      title: "Instant Payments",
      description: "Get paid immediately after delivery. No delays, no hidden charges. Direct bank transfers to your account."
    },
    {
      icon: <BarChart3 size={50} />,
      title: "Market Insights",
      description: "Real-time market data and pricing trends help you make informed decisions and maximize profits."
    },
    {
      icon: <Shield size={50} />,
      title: "Secure Transactions",
      description: "100% verified buyers and sellers. Advanced security measures protect your interests every step of the way."
    },
    {
      icon: <Headphones size={50} />,
      title: "24/7 Support",
      description: "Our dedicated support team is always ready to help. Chat, call, or email - we're here for you anytime."
    }
  ];

  const forFarmers = [
    "Direct access to bulk buyers without middlemen",
    "Fair and transparent pricing",
    "Instant payment after delivery",
    "Minimal platform fees",
    "Free logistics support",
    "Real-time order tracking"
  ];

  const forBuyers = [
    "Direct sourcing from verified farmers",
    "Fresh, quality produce guaranteed",
    "Flexible order quantities",
    "Competitive pricing",
    "Reliable delivery with tracking",
    "Bulk discounts available"
  ];

  return (
    <div className="services-page">
      <Navbar />

      {/* Hero Section */}
      <section className="services-hero">
        <div className="container">
          <h1>Our Services</h1>
          <p>Comprehensive solutions for farmers and buyers</p>
        </div>
      </section>

      {/* Main Services */}
      <section className="main-services">
        <div className="container">
          <h2>What We Offer</h2>
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Farmers */}
      <section className="for-farmers">
        <div className="container">
          <div className="section-content">
            <div className="section-image">
              <img 
                src="https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?q=80&w=500&h=400&fit=crop" 
                alt="For Farmers"
              />
            </div>
            <div className="section-text">
              <h2>For Farmers</h2>
              <p>Maximize your income and reach new markets with AgriBridge</p>
              <ul className="benefits-list">
                {forFarmers.map((benefit, index) => (
                  <li key={index}>✓ {benefit}</li>
                ))}
              </ul>
              <button className="btn-primary">Join as Farmer</button>
            </div>
          </div>
        </div>
      </section>

      {/* For Buyers */}
      <section className="for-buyers">
        <div className="container">
          <div className="section-content">
            <div className="section-text">
              <h2>For Buyers</h2>
              <p>Source quality produce directly from trusted farmers</p>
              <ul className="benefits-list">
                {forBuyers.map((benefit, index) => (
                  <li key={index}>✓ {benefit}</li>
                ))}
              </ul>
              <button className="btn-primary">Register as Buyer</button>
            </div>
            <div className="section-image">
              <img 
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=500&h=400&fit=crop" 
                alt="For Buyers"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing-section">
        <div className="container">
          <h2>Transparent Pricing</h2>
          <div className="pricing-grid">
            <div className="pricing-card">
              <h3>Farmers</h3>
              <p className="price">₹0</p>
              <p className="period">Zero Commission</p>
              <ul>
                <li>Free to list produce</li>
                <li>Zero platform fees</li>
                <li>Instant settlements</li>
                <li>24/7 support</li>
              </ul>
            </div>
            <div className="pricing-card featured">
              <h3>Buyers</h3>
              <p className="price">Free</p>
              <p className="period">To Browse</p>
              <ul>
                <li>Browse millions of listings</li>
                <li>Direct farmer contact</li>
                <li>Bulk discounts</li>
                <li>Guaranteed freshness</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;