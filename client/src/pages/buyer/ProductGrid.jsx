import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Star, Clock, MapPin, Package } from 'lucide-react'; // ShoppingCart hata diya

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Helper: Date Formatting ---
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

  // --- Real Data Fetching ---
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/all');

        if (res.data.success && Array.isArray(res.data.data)) {
          const realData = res.data.data.map((item) => ({
            id: item._id,
            name: item.name,
            type: item.quantityAvailable > 100 ? 'bulk' : 'fresh',
            price: item.pricePerUnit,
            
            unit: item.quantity, 
            totalStock: item.quantityAvailable, // Stock Quantity
            
            grade: item.grade || 'N/A',
            farmer: (item.seller && item.seller.name) ? item.seller.name : "Verified Farmer",
            location: "Nagpur Mandi",
            image: (item.images && item.images.length > 0) 
              ? item.images[0].url 
              : "https://via.placeholder.com/500?text=Agri+Crop",
            harvestDate: formatHarvestDate(item.harvestDate)
          }));
          setProducts(realData);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="grid-container">
        {[1, 2, 3, 4, 5, 6].map((n) => <div key={n} className="skeleton-card"></div>)}
      </div>
    );
  }

  return (
    <div className="grid-wrapper">
      <div className="grid-container">
        {products.length > 0 ? (
          products.map((item) => (
            <div key={item.id} className="product-card">
              
              <div className="card-img-box">
                <img src={item.image} alt={item.name} />
                <span className={`grade-tag ${item.grade?.includes('A') ? 'grade-a' : 'grade-b'}`}>
                  Grade {item.grade}
                </span>
                {item.type === 'bulk' && <span className="bulk-badge">📦 Wholesale</span>}
              </div>

              <div className="card-content">
                <div className="card-meta">
                  <span className="harvest-time"><Clock size={12} /> {item.harvestDate}</span>
                  <span className="location"><MapPin size={12} /> {item.location}</span>
                </div>

                <h3 className="product-name">{item.name}</h3>
                <p className="farmer-name">By: {item.farmer} <Star size={12} fill="#f59e0b" stroke="none"/></p>

                {/* Footer Change: Button hata diya, Stock Right side me laga diya */}
                <div className="card-footer">
                  
                  {/* Left Side: Price */}
                  <div className="price-box">
                    <span className="currency">₹</span>
                    <span className="amount">{item.price}</span>
                    <span className="unit">/{item.unit}</span>
                  </div>
                  
                  {/* Right Side: Stock Info */}
                  <div className="stock-badge">
                    <Package size={14} />
                    <span>{item.totalStock} {item.unit} Left</span>
                  </div>

                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={{gridColumn: '1 / -1', textAlign: 'center', padding: '40px'}}>
            <h3>Abhi koi fasal available nahi hai 🌱</h3>
            <p>Kisan bhaiyon ke upload karne ka intezaar karein.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;