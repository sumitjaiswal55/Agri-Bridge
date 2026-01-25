const Hero = () => {
  return (
    <section className="hero-section">
      <div className="container hero-container">
        <div className="hero-content">
          <span className="badge">🌱 Empowering Farmers</span>
          <h1 className="hero-title">
            Bridging the Gap Between <span className="highlight">Farms</span> & <span className="highlight">Markets</span>
          </h1>
          <p className="hero-subtitle">
            Eliminate middlemen. Get fair prices. AgriBridge connects farmers directly with bulk buyers and transporters for a transparent supply chain.
          </p>
          <div className="hero-actions">
            <button className="btn btn-lg btn-filled">Get Started</button>
            <button className="btn btn-lg btn-text">Learn More ↓</button>
          </div>
          
          <div className="hero-stats">
            <div className="stat-item">
              <h3>500+</h3>
              <p>Farmers</p>
            </div>
            <div className="stat-item">
              <h3>120+</h3>
              <p>Hotels/Buyers</p>
            </div>
          </div>
        </div>
        
        <div className="hero-image-wrapper">
          <img 
            src="https://images.unsplash.com/photo-1560947331-ff7ef4e78f26?q=80&w=1539&v=2" 
            alt="Farmer holding crops" 
            className="hero-image" 
          />
          <div className="floating-card">
            <span>🌾 Fair Price Guaranteed</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
