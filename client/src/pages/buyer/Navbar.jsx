import React, { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronDown,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Buyer.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // Auth State check
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    // 1. Scroll Listener
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    // 2. Cart Count Listener (Real-time update)
    const updateCount = () => {
      const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(savedCart.length);
    };

    updateCount();
    // Storage event listen karega agar dusre tab mein cart change ho
    window.addEventListener("storage", updateCount);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("storage", updateCount);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // localStorage.removeItem('cart'); // Optionally cart clear kar sakte ho
    window.location.href = "/"; // Hard reload taaki state clear ho jaye
  };

  return (
    <header className={`main-header ${isScrolled ? "header-scrolled" : ""}`}>
      <nav className="navbar-container">
        <div className="nav-brand" onClick={() => navigate("/")}>
          <div className="logo-box">A</div>
          <h1>
            Agri<span>Bridge</span>
          </h1>
        </div>

        <div className="location-selector">
          <MapPin size={20} className="pin-icon" />
          <div className="location-info">
            <span className="loc-title">Deliver to</span>
            <span className="loc-value">
              {user?.location?.address
                ? `${user.location.address.substring(0, 15)}...`
                : "Nagpur Mandi"}
              <ChevronDown size={14} />
            </span>
          </div>
        </div>

        <div className="nav-search">
          <div className="search-bar">
            <Search size={18} className="search-icon" />
            <input type="text" placeholder="Search products..." />
          </div>
        </div>

        <div className="nav-actions">
          {token ? (
            /* AGAR LOGGED IN HAI: Toh Profile dikhao (Logout ki jagah) */
            <div
              className="action-item hide-mobile"
              onClick={() => navigate("/profile")}
            >
              <div className="user-avatar-circle">
                {user?.name?.charAt(0).toUpperCase() || <User size={20} />}
              </div>
              <span>{user?.name?.split(" ")[0] || "Profile"}</span>
            </div>
          ) : (
            /* AGAR LOGGED IN NAHI HAI: Toh Login dikhao */
            <div
              className="action-item hide-mobile"
              onClick={() => navigate("/login")}
            >
              <User size={22} />
              <span>Login</span>
            </div>
          )}

          {/* Cart Button (Always Visible) */}
          <div className="cart-action" onClick={() => navigate("/cart")}>
            <div className="cart-icon-wrapper">
              <ShoppingCart size={22} />
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </div>
            <div className="cart-text-side">
              <span className="cart-label">Cart</span>
              {/* Optional: Yahan total price bhi dikha sakte ho Blinkit style mein */}
            </div>
          </div>

          <button
            className="mobile-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {/* MOBILE OVERLAY */}
      {isMobileMenuOpen && (
        <div className="mobile-nav-menu">
          <div className="mobile-search-box">
            <input type="text" placeholder="Search products..." />
          </div>
          <div className="mobile-links">
            {token ? (
              <>
                <p
                  onClick={() => {
                    navigate("/profile");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  My Profile
                </p>
                <p
                  onClick={() => {
                    navigate("/orders");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Bulk Orders
                </p>
                <p onClick={handleLogout} style={{ color: "#ff5252" }}>
                  Logout
                </p>
              </>
            ) : (
              <p
                onClick={() => {
                  navigate("/login");
                  setIsMobileMenuOpen(false);
                }}
              >
                Login / Signup
              </p>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
