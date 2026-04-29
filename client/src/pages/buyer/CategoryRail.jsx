import React from 'react';
import './Buyer.css';

const CategoryRail = ({ categories }) => {
  return (
    <section className="category-rail-section">
      <div className="section-header-small">
        <h3>Shop by Category</h3>
        <span className="see-all">See All</span>
      </div>
      
      <div className="rail-container">
        {categories.map((cat) => (
          <div key={cat.id} className="category-card-mini">
            <div className="category-img-wrapper">
              <img src={cat.image} alt={cat.name} />
              {/* Optional: Overlay agar icon dikhana ho toh */}
            </div>
            <div className="category-info-mini">
              <span className="cat-name">{cat.name}</span>
              <span className="cat-count-badge">{cat.count}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryRail;