import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, MapPin, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';


const Cart = () => {
  const navigate = useNavigate();

  // --- Mock User Address ---
  const [address, setAddress] = useState({
    name: "Sumit Jaiswal",
    type: "Home",
    fullAddress: "H.No 45, Near Ram Mandir, Rampur Village, Nagpur, Maharashtra - 440001",
    phone: "7084525212"
  });

  // --- Mock Cart Items ---
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Sharbati Wheat (MP Special)",
      price: 2600,
      unit: "Quintal",
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=300&q=80",
      quantity: 1,
      seller: "Ram Charan"
    },
    {
      id: 2,
      name: "Organic Turmeric",
      price: 120,
      unit: "Kg",
      image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=300&q=80",
      quantity: 5,
      seller: "Vedic Farms"
    }
  ]);

  // --- Handlers ---
  const updateQuantity = (id, change) => {
    setCartItems(items =>
      items.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + change;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      })
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  // --- Calculations ---
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const platformFee = 50; // Fixed fee for example
  const deliveryFee = 0; // Free for now
  const total = subtotal + platformFee + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart-container">
        <div className="empty-cart-box">
          <ShoppingBag size={64} color="#ccc" />
          <h2>Your Cart is Empty</h2>
          <p>Looks like you haven't added any produce yet.</p>
          <button className="continue-shopping-btn" onClick={() => navigate('/')}>
            Explore Mandi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        
        <h1 className="page-title">My Cart ({cartItems.length})</h1>

        <div className="cart-layout">
          
          {/* --- LEFT SIDE: Address & Items --- */}
          <div className="cart-main">
            
            {/* 1. Address Section */}
            <div className="section-card address-card">
              <div className="card-header">
                <h3>Delivery Address</h3>
                <button className="change-btn">Change</button>
              </div>
              <div className="address-content">
                <div className="icon-circle">
                  <MapPin size={20} />
                </div>
                <div className="address-details">
                  <div className="name-row">
                    <span className="addr-type">{address.type}</span>
                    <span className="addr-name">{address.name}</span>
                    <span className="addr-phone">+91 {address.phone}</span>
                  </div>
                  <p className="full-addr">{address.fullAddress}</p>
                </div>
              </div>
            </div>

            {/* 2. Cart Items List */}
            <div className="section-card items-card">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  
                  {/* Image */}
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                  </div>

                  {/* Details */}
                  <div className="item-details">
                    <h4 className="item-name">{item.name}</h4>
                    <span className="item-seller">Sold by: {item.seller}</span>
                    <div className="item-price">
                      ₹{item.price} <span className="item-unit">/ {item.unit}</span>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="item-actions">
                    <div className="quantity-controls">
                      <button onClick={() => updateQuantity(item.id, -1)} disabled={item.quantity === 1}>
                        <Minus size={14} />
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)}>
                        <Plus size={14} />
                      </button>
                    </div>
                    <button className="remove-btn" onClick={() => removeItem(item.id)}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* --- RIGHT SIDE: Order Summary --- */}
          <div className="cart-sidebar">
            <div className="section-card summary-card">
              <h3>Order Summary</h3>
              
              <div className="bill-row">
                <span>Item Total</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="bill-row">
                <span>Platform Fee</span>
                <span>₹{platformFee}</span>
              </div>
              <div className="bill-row success-text">
                <span>Delivery Fee</span>
                <span>Free</span>
              </div>

              <div className="divider"></div>

              <div className="bill-row total-row">
                <span>Total Amount</span>
                <span>₹{total.toLocaleString()}</span>
              </div>

              <button className="checkout-btn">
                Proceed to Pay <ArrowRight size={18} />
              </button>

              <div className="safety-badge">
                <ShieldCheck size={16} />
                <span>Safe & Secure Payments</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;