import React from 'react';
// import './ProductCard.css'; // CSS wahi purani wali

const Product = ({ product }) => {
  
  // 1. Image Handling (JSON me images array hai)
  // Agar image hai to pehli wali lo, nahi to placeholder
  const imageUrl = (product.images && product.images.length > 0) 
    ? product.images[0].url 
    : "https://via.placeholder.com/300?text=No+Image";

  return (
    <div className="agri-card">
      <div className="card-image-container">
        <img src={imageUrl} alt={product.name} className="product-img" />
        {/* Grade Badge */}
        {product.grade && <span className="badge">Grade: {product.grade}</span>}
      </div>

      <div className="card-details">
        <h3 className="product-title">{product.name}</h3>
        {/* Description ko thoda trim krte hain agar lamba ho */}
        <p className="farmer-location" style={{fontSize: '12px', color: '#666'}}>
           {product.description.substring(0, 50)}...
        </p>
        
        <div className="price-row">
          {/* JSON field names match kiye hain */}
          <span className="price">₹{product.pricePerUnit}/{product.quantity}</span>
          
          <span className="stock-info text-green">
            Min Order: {product.minOrderQuantity} {product.quantity}
          </span>
        </div>

        <button className="add-btn">Add to Cart 🛒</button>
      </div>
    </div>
  );
};

export default Product;