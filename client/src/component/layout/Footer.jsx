import React from "react";
import logo from "../../assets/logo.png"; // Path check kar lena

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container footer-content">
        
        {/* Logo & Tagline */}
        <div className="footer-brand">
          <img src={logo} alt="AgriBridge Logo" className="footer-logo" />
          <p className="footer-tagline">
            Empowering Farmers. Connecting Markets. Growing Together.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="footer-nav">
          <a href="/aboutus" className="footer-link">About Us</a>
          <a href="/services" className="footer-link">Our Services</a>
          <a href="/contact" className="footer-link">Contact Us</a>
        </div>

        {/* Divider Line */}
        <div className="footer-divider"></div>

        {/* Copyright & Credits */}
        <div className="footer-credits">
          <p>
            &copy; {new Date().getFullYear()} <strong>AgriBridge</strong>. Made with ❤️ by <strong>Sumit</strong> | BCA Project
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;