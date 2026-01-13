import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Star, Clock, MapPin, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate



const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // 2. Hook Initialize

  // --- Date Formatter ---
  const formatHarvestDate = (dateString) => {
    if (!dateString) return "Recently";
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    return `${diffDays} Days ago`;
  };

  // --- API Call (Same as before) ---
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('https://agribridgebackend-xi.vercel.app/api/all');
        if (res.data.success && Array.isArray(res.data.data)) {
          const realData = res.data.data.map((item) => ({
            id: item._id, // Ye ID URL me jayegi
            name: item.name,
            type: item.quantityAvailable > 100 ? 'bulk' : 'fresh',
            price: item.pricePerUnit,
            unit: item.quantity, 
            totalStock: item.quantityAvailable,
            grade: item.grade || 'N/A',
            farmer: (item.seller && item.seller.name) ? item.seller.name : "Verified Farmer",
            location: "Nagpur Mandi",
            image: (item.images && item.images.length > 0) ? item.images[0].url : "https://via.placeholder.com/500",
            harvestDate: formatHarvestDate(item.harvestDate)
          }));
          setProducts(realData);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div className="grid-container">Loading...</div>;

  return (
    <div className="grid-wrapper">
      <div className="grid-container">
        {products.map((item) => (
          // 3. onClick Add kiya aur cursor-pointer class lagayi
          <div 
            key={item.id} 
            className="product-card" 
            onClick={() => navigate(`/product/${item.id}`)} // URL banega: /product/12345
            style={{ cursor: 'pointer' }}
          >
            <div className="card-img-box">
              <img src={item.image} alt={item.name} />
              <span className={`grade-tag ${item.grade?.includes('A') ? 'grade-a' : 'grade-b'}`}>Grade {item.grade}</span>
              {item.type === 'bulk' && <span className="bulk-badge">📦 Wholesale</span>}
            </div>

            <div className="card-content">
              <div className="card-meta">
                <span className="harvest-time"><Clock size={12} /> {item.harvestDate}</span>
                <span className="location"><MapPin size={12} /> {item.location}</span>
              </div>
              <h3 className="product-name">{item.name}</h3>
              <p className="farmer-name">By: {item.farmer} <Star size={12} fill="#f59e0b" stroke="none"/></p>
              
              <div className="card-footer">
                <div className="price-box">
                  <span className="currency">₹</span>
                  <span className="amount">{item.price}</span>
                  <span className="unit">/{item.unit}</span>
                </div>
                <div className="stock-badge">
                  <Package size={14} />
                  <span>{item.totalStock} {item.unit} Left</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
