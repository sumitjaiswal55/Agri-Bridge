import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Instagram, MapPin, Phone, Mail } from "lucide-react";
import "./Layout.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: "About Us", href: "/about" },
      { label: "Our Services", href: "/services" },
      { label: "Contact Us", href: "/contact" },
      { label: "FAQ", href: "/faq" },
    ],
    support: [
      { label: "Contact Us", href: "/contact" },
      { label: "FAQ", href: "/faq" },
      { label: "Documentation", href: "/contact" },
      { label: "Support", href: "/contact" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/privacy" },
      { label: "Cookie Policy", href: "/privacy" },
      { label: "Disclaimer", href: "/privacy" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ];

  const contactInfo = [
    { icon: MapPin, text: "123 Agricultural Street, Farm City, FC 12345" },
    { icon: Phone, text: "+1 (555) 123-4567" },
    { icon: Mail, text: "info@agribridge.com" },
  ];

  return (
    <footer className="footer-wrapper">
      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="footer-container">
          {/* Brand Section */}
          <section className="footer-section footer-brand-section">
            <div className="footer-brand-header">
              <h3 className="footer-brand-title">
                <span className="brand-agri">Agri</span>
                <span className="brand-bridge">Bridge</span>
              </h3>
            </div>
            <p className="footer-brand-tagline">
              Empowering farmers and connecting markets for sustainable agricultural growth.
            </p>
            <div className="footer-socials">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="social-icon"
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </section>

          {/* Company Links */}
          <section className="footer-section footer-links-section">
            <h4 className="footer-section-title">Company</h4>
            <ul className="footer-links-list">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link to={link.href} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Support Links */}
          <section className="footer-section footer-links-section">
            <h4 className="footer-section-title">Support</h4>
            <ul className="footer-links-list">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <Link to={link.href} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Legal Links */}
          <section className="footer-section footer-links-section">
            <h4 className="footer-section-title">Legal</h4>
            <ul className="footer-links-list">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <Link to={link.href} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Contact Info */}
          <section className="footer-section footer-contact-section">
            <h4 className="footer-section-title">Get in Touch</h4>
            <ul className="footer-contact-list">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <li key={index} className="contact-item">
                    <Icon className="contact-icon" size={18} />
                    <span className="contact-text">{info.text}</span>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      </div>

      {/* Footer Divider */}
      <div className="footer-divider"></div>

      {/* Footer Bottom - Copyright & Credits */}
      <div className="footer-bottom">
        <div className="footer-container">
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              &copy; {currentYear} <strong>AgriBridge</strong>. All rights reserved.
            </p>
            <p className="footer-credits">
              Designed & Developed with <span className="heart">❤️</span> by <strong>Sumit</strong>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;