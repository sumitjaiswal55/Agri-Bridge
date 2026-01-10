import React from 'react';
import './Buyer.css'; // Common CSS file

const ListedItem = ({ product, addToCart }) => {
  // Safe check for image
  const imageSrc = product.image || "https://placehold.co/600x400?text=Agri+Product";

  return (
    <div className="agri-card">
      <div className="card-img-wrap">
        <img src={imageSrc} alt={product.name} />
        <span className="fresh-badge">🌱 {product.harvestDate || "Fresh"}</span>
      </div>
      
      <div className="card-content">
        <div className="card-header">
          <h3>{product.name}</h3>
          <span className="price">₹{product.price}/{product.unit}</span>
        </div>
        
        <p className="farmer-info">🧑‍🌾 {product.farmerName || "Verified Farmer"}</p>
        <p className="location-info">📍 {product.location || "Nagpur, MH"}</p>

        <button 
          className="add-cart-btn"
          onClick={() => addToCart(product)}
        >
          Add to Cart 🛒
        </button>
      </div>
    </div>
  );
};

export default ListedItem;