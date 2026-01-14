import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Layout.css"; 

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        {/* Brand Logo */}
        <Link className="navbar-brand" to="/" onClick={closeMenu}>
          <span className="brand-agri">Agri</span>
          <span className="brand-bridge">Bridge</span>
        </Link>

        {/* Hamburger - Ab Right Side me dikhega */}
        <div className={`hamburger ${isOpen ? "active" : ""}`} onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        {/* Menu Wrapper */}
        <div className={`nav-menu ${isOpen ? "active" : ""}`}>
          <ul className="nav-links">
            <li><Link to="/products" onClick={closeMenu}>Products</Link></li>
            <li><Link to="/about" onClick={closeMenu}>About Us</Link></li>
            <li><Link to="/services" onClick={closeMenu}>Services</Link></li>
            <li><Link to="/process" onClick={closeMenu}>How it Works</Link></li>
          </ul>

          <div className="nav-buttons">
            <button className="btn-outline" onClick={() => { navigate("/login"); closeMenu(); }}>
              Login
            </button>
            <button className="btn-filled" onClick={() => { navigate("/signup"); closeMenu(); }}>
              Register
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;