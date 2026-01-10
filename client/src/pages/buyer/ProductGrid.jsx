import React, { useState, useEffect } from 'react';
import { ShoppingCart, Star, Clock, MapPin } from 'lucide-react';

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Mock Data ---
  const MOCK_DATA = [
    {
      id: 1,
      name: 'Sharbati Wheat (M.P. Special)',
      type: 'bulk',
      price: 2600,
      unit: 'Quintal',
      grade: 'A+',
      farmer: 'Ram Charan',
      location: 'Sehore Mandi',
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80',
      harvestDate: '2 Days ago'
    },
    {
      id: 2,
      name: 'Hybrid Tomato',
      type: 'fresh',
      price: 1200,
      unit: 'Quintal',
      grade: 'A',
      farmer: 'Suresh Patil',
      location: 'Nashik',
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=500&q=80',
      harvestDate: 'Today'
    },
    // ... baaki data same rahega ...
    {
      id: 3,
      name: 'Basmati Rice (1121)',
      type: 'bulk',
      price: 4500,
      unit: 'Quintal',
      grade: 'Export',
      farmer: 'Punjab Agro',
      location: 'Amritsar',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
      harvestDate: 'Last Week'
    },
    {
      id: 4,
      name: 'Desi Potato (Indore)',
      type: 'fresh',
      price: 800,
      unit: 'Quintal',
      grade: 'B',
      farmer: 'Kisan Group',
      location: 'Indore',
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=500&q=80',
      harvestDate: 'Yesterday'
    },
    {
      id: 5,
      name: 'Organic Turmeric',
      type: 'fresh',
      price: 120,
      unit: 'Kg',
      grade: 'A',
      farmer: 'Vedic Farms',
      location: 'Sangli',
      image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=500&q=80',
      harvestDate: '1 Month ago'
    },
    {
      id: 6,
      name: 'Mustard Seeds',
      type: 'bulk',
      price: 5400,
      unit: 'Quintal',
      grade: 'A',
      farmer: 'Rajasthan Coop',
      location: 'Jaipur',
      image: 'https://images.unsplash.com/photo-1558583055-d7ac00b1adca?auto=format&fit=crop&w=800&q=80',
      harvestDate: '10 Days ago'
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setProducts(MOCK_DATA);
      setLoading(false);
    }, 1500);
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
      {/* Update 1: Sort Options hata diye */}
      

      <div className="grid-container">
        {products.map((item) => (
          <div key={item.id} className="product-card">
            
            <div className="card-img-box">
              <img src={item.image} alt={item.name} />
              <span className={`grade-tag ${item.grade.includes('A') ? 'grade-a' : 'grade-b'}`}>
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

              <div className="card-footer">
                {/* Update 2: Price Structure Simplified */}
                <div className="price-box">
                  <span className="currency">₹</span>
                  <span className="amount">{item.price}</span>
                  <span className="unit">/{item.unit}</span>
                </div>
                
                <button className="add-btn" onClick={() => alert(`Added ${item.name} to cart!`)}>
                  <ShoppingCart size={18} />
                  {item.type === 'bulk' ? 'Quote' : 'Add'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;