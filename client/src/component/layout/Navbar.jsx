import { useState, useEffect } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import "./Layout.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Navigation links configuration
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
    { label: "FAQ", href: "/faq" },
  ];

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
              {navLinks.map((link) => (
                <li key={link.href}>
                  <NavLink
                    to={link.href}
                    className={({ isActive }) =>
                      isActive ? "navbar-link active-link" : "navbar-link"
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
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
            {navLinks.map((link) => (
              <li className="mobile-menu-item" key={link.href}>
                <Link
                  to={link.href}
                  className="mobile-menu-link"
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              </li>
            ))}
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
