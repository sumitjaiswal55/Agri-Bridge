import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// CSS file import karna mat bhulna agar alag file hai
import "./Layout.css"; 

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Menu open/close state
  const navigate = useNavigate();

  // Scroll logic
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Menu toggle function
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Jab koi link click ho, toh menu auto-close hona chahiye mobile pe
  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container nav-container">
        {/* Brand Logo */}
        <a className="navbar-brand" href="/" onClick={closeMenu}>
          <span className="brand-agri">Agri</span>
          <span className="brand-bridge">Bridge</span>
        </a>

        {/* Hamburger Icon */}
        <div className={`hamburger ${isOpen ? "active" : ""}`} onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        {/* Navigation Links & Buttons Wrapper */}
        <div className={`nav-menu ${isOpen ? "active" : ""}`}>
          <ul className="nav-links">
            <li><a href="/about" onClick={closeMenu}>About Us</a></li>
            <li><a href="/services" onClick={closeMenu}>Our Services</a></li>
            <li><a href="/process" onClick={closeMenu}>How it Works</a></li>
          </ul>

          <div className="nav-buttons">
            <button 
              className="btn btn-outline" 
              onClick={() => { navigate("/login"); closeMenu(); }}
            >
              Login
            </button>
            <button 
              className="btn btn-filled" 
              onClick={() => { navigate("/signup"); closeMenu(); }}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;