import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Layout.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <nav className={`custom-navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-container">

          {/* Logo - Left */}
          <Link to="/" className="nav-brand" onClick={closeMenu}>
            <span className="text-agri">Agri</span>
            <span className="text-bridge">Bridge</span>
          </Link>

          {/* Desktop Links */}
          <ul className="nav-links-wrapper">
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/services">Our Services</Link></li>
            <li><Link to="/process">How it Works</Link></li>
          </ul>

          {/* Desktop Auth Buttons */}
          <div className="nav-desktop-auth">
            <button className="nav-btn-login" onClick={() => navigate("/login")}>Login</button>
            <button className="nav-btn-signup" onClick={() => navigate("/signup")}>Register</button>
          </div>

          {/* Hamburger - Mobile Right */}
          <div className={`nav-hamburger ${isOpen ? "active" : ""}`} onClick={toggleMenu}>
            <span className="nav-bar"></span>
            <span className="nav-bar"></span>
            <span className="nav-bar"></span>
          </div>

        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`nav-overlay ${isOpen ? "show" : ""}`} onClick={closeMenu}></div>

      <ul className={`mobile-menu ${isOpen ? "open" : ""}`}>
        <li className="mobile-header">Menu</li>
        <li><Link to="/about" onClick={closeMenu}>About Us</Link></li>
        <li><Link to="/services" onClick={closeMenu}>Our Services</Link></li>
        <li><Link to="/process" onClick={closeMenu}>How it Works</Link></li>

        <div className="mobile-auth-btns">
          <button className="nav-btn-login" onClick={() => { navigate("/login"); closeMenu(); }}>Login</button>
          <button className="nav-btn-signup" onClick={() => { navigate("/signup"); closeMenu(); }}>Register</button>
        </div>
      </ul>
    </>
  );
};

export default Navbar;
