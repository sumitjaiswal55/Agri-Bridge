import React from 'react';

const Vision = () => {
  return (
    <section className="vision-section" id="about">
      <div className="container vision-container">
        <div className="vision-image">
           <img 
             src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1000&auto=format&fit=crop" 
             alt="AgriBridge Vision" 
           />
           <div className="img-decoration"></div>
        </div>

        <div className="vision-content">
          <h4 className="sub-heading">Why We Exist</h4>
          <h2>Our Vision for a Better Future</h2>
          <p className="vision-desc">
            We are building a seamless ecosystem where technology meets tradition. 
            By eliminating the gap, we ensure farmers get the <strong>right price</strong> and 
            buyers receive <strong>fresh produce</strong> directly from the source.
          </p>

          <ul className="vision-points">
            <li className="point-item">
              <span className="vision-icon-box">✓</span>
              <div className="point-text">
                <h3>Zero Commission Model</h3>
                <p>100% profit goes directly to the hardworking farmers.</p>
              </div>
            </li>
            
            <li className="point-item">
              <span className="vision-icon-box">✓</span>
              <div className="point-text">
                <h3>Transparent Pricing</h3>
                <p>Real-time market rates visible to both buyers and sellers.</p>
              </div>
            </li>

            <li className="point-item">
              <span className="vision-icon-box">✓</span>
              <div className="point-text">
                <h3>Zero Food Wastage</h3>
                <p>Efficient supply chain ensures farm-fresh delivery within hours.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Vision;