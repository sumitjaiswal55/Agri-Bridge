import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, MapPin, Calendar, User, Package, ShieldCheck } from 'lucide-react';
import "./Buyer.css"

const Products = () => {
  const { id } = useParams(); // URL se ID nikali
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        // Backend API to get single listing by ID
        // Note: Apne backend route ke hisab se URL change karna
        const res = await axios.get(`https://agribridgebackend-xi.vercel.app/api/listings/${id}`); 
        
        if (res.data) {
          setProduct(res.data); // Backend se jo object aaya wo set kiya
        }
      } catch (err) {
        console.error("Error fetching product details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [id]);

  if (loading) return <div className="loading-screen">Loading Details...</div>;
  if (!product) return <div className="error-screen">Product Not Found!</div>;

  // Safe checks for data
  const imageUrl = (product.images && product.images.length > 0) ? product.images[0].url : "https://via.placeholder.com/600";
  const farmerName = product.seller?.name || "Verified Farmer";
  
  return (
    <div className="details-container">
      
      {/* Back Button */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        <ArrowLeft size={20} /> Back to Market
      </button>

      <div className="details-wrapper">
        
        {/* Left Side: Image */}
        <div className="image-section">
          <img src={imageUrl} alt={product.name} className="main-image" />
        </div>

        {/* Right Side: Info */}
        <div className="info-section">
          <div className="header-row">
            <h1>{product.name}</h1>
            <span className={`grade-badge ${product.grade === 'A' ? 'grade-a' : 'grade-b'}`}>
              Grade {product.grade || 'A'}
            </span>
          </div>

          <div className="price-block">
            <span className="currency">₹</span>
            <span className="price">{product.pricePerUnit}</span>
            <span className="per-unit">/{product.quantity}</span> 
          </div>

          <div className="stock-status">
            <Package className="icon-green" />
            <span>Stock Available: <strong>{product.quantityAvailable} {product.quantity}</strong></span>
          </div>

          <div className="meta-grid">
            <div className="meta-item">
              <User size={18} className="icon-grey" />
              <div>
                <small>Sold By</small>
                <p>{farmerName}</p>
              </div>
            </div>
            <div className="meta-item">
              <MapPin size={18} className="icon-grey" />
              <div>
                <small>Location</small>
                <p>Nagpur Mandi</p>
              </div>
            </div>
            <div className="meta-item">
              <Calendar size={18} className="icon-grey" />
              <div>
                <small>Harvest Date</small>
                <p>{new Date(product.harvestDate).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="meta-item">
              <ShieldCheck size={18} className="icon-grey" />
              <div>
                <small>Quality Check</small>
                <p>Verified</p>
              </div>
            </div>
          </div>

          <div className="description-box">
            <h3>Description</h3>
            <p>{product.description || "No description provided by the farmer. This is fresh produce directly from the farm."}</p>
          </div>

          <div className="action-buttons">
            <button className="buy-now-btn">Buy Now</button>
            <button className="contact-btn">Contact Farmer</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Products;
