import React, { useState } from 'react';

// Components
import Navbar from './Navbar';
import HeroSlider from './HeroSlider';
import CategoryRail from './CategoryRail';
import ProductGrid from './ProductGrid';
import TrustSignals from './TrustSignals';
import Filter from './Filter';
import Footer from '../../component/layout/Footer';

import { slides, categories, products } from './dummydata';
import './Buyer.css';

const Home = () => {
  const [filters, setFilters] = useState(null);

  return (
    <div className="home-wrapper">
      <Navbar />

      <main className="home-content">
        <HeroSlider slides={slides} />
        
        <section className="container-fluid">
          <CategoryRail categories={categories} />
        </section>

        <section className="container-fluid main-layout">
          <div className="content-area">
            <div className="section-title" style={{ marginBottom: '10px' }}>
              <h3>Fresh from Farms</h3>
              <button className="view-all-btn">View All</button>
            </div>
            
            {/* Is Grid mein hum modular ProductCards dikhayenge */}
            <ProductGrid products={products} />
          </div>
        </section>

        <TrustSignals />
      </main>
      <Footer />
    </div>
  );
};

export default Home;