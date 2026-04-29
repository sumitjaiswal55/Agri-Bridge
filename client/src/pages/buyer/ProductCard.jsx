import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Plus } from 'lucide-react';
import './Buyer.css';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  // Discount calculate karne ke liye
  const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);

  return (
    <div className="product-card-v2" onClick={() => navigate(`/product/${product.id}`)} style={{ cursor: 'pointer' }}>
      {/* Discount Badge */}
      {discount > 0 && <div className="discount-tag">{discount}% OFF</div>}

      
      <div className="card-image">
        <img src={product.image} alt={product.name} loading="lazy" />
        {product.isBestseller && <span className="bestseller-badge">Bestseller</span>}
      </div>

      <div className="card-info">
        <div className="card-meta">
          <span className="category-label">{product.category}</span>
          <div className="rating-mini">
            <Star size={12} fill="#ffc107" color="#ffc107" />
            <span>{product.rating}</span>
          </div>
        </div>

        <h4 className="product-title">{product.name}</h4>
        <p className="farm-origin">Source: {product.farm}</p>

        <div className="price-row">
          <div className="price-block">
            <span className="current-price">₹{product.price}</span>
            <span className="old-price">₹{product.oldPrice}</span>
            <span className="unit-label">/ {product.unit}</span>
          </div>
        </div>
        
        <div className="delivery-time">
          <ShoppingCart size={12} />
          <span>Delivery by Tomorrow</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;