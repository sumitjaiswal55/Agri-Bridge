import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Layout.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle body scroll lock
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const handleNavClick = (path) => {
    navigate(path);
    closeMenu();
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className={`navbar-wrapper ${scrolled ? "navbar-scrolled" : ""}`}>
        <div className="navbar-inner">
          {/* Logo Section */}
          <Link to="/" className="navbar-logo" onClick={closeMenu}>
            <span className="logo-agri">Agri</span>
            <span className="logo-bridge">Bridge</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="navbar-desktop-menu">
            <ul className="navbar-links-list">
              <li><Link to="/about" className="navbar-link">About Us</Link></li>
              <li><Link to="/services" className="navbar-link">Our Services</Link></li>
              <li><Link to="/process" className="navbar-link">How it Works</Link></li>
            </ul>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="navbar-desktop-buttons">
            <button 
              className="navbar-btn navbar-btn-login" 
              onClick={() => handleNavClick("/login")}
            >
              Login
            </button>
            <button 
              className="navbar-btn navbar-btn-signup" 
              onClick={() => handleNavClick("/signup")}
            >
              Register
            </button>
          </div>

          {/* Mobile Hamburger Menu */}
          <button 
            className={`navbar-hamburger ${menuOpen ? "hamburger-open" : ""}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`navbar-overlay ${menuOpen ? "overlay-visible" : ""}`}
        onClick={closeMenu}
        role="presentation"
      ></div>

      {/* Mobile Slide Menu */}
      <div className={`navbar-mobile-menu ${menuOpen ? "menu-open" : ""}`}>
        <div className="mobile-menu-header">
          <h2 className="mobile-menu-title">Menu</h2>
          <button 
            className="mobile-menu-close" 
            onClick={closeMenu}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <div className="mobile-menu-content">
          <ul className="mobile-menu-list">
            <li className="mobile-menu-item">
              <Link to="/about" className="mobile-menu-link" onClick={closeMenu}>
                About Us
              </Link>
            </li>
            <li className="mobile-menu-item">
              <Link to="/services" className="mobile-menu-link" onClick={closeMenu}>
                Our Services
              </Link>
            </li>
            <li className="mobile-menu-item">
              <Link to="/process" className="mobile-menu-link" onClick={closeMenu}>
                How it Works
              </Link>
            </li>
          </ul>
        </div>

        <div className="mobile-menu-footer">
          <button 
            className="navbar-btn navbar-btn-login" 
            onClick={() => handleNavClick("/login")}
          >
            Login
          </button>
          <button 
            className="navbar-btn navbar-btn-signup" 
            onClick={() => handleNavClick("/signup")}
          >
            Register
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
