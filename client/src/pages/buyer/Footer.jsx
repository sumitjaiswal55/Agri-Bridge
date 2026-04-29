import React from 'react';
import { 
  Facebook, Twitter, Instagram, Linkedin, 
  Mail, Phone, MapPin, ArrowRight 
} from 'lucide-react';
import './Buyer.css';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-top">
        <div className="footer-container">
          
          {/* Brand & Newsletter */}
          <div className="footer-brand-section">
            <div className="footer-logo">
              <div className="logo-sq">A</div>
              <h2>Agri<span>Bridge</span></h2>
            </div>
            <p className="footer-desc">
              Connecting Bharat's farmers directly to businesses. Freshness 
              delivered from the roots to your warehouse.
            </p>
            <div className="newsletter-box">
              <input type="email" placeholder="Your Email for Mandi Updates" />
              <button><ArrowRight size={18} /></button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links-grid">
            <div className="link-col">
              <h4>Platform</h4>
              <ul>
                <li>About Us</li>
                <li>Mandi Rates</li>
                <li>Direct Farm Sourcing</li>
                <li>Logistics Partner</li>
              </ul>
            </div>
            <div className="link-col">
              <h4>Support</h4>
              <ul>
                <li>Help Center</li>
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
                <li>Returns & Refund</li>
              </ul>
            </div>
            <div className="link-col">
              <h4>Contact</h4>
              <ul className="contact-list">
                <li><MapPin size={16} /> Nagpur Mandi, MH</li>
                <li><Phone size={16} /> +91 98765 43210</li>
                <li><Mail size={16} /> support@agribridge.in</li>
              </ul>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-container">
          <p>© 2026 AgriBridge Tech. All rights reserved.</p>
          <div className="social-links">
            <a href="#"><Facebook size={20} /></a>
            <a href="#"><Twitter size={20} /></a>
            <a href="#"><Instagram size={20} /></a>
            <a href="#"><Linkedin size={20} /></a>
          </div>
          <div className="payment-badges">
            <span className="p-badge">UPI</span>
            <span className="p-badge">COD</span>
            <span className="p-badge">Cards</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;