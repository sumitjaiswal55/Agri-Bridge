import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaBoxOpen, FaRupeeSign, FaTimes } from "react-icons/fa";

const MyListing = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Update Modal State
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState({
    id: "",
    pricePerUnit: "",
    quantityAvailable: ""
  });

  // --- 1. Fetch Listings on Load ---
  const fetchListings = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/api/my-listings", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setListings(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching listings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  // --- 2. Delete Handler ---
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this crop?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:3000/api/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // UI se turant hatane ke liye filter karo
        setListings(listings.filter((item) => item._id !== id));
        alert("Listing deleted successfully");
      } catch (error) {
        alert("Error deleting listing", error);
      }
    }
  };

  // --- 3. Update Handler (Open Modal) ---
  const openEditModal = (item) => {
    setEditItem({
      id: item._id,
      pricePerUnit: item.pricePerUnit,
      quantityAvailable: item.quantityAvailable
    });
    setShowModal(true);
  };

  // --- 4. Save Updates (API Call) ---
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:3000/api/${editItem.id}`, 
        { 
          pricePerUnit: editItem.pricePerUnit, 
          quantityAvailable: editItem.quantityAvailable 
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setShowModal(false);
      fetchListings(); // List refresh karo
      alert("Updated successfully!");
    } catch (error) {
      alert("Failed to update", error);
    }
  };

  if (loading) return <div className="loading">Loading your crops...</div>;

  return (
    <div className="mylist-container">
      <div className="mylist-header">
        <h2>My Crops ({listings.length})</h2>
        <p>Manage your active listings, update prices, or remove stock.</p>
      </div>

      {listings.length === 0 ? (
        <div className="empty-state">
          <FaBoxOpen size={50} color="#ccc" />
          <p>You haven't listed any crops yet.</p>
        </div>
      ) : (
        <div className="listings-grid">
          {listings.map((item) => (
            <div className="listing-card" key={item._id}>
              {/* Image Section */}
              <div className="card-img">
                <img 
                  src={item.images[0]?.url || "https://placehold.co/600x400?text=No+Image"} 
                  alt={item.name} 
                />
                <span className={`status-tag ${item.isActive ? "active" : "inactive"}`}>
                  {item.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              {/* Content Section */}
              <div className="card-content">
                <div className="card-top">
                  <h3>{item.name}</h3>
                  <span className="category-badge">{item.category}</span>
                </div>
                
                <p className="desc-text">{item.description.substring(0, 50)}...</p>

                <div className="card-stats">
                  <div className="stat">
                    <span className="label">Price:</span>
                    <span className="value">₹{item.pricePerUnit} / {item.quantity}</span>
                  </div>
                  <div className="stat">
                    <span className="label">Stock:</span>
                    <span className="value">{item.quantityAvailable} {item.quantity}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="card-actions">
                  <button className="btn-edit" onClick={() => openEditModal(item)}>
                    <FaEdit /> Edit
                  </button>
                  <button className="btn-delete" onClick={() => handleDelete(item._id)}>
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- Edit Modal --- */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Quick Update</h3>
              <button onClick={() => setShowModal(false)}><FaTimes /></button>
            </div>
            <form onSubmit={handleUpdateSubmit}>
              <div className="input-group">
                <label>New Price (₹)</label>
                <input 
                  type="number" 
                  value={editItem.pricePerUnit} 
                  onChange={(e) => setEditItem({...editItem, pricePerUnit: e.target.value})}
                  required 
                />
              </div>
              <div className="input-group">
                <label>Update Stock</label>
                <input 
                  type="number" 
                  value={editItem.quantityAvailable} 
                  onChange={(e) => setEditItem({...editItem, quantityAvailable: e.target.value})}
                  required 
                />
              </div>
              <button type="submit" className="btn-save">Save Changes</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyListing;