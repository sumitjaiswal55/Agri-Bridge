import React, { useState, useEffect } from 'react';
import { SlidersHorizontal, X, ArrowUpDown } from 'lucide-react';

function Filter({ onFiltersChange }) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  const [filters, setFilters] = useState({
    sortBy: 'recommended',
    grades: [],
    distance: 50,
    priceRange: [0, 10000],
    category: 'all'
  });

  // Apply filters whenever they change
  useEffect(() => {
    if (onFiltersChange) {
      onFiltersChange(filters);
    }
  }, [filters]);

  const handleSortChange = (e) => {
    setFilters({ ...filters, sortBy: e.target.value });
  };

  const handleDistanceChange = (e) => {
    setFilters({ ...filters, distance: parseInt(e.target.value) });
  };

  const handleGradeChange = (grade) => {
    setFilters(prev => ({
      ...prev,
      grades: prev.grades.includes(grade)
        ? prev.grades.filter(g => g !== grade)
        : [...prev.grades, grade]
    }));
  };

  const handlePriceChange = (type, value) => {
    const newRange = [...filters.priceRange];
    if (type === 'min') {
      newRange[0] = Math.min(parseInt(value), newRange[1]);
    } else {
      newRange[1] = Math.max(parseInt(value), newRange[0]);
    }
    setFilters({ ...filters, priceRange: newRange });
  };

  const handleCategoryChange = (e) => {
    setFilters({ ...filters, category: e.target.value });
  };

  const resetFilters = () => {
    setFilters({
      sortBy: 'recommended',
      grades: [],
      distance: 50,
      priceRange: [0, 10000],
      category: 'all'
    });
  };

  return (
    <div>
      {/* Mobile Filter Toggle */}
      <div className="mobile-filter-bar">
        <button className="filter-toggle-btn" onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}>
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
            <option value="rating">Rating (Highest)</option>
          </select>
        </div>

        <div className="divider"></div>

        {/* --- CATEGORY FILTER --- */}
        <div className="filter-group">
          <label>Category</label>
          <select 
            value={filters.category}
            onChange={handleCategoryChange}
            className="styled-select"
          >
            <option value="all">All Categories</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Fruits">Fruits</option>
            <option value="Grains">Grains</option>
            <option value="Spices">Spices</option>
          </select>
        </div>

        <div className="divider"></div>

        {/* --- DISTANCE RANGE --- */}
        <div className="filter-group">
          <label>Distance (Search Radius)</label>
          <input 
            type="range" 
            min="10" 
            max="500" 
            step="10"
            value={filters.distance} 
            onChange={handleDistanceChange}
          />
          <div className="range-labels">
            <span>10 km</span>
            <span className="highlight-text">Up to {filters.distance} km</span>
            <span>500 km</span>
          </div>
        </div>

        <div className="divider"></div>

        {/* --- PRICE RANGE --- */}
        <div className="filter-group">
          <label>Price Range (₹)</label>
          <div className="price-inputs">
            <input 
              type="number" 
              placeholder="Min" 
              min="0"
              value={filters.priceRange[0]}
              onChange={(e) => handlePriceChange('min', e.target.value)}
              className="price-input"
            />
            <span className="separator">-</span>
            <input 
              type="number" 
              placeholder="Max" 
              max="10000"
              value={filters.priceRange[1]}
              onChange={(e) => handlePriceChange('max', e.target.value)}
              className="price-input"
            />
          </div>
          <div className="range-labels">
            <span>₹{filters.priceRange[0]}</span>
            <span>₹{filters.priceRange[1]}</span>
          </div>
        </div>

        <div className="divider"></div>

        {/* --- QUALITY GRADE --- */}
        <div className="filter-group">
          <label>Quality Grade</label>
          <div className="checkbox-list">
            {['A', 'B', 'C'].map(g => (
              <label key={g} className="checkbox-item">
                <input 
                  type="checkbox" 
                  checked={filters.grades.includes(g)}
                  onChange={() => handleGradeChange(g)}
                /> 
                <span>Grade {g}</span>
              </label>
            ))}
          </div>
        </div>

        <button className="reset-btn" onClick={resetFilters}>Reset All Filters</button>
      </aside>
      
      {/* Overlay for mobile */}
      {mobileFiltersOpen && (
        <div className="sidebar-overlay" onClick={() => setMobileFiltersOpen(false)}></div>
      )}
    </div>
  );
}

export default Filter;