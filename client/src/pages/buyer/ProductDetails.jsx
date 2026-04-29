import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  ArrowLeft, MapPin, Calendar, User, Package, 
  ShieldCheck, Phone, MessageCircle, Star, Truck, Share2, Heart 
} from 'lucide-react';
import { products as dummyProducts } from './dummyData';
import "./Buyer.css";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [adding, setAdding] = useState(false); // Button feedback ke liye

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProductDetails = async () => {
      try {
        if (id && id.length < 10) {
          const dummyProduct = dummyProducts.find(p => p.id.toString() === id);
          if (dummyProduct) {
            setProduct({
              id: dummyProduct.id,
              name: dummyProduct.name,
              category: dummyProduct.category,
              pricePerUnit: dummyProduct.price,
              quantity: dummyProduct.unit,
              quantityAvailable: dummyProduct.stock,
              images: [{url: dummyProduct.image}],
              seller: { name: dummyProduct.farm, phone: "9876543210" },
              harvestDate: new Date().toISOString(),
              grade: 'Grade A+',
              description: dummyProduct.description || "Premium farm-fresh organic produce."
            });
            setLoading(false);
            return;
          }
        }
        const res = await axios.get(`https://agribridgebackend-xi.vercel.app/api/listings/${id}`); 
        if (res.data) setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [id]);

  // --- 1. Silent Add to Cart (No Alert) ---
  const handleAddToCart = () => {
    setAdding(true);
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const isItemInCart = existingCart.find(item => item.id === product.id);

    if (!isItemInCart) {
      const updatedCart = [...existingCart, {
        id: product.id,
        name: product.name,
        price: product.pricePerUnit,
        image: product.images[0].url,
        unit: product.quantity,
        quantity: 1,
        seller: product.seller.name
      }];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      
      // Navbar ko batane ke liye ki count badh gaya hai
      window.dispatchEvent(new Event("storage")); 
    }

    // 1 second baad button wapas normal ho jayega
    setTimeout(() => setAdding(false), 800);
  };

  const handleBuyNow = () => {
    handleAddToCart(); 
    navigate('/cart');      
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          url: window.location.href,
        });
      } catch (err) {}
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loading) return <div className="pd-loader-container"><div className="pd-spinner"></div></div>;

  const imageUrl = (product.images && product.images.length > 0) ? product.images[0].url : "https://via.placeholder.com/600";

  return (
    <div className="pd-page-wrapper">
      <div className="pd-container">
        
        <header className="pd-top-nav">
          <button onClick={() => navigate(-1)} className="pd-back-link">
            <ArrowLeft size={20} /> Back
          </button>
          <div className="pd-top-actions">
            <button className="pd-icon-btn" onClick={handleShare}><Share2 size={20} /></button>
            <button 
              className={`pd-icon-btn ${isLiked ? 'liked' : ''}`} 
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart size={20} fill={isLiked ? "#ff5252" : "none"} color={isLiked ? "#ff5252" : "currentColor"} />
            </button>
          </div>
        </header>

        <div className="pd-main-layout">
          <div className="pd-gallery-side">
            <div className="pd-image-card">
              <img src={imageUrl} alt={product.name} />
              <div className="pd-badge-overlay"><ShieldCheck size={14} /> AgriBridge Verified</div>
            </div>
          </div>

          <div className="pd-content-side">
            <div className="pd-info-header">
              <span className="pd-cat-tag">{product.category}</span>
              <h1 className="pd-title">{product.name}</h1>
              <div className="pd-rating-row">
                <div className="pd-stars">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < 4 ? "#ffc107" : "none"} color="#ffc107" />)}
                </div>
                <span>(120+ Orders)</span>
              </div>
            </div>

            <div className="pd-pricing-section">
              <div className="pd-main-price">
                <span className="pd-currency">₹</span>
                <span className="pd-val">{product.pricePerUnit}</span>
                <span className="pd-per">/{product.quantity}</span>
              </div>
              <div className="pd-stock-warning">
                <Package size={16} /> Only {product.quantityAvailable} left in stock!
              </div>
            </div>

            <div className="pd-features-grid">
              <div className="pd-feature-item"><Calendar size={18} className="icon-green" /><div className="pd-feature-text"><label>Harvested</label><p>Recent</p></div></div>
              <div className="pd-feature-item"><Star size={18} className="icon-gold" /><div className="pd-feature-text"><label>Quality</label><p>{product.grade}</p></div></div>
              <div className="pd-feature-item"><Truck size={18} className="icon-blue" /><div className="pd-feature-text"><label>Shipping</label><p>Express</p></div></div>
              <div className="pd-feature-item"><MapPin size={18} className="icon-red" /><div className="pd-feature-text"><label>Location</label><p>Nagpur, MH</p></div></div>
            </div>

            <div className="pd-seller-box">
              <div className="pd-seller-info">
                <div className="pd-seller-avatar"><User size={24} /></div>
                <div>
                  <h4>{product.seller?.name || "Verified Farmer"}</h4>
                  <p>Reliable Seller • Verified Member</p>
                </div>
              </div>
              <div className="pd-seller-actions">
                <button className="pd-btn-outline" onClick={() => window.location.href = `tel:${product.seller?.phone}`}><Phone size={16} /> Call</button>
                <button className="pd-btn-outline" onClick={() => window.open(`https://wa.me/${product.seller?.phone}`, '_blank')}><MessageCircle size={16} /> WhatsApp</button>
              </div>
            </div>

            <div className="pd-sticky-footer">
              <button 
                className={`pd-btn-cart ${adding ? 'pd-added' : ''}`} 
                onClick={handleAddToCart}
                disabled={adding}
              >
                {adding ? "✓ Added" : "Add to Cart"}
              </button>
              <button className="pd-btn-buy" onClick={handleBuyNow}>Buy Now</button>
            </div>
          </div>
        </div>

        <section className="pd-desc-section">
          <h3>About this product</h3>
          <p>{product.description}</p>
        </section>
      </div>
    </div>
  );
};

export default ProductDetails;