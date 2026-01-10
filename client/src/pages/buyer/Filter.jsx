import React, { useState } from 'react';
import { SlidersHorizontal, X, ArrowUpDown } from 'lucide-react';

function Filter() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  const [filters, setFilters] = useState({
    sortBy: 'recommended',
    grades: [],
    distance: 50 // Default 50km
  });

  const handleSortChange = (e) => {
    setFilters({ ...filters, sortBy: e.target.value });
  };

  return (
    <div>
      {/* Mobile Filter Toggle */}
      <div className="mobile-filter-bar">
        <button className="filter-toggle-btn" onClick={() => setMobileFiltersOpen(true)}>
          <SlidersHorizontal size={18} /> Filters & Sort
        </button>
      </div>

      <aside className={`filter-sidebar ${mobileFiltersOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>Filters & Sort</h3>
          <button className="close-btn" onClick={() => setMobileFiltersOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* --- SORT BY SECTION --- */}
        <div className="filter-group">
          <div className="label-with-icon">
            <label>Sort By</label>
            <ArrowUpDown size={14} className="icon-muted"/>
          </div>
          <select 
            value={filters.sortBy} 
            onChange={handleSortChange}
            className="styled-select"
          >
            <option value="recommended">Recommended</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="freshness">Freshness (Newest)</option>
            <option value="distance">Distance (Nearest)</option>
          </select>
        </div>

        <div className="divider"></div>

        {/* --- DISTANCE RANGE (New Addition) --- */}
        <div className="filter-group">
          <label>Distance (Search Radius)</label>
          <input 
            type="range" 
            min="50" 
            max="500" 
            step="10"
            value={filters.distance} 
            onChange={(e) => setFilters({...filters, distance: e.target.value})}
          />
          <div className="range-labels">
            <span>50 km</span>
            <span className="highlight-text">Up to {filters.distance} km</span>
            <span>500 km</span>
          </div>
        </div>

        <div className="divider"></div>

        {/* --- QUALITY GRADE --- */}
        <div className="filter-group">
          <label>Quality Grade</label>
          <div className="checkbox-list">
            {['Grade A', 'Grade B', 'Grade C'].map(g => (
              <label key={g} className="checkbox-item">
                <input type="checkbox" /> 
                <span>{g}</span>
              </label>
            ))}
          </div>
        </div>

        <button className="apply-btn">Apply Filters</button>
      </aside>
      
      {/* Overlay for mobile */}
      {mobileFiltersOpen && (
        <div className="sidebar-overlay" onClick={() => setMobileFiltersOpen(false)}></div>
      )}
    </div>
  );
}

export default Filter;