const Vision = () => {
  return (
    <section className="vision-section">
      <div className="container vision-container">
        <div className="vision-image">
           <img 
            src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1000&auto=format&fit=crop" 
            alt="Vision" 
          />
        </div>
        <div className="vision-content">
          <h2>Our Vision</h2>
          <p>
            We aim to create a seamless and fair ecosystem that connects farmers directly with buyers.
            By eliminating the gap, we ensure farmers get the <strong>right price</strong> and buyers receive <strong>fresh produce</strong>.
          </p>
          <ul className="vision-points">
            <li>✅ Zero Middlemen Commission</li>
            <li>✅ Transparent Pricing</li>
            <li>✅ Reduced Food Wastage</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Vision;
