import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, MapPin, ArrowRight, ShoppingBag, ShieldCheck, Truck } from 'lucide-react';
import "./Buyer.css";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({
    name: "User",
    type: "Home",
    fullAddress: "Loading address...",
    phone: ""
  });

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart);
    
    const user = JSON.parse(localStorage.getItem('user'));
    if(user) {
      setAddress({
        name: user.name,
        type: "Mandi/Shop",
        fullAddress: user.location?.address || "Nagpur Mandi Main Gate, Section A",
        phone: user.phone || "9876543210"
      });
    }
  }, []);

  // Sync Cart to LocalStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

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

  const handleCheckout = async () => {
    if(cartItems.length === 0) return;
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      // Scalable way: Bhejte waqt orders ko group kar sakte hain seller ke basis par
      for(const item of cartItems) {
        await fetch(`${import.meta.env.VITE_API_URL}/api/orders/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
              sellerId: item.sellerId,
              listingId: item.id,
              item: item.name,
              quantity: item.quantity,
              unit: item.unit,
              totalPrice: item.price * item.quantity,
              deliveryAddress: address,
              paymentStatus: "COD"
          })
        });
      }
      
      setCartItems([]);
      localStorage.removeItem('cart');
      alert("Order placed successfully! AgriBridge Logistics will contact you shortly.");
      navigate('/');
    } catch(err) {
      alert("Checkout failed. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const platformFee = 20; // Nominal AgriBridge fee
  const deliveryFee = subtotal > 1000 ? 0 : 50; // Incentive for bulk buy
  const total = subtotal + platformFee + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart-view">
        <div className="empty-content">
          <div className="empty-icon-box"><ShoppingBag size={80} /></div>
          <h2>Your cart is as empty as a dry field!</h2>
          <p>Add some fresh farm produce to start your order.</p>
          <button className="go-home-btn" onClick={() => navigate('/')}>Browse Mandi</button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page-wrapper">
      <div className="cart-content-container">
        <header className="cart-header-row">
          <h1>Review Order <span>({cartItems.length} items)</span></h1>
        </header>

        <div className="cart-main-grid">
          {/* LEFT: Items & Delivery */}
          <div className="cart-left-col">
            
            <div className="cart-section address-section">
              <div className="section-head">
                <MapPin size={20} className="icon-green" />
                <h3>Delivery to <span>{address.type}</span></h3>
                <button className="edit-link">Edit</button>
              </div>
              <div className="address-info-box">
                <strong>{address.name} • +91 {address.phone}</strong>
                <p>{address.fullAddress}</p>
              </div>
            </div>

            <div className="cart-section items-section">
              <div className="section-head">
                <Truck size={20} className="icon-green" />
                <h3>Shipment from Farmer Direct</h3>
              </div>
              {cartItems.map((item) => (
                <div key={item.id} className="cart-product-row">
                  <div className="p-img"><img src={item.image} alt="" /></div>
                  <div className="p-info">
                    <h4>{item.name}</h4>
                    <p>Farm: {item.seller || 'Verified Farmer'}</p>
                    <div className="p-price">₹{item.price} <span>/ {item.unit}</span></div>
                  </div>
                  <div className="p-controls">
                    <div className="qty-box">
                      <button onClick={() => updateQuantity(item.id, -1)}><Minus size={14}/></button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)}><Plus size={14}/></button>
                    </div>
                    <button className="del-btn" onClick={() => removeItem(item.id)}><Trash2 size={18}/></button>
                  </div>
                  <div className="p-total">₹{item.price * item.quantity}</div>
                </div>
              ))}
            </div>

            <div className="cart-trust-footer">
              <ShieldCheck size={18} />
              <span>AgriBridge ensures 100% Quality Check at pickup point.</span>
            </div>
          </div>

          {/* RIGHT: Bill Details */}
          <div className="cart-right-col">
            <div className="bill-card">
              <h3>Bill Details</h3>
              <div className="bill-item">
                <span>Item Total</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="bill-item">
                <span>Platform Handling Fee</span>
                <span>₹{platformFee}</span>
              </div>
              <div className="bill-item">
                <span>Delivery Charges</span>
                <span className={deliveryFee === 0 ? "free-text" : ""}>
                  {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                </span>
              </div>
              
              <div className="bill-divider"></div>
              
              <div className="bill-total">
                <span>To Pay</span>
                <span>₹{total.toLocaleString()}</span>
              </div>

              <div className="payment-method-box">
                <label>Payment Method</label>
                <div className="method-pill">Cash on Delivery (COD)</div>
              </div>

              <button 
                className={`main-checkout-btn ${loading ? 'loading' : ''}`} 
                onClick={handleCheckout}
                disabled={loading}
              >
                {loading ? "Placing Order..." : "Place Order Now"} <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;