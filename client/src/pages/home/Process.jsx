

const Process = () => {
  const steps = [
    { id: 1, title: "Cultivate", desc: "Farmers grow high-quality organic produce.", icon: "🌱" },
    { id: 2, title: "Connect", desc: "List produce on AgriBridge & find buyers.", icon: "📱" },
    { id: 3, title: "Transport", desc: "Reliable logistics partners pick up the harvest.", icon: "🚚" },
    { id: 4, title: "Earn", desc: "Instant payments and fair market rates.", icon: "💰" },
  ];

  return (
    <section id="process" className="process-section">
      <div className="container">
        <div className="section-header">
          <h2>Our Simple Process</h2>
          <p>From seed to sale, we simplify the journey.</p>
        </div>
        <div className="process-grid">
          {steps.map((step) => (
            <div key={step.id} className="process-card">
              <div className="icon-box">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
              <span className="step-number">0{step.id}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
