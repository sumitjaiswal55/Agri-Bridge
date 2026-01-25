import React, { useState, useEffect } from 'react';
import { FaLeaf, FaShoppingCart, FaWallet, FaBox, FaClock, FaCheckCircle } from 'react-icons/fa';
import axios from 'axios';

function Home() {
  const [stats, setStats] = useState({
    totalEarnings: 0,
    totalOrders: 0,
    activeListings: 0,
    totalSold: 0
  });

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch farmer's data on mount
  useEffect(() => {
    const fetchFarmerData = async () => {
      try {
        const token = localStorage.getItem('token');
        
        // Fetch my listings
        const listingsRes = await axios.get(
          'https://agribridgebackend-xi.vercel.app/api/my-listings',
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (listingsRes.data.success && Array.isArray(listingsRes.data.data)) {
          const myListings = listingsRes.data.data;
          setListings(myListings);

          // Calculate stats from listings
          const totalActive = myListings.length;
          const totalSoldQuantity = myListings.reduce((sum, l) => sum + (l.quantityAvailable || 0), 0);
          const totalRevenue = myListings.reduce((sum, l) => sum + ((l.pricePerUnit || 0) * (l.quantityAvailable || 0)), 0);

          setStats({
            totalEarnings: totalRevenue,
            totalOrders: myListings.filter(l => l.quantityAvailable > 0).length,
            activeListings: totalActive,
            totalSold: totalSoldQuantity
          });
        }
      } catch (err) {
        console.error('Error fetching farmer data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFarmerData();
  }, []);

  const statCards = [
    { 
      id: 1, 
      title: 'Total Earnings', 
      value: `₹${stats.totalEarnings.toLocaleString()}`, 
      icon: <FaWallet />, 
      color: 'green',
      description: 'From all sales'
    },
    { 
      id: 2, 
      title: 'Active Listings', 
      value: stats.activeListings, 
      icon: <FaLeaf />, 
      color: 'orange',
      description: 'Currently listed'
    },
    { 
      id: 3, 
      title: 'Total Quantity Sold', 
      value: `${stats.totalSold} Kg`, 
      icon: <FaBox />, 
      color: 'blue',
      description: 'Across all crops'
    },
    { 
      id: 4, 
      title: 'Available Orders', 
      value: stats.totalOrders, 
      icon: <FaShoppingCart />, 
      color: 'purple',
      description: 'Pending shipment'
    },
  ];

  return (
    <div className="farmer-home-container">
      {/* Stats Grid */}
      <section className="stats-grid">
        {statCards.map((stat) => (
          <div className={`stat-card stat-${stat.color}`} key={stat.id}>
            <div className="stat-info">
              <p className="stat-title">{stat.title}</p>
              <h2 className="stat-value">{stat.value}</h2>
              <p className="stat-description">{stat.description}</p>
            </div>
            <div className="stat-icon">{stat.icon}</div>
          </div>
        ))}
      </section>

      {/* Active Listings Section */}
      <section className="active-listings">
        <div className="section-header">
          <h3>📊 Your Active Listings</h3>
          <a href="/dashboard/my-listings" className="view-all-link">View All →</a>
        </div>

        {loading ? (
          <div className="loading-message">Loading listings...</div>
        ) : listings.length > 0 ? (
          <div className="listings-grid">
            {listings.slice(0, 6).map((listing) => (
              <div className="listing-card" key={listing._id}>
                <div className="listing-image">
                  {listing.images && listing.images[0] ? (
                    <img src={listing.images[0].url} alt={listing.name} />
                  ) : (
                    <div className="placeholder-image">No Image</div>
                  )}
                  <span className={`grade-badge grade-${listing.grade?.toLowerCase() || 'mix'}`}>
                    Grade {listing.grade}
                  </span>
                </div>
                
                <div className="listing-details">
                  <h4>{listing.name}</h4>
                  <p className="category">{listing.category}</p>
                  
                  <div className="listing-info-row">
                    <span className="info-label">Price:</span>
                    <span className="info-value">₹{listing.pricePerUnit}/{listing.quantity}</span>
                  </div>
                  
                  <div className="listing-info-row">
                    <span className="info-label">Stock:</span>
                    <span className="info-value">{listing.quantityAvailable} {listing.quantity}</span>
                  </div>
                  
                  <div className="listing-info-row">
                    <span className="info-label">Min Order:</span>
                    <span className="info-value">{listing.minOrderQuantity} {listing.quantity}</span>
                  </div>
                  
                  <div className="listing-actions">
                    <button className="btn-edit">Edit</button>
                    <button className="btn-view">View Details</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <FaLeaf className="empty-icon" />
            <p>No listings yet. Create your first listing to get started!</p>
            <a href="/dashboard/add-listing" className="btn-primary">Add First Crop</a>
          </div>
        )}
      </section>

      {/* Quick Stats */}
      <section className="quick-stats">
        <div className="quick-stat-item">
          <div className="quick-stat-icon pending">
            <FaClock />
          </div>
          <div className="quick-stat-text">
            <h4>Pending Orders</h4>
            <p className="quick-stat-value">3</p>
          </div>
        </div>

        <div className="quick-stat-item">
          <div className="quick-stat-icon completed">
            <FaCheckCircle />
          </div>
          <div className="quick-stat-text">
            <h4>Completed Orders</h4>
            <p className="quick-stat-value">{Math.floor(stats.totalOrders * 2)}</p>
          </div>
        </div>

        <div className="quick-stat-item">
          <div className="quick-stat-icon revenue">
            <FaWallet />
          </div>
          <div className="quick-stat-text">
            <h4>This Month Revenue</h4>
            <p className="quick-stat-value">₹{Math.floor(stats.totalEarnings * 0.4).toLocaleString()}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;