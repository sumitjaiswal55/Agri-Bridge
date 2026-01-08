// import logo from '../../assets/logo.png';
import { useState, useEffect } from "react";
import Signup from "../../pages/auth/Signup";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container nav-container">
        <a className="navbar-brand" href="/">
          <span className="brand-agri">Agri</span><span className="brand-bridge">Bridge</span>
        </a>

        <ul className="nav-links">
          <li><a href="#about">About Us</a></li>
          <li><a href="#services">Our Services</a></li>
          <li><a href="#process">How it Works</a></li>
        </ul>

        <div className="nav-buttons">
          <button className="btn btn-outline">Login</button>
          <button className="btn btn-filled" onClick={() => navigate("/signup")} >Register</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
