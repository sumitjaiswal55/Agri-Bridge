import React from 'react';
import Navbar from '../../component/layout/Navbar.jsx';
import Footer from '../../component/layout/Footer.jsx';
import { Heart, Target, Users, TrendingUp } from 'lucide-react';
import './About.css';

const AboutUs = () => {
  const values = [
    {
      icon: <Heart size={40} />,
      title: "Commitment",
      description: "We are deeply committed to empowering farmers and ensuring fair practices in agriculture."
    },
    {
      icon: <Target size={40} />,
      title: "Transparency",
      description: "Every transaction is transparent, with real-time tracking and fair pricing."
    },
    {
      icon: <Users size={40} />,
      title: "Community",
      description: "Building a thriving community of farmers, buyers, and transporters working together."
    },
    {
      icon: <TrendingUp size={40} />,
      title: "Growth",
      description: "Sustainable growth for all stakeholders in the agricultural supply chain."
    }
  ];

  const team = [
    {
      name: "Rajesh Kumar",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=400&fit=crop"
    },
    {
      name: "Priya Singh",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=400&fit=crop"
    },
    {
      name: "Amit Patel",
      role: "Operations Head",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&h=400&fit=crop"
    },
    {
      name: "Neha Sharma",
      role: "Community Manager",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=400&fit=crop"
    }
  ];

  return (
    <div className="about-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <h1>About AgriBridge</h1>
          <p>Revolutionizing agriculture through direct connections</p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-vision">
        <div className="container">
          <div className="mission-card">
            <h2>Our Mission</h2>
            <p>
              To empower Indian farmers by creating direct connections with bulk buyers and transporters, 
              eliminating middlemen, ensuring fair prices, and building a transparent, efficient supply chain 
              for agricultural products.
            </p>
          </div>
          <div className="vision-card">
            <h2>Our Vision</h2>
            <p>
              A thriving agricultural ecosystem where farmers are rewarded fairly for their hard work, 
              buyers get quality products at reasonable prices, and the entire supply chain operates with 
              complete transparency and efficiency.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="about-story">
        <div className="container">
          <div className="story-content">
            <div className="story-text">
              <h2>Our Story</h2>
              <p>
                AgriBridge was founded with a simple yet powerful idea: farmers deserve better. 
                We witnessed countless hardworking farmers struggle to get fair prices for their produce, 
                while buyers paid excessive markups due to multiple intermediaries.
              </p>
              <p>
                We built AgriBridge to bridge this gap. Today, we connect hundreds of farmers with 
                hotels, restaurants, and bulk buyers, ensuring everyone benefits from a transparent, 
                direct supply chain.
              </p>
            </div>
            <div className="story-image">
              <img 
                src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=500&h=400&fit=crop" 
                alt="AgriBridge Story"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <h2>Our Values</h2>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-card">
                <img src={member.image} alt={member.name} />
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stat">
            <h3>500+</h3>
            <p>Active Farmers</p>
          </div>
          <div className="stat">
            <h3>120+</h3>
            <p>Buyers & Restaurants</p>
          </div>
          <div className="stat">
            <h3>₹5Cr+</h3>
            <p>Transactions</p>
          </div>
          <div className="stat">
            <h3>15+</h3>
            <p>Cities</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;