import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Star, Clock, MapPin, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductGrid = ({ filters }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const navigate = useNavigate();

  // --- Calculate Distance Using Haversine Formula ---
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

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

  // --- Fetch User Location and Products ---
  useEffect(() => {
    const fetchUserAndProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        
        // Get user location
        if (token) {
          try {
            const userRes = await axios.get('https://agribridgebackend-xi.vercel.app/api/user/profile', {
              headers: { Authorization: `Bearer ${token}` }
            });
            if (userRes.data.success && userRes.data.user.location) {
              const [longitude, latitude] = userRes.data.user.location.coordinates;
              setUserLocation({ latitude, longitude });
            }
          } catch (err) {
            console.log('Could not fetch user location');
          }
        }

        // Fetch all products
        const res = await axios.get('https://agribridgebackend-xi.vercel.app/api/all');
        if (res.data.success && Array.isArray(res.data.data)) {
          const realData = res.data.data.map((item) => ({
            id: item._id,
            name: item.name,
            type: item.quantityAvailable > 100 ? 'bulk' : 'fresh',
            price: item.pricePerUnit,
            unit: item.quantity,
            totalStock: item.quantityAvailable,
            grade: item.grade || 'Mix',
            category: item.category,
            farmer: (item.seller && item.seller.name) ? item.seller.name : "Verified Farmer",
            farmerId: item.seller?._id,
            location: item.seller?.location?.address || "Mandi",
            farmerLat: item.seller?.location?.coordinates[1],
            farmerLon: item.seller?.location?.coordinates[0],
            image: (item.images && item.images.length > 0) ? item.images[0].url : "https://via.placeholder.com/500",
            harvestDate: item.harvestDate,
            rating: 4.5,
            distance: null
          }));
          setAllProducts(realData);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndProducts();
  }, []);

  // --- Apply Filters ---
  useEffect(() => {
    if (!filters) {
      setFilteredProducts(allProducts);
      return;
    }

    let filtered = [...allProducts];

    // 1. Filter by distance (from buyer's location)
    if (userLocation && userLocation.latitude && userLocation.longitude) {
      filtered = filtered.filter(product => {
        if (!product.farmerLat || !product.farmerLon) return false;
        const distance = calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          product.farmerLat,
          product.farmerLon
        );
        product.distance = Math.round(distance);
        return distance <= filters.distance;
      });
    }

    // 2. Filter by category
    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter(p => p.category === filters.category);
    }

    // 3. Filter by grade
    if (filters.grades && filters.grades.length > 0) {
      filtered = filtered.filter(p => filters.grades.includes(p.grade));
    }

    // 4. Filter by price range
    if (filters.priceRange) {
      filtered = filtered.filter(p => 
        p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
      );
    }

    // 5. Sort
    if (filters.sortBy === 'price_low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'price_high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === 'freshness') {
      filtered.sort((a, b) => new Date(b.harvestDate) - new Date(a.harvestDate));
    } else if (filters.sortBy === 'distance' && userLocation) {
      filtered.sort((a, b) => (a.distance || 999) - (b.distance || 999));
    } else if (filters.sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(filtered);
  }, [filters, allProducts, userLocation]);

  if (loading) return <div className="grid-container"><div style={{padding: '40px', textAlign: 'center', color: '#666'}}>Loading Products...</div></div>;

  return (
    <div className="grid-wrapper">
      <div className="grid-header">
        <h2>Products Available ({filteredProducts.length})</h2>
      </div>
      <div className="grid-container">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <div 
              key={item.id} 
              className="product-card" 
              onClick={() => navigate(`/product/${item.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <div className="card-img-box">
                <img src={item.image} alt={item.name} />
                <span className={`grade-tag ${item.grade === 'A' ? 'grade-a' : item.grade === 'B' ? 'grade-b' : 'grade-c'}`}>
                  Grade {item.grade}
                </span>
                {item.type === 'bulk' && <span className="bulk-badge">📦 Wholesale</span>}
              </div>

              <div className="card-content">
                <div className="card-meta">
                  <span className="harvest-time">
                    <Clock size={12} /> {formatHarvestDate(item.harvestDate)}
                  </span>
                  <span className="location">
                    <MapPin size={12} /> {item.distance ? `${item.distance} km away` : item.location}
                  </span>
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
          ))
        ) : (
          <div style={{gridColumn: '1/-1', padding: '40px', textAlign: 'center', color: '#999'}}>
            No products found matching your filters. Try adjusting the distance or price range.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;
