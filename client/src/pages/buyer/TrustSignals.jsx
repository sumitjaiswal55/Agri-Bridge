import React from 'react';
import { Truck, ShieldCheck, BadgeCheck, Leaf } from 'lucide-react';
import './Buyer.css';

const TrustSignals = () => {
  const signals = [
    {
      id: 1,
      icon: <Leaf className="sig-icon green" />,
      title: "Direct from Farm",
      desc: "Freshly harvested produce sourced directly from verified local farmers."
    },
    {
      id: 2,
      icon: <ShieldCheck className="sig-icon blue" />,
      title: "Quality Assured",
      desc: "Every batch undergoes a 3-step quality check before it leaves the farm."
    },
    {
      id: 3,
      icon: <Truck className="sig-icon orange" />,
      title: "Express Logistics",
      desc: "Dedicated transport fleet to ensure delivery within 24 hours of harvest."
    },
    {
      id: 4,
      icon: <BadgeCheck className="sig-icon gold" />,
      title: "Transparent Pricing",
      desc: "Real-time Mandi rates with zero hidden middleman commissions."
    }
  ];

  return (
    <section className="trust-signals-container">
      <div className="trust-wrapper">
        {signals.map((item) => (
          <div key={item.id} className="trust-card">
            <div className="icon-circle">
              {item.icon}
            </div>
            <div className="trust-text">
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustSignals;