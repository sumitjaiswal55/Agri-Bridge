import React, { useState } from 'react';
import Navbar from '../../component/layout/Navbar.jsx';
import Footer from '../../component/layout/Footer.jsx';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to a server
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  const contactInfo = [
    {
      icon: <Phone size={30} />,
      title: "Phone",
      content: "+91 (555) 123-4567",
      subtext: "Monday - Friday, 9 AM - 6 PM IST"
    },
    {
      icon: <Mail size={30} />,
      title: "Email",
      content: "support@agribridge.com",
      subtext: "We'll respond within 24 hours"
    },
    {
      icon: <MapPin size={30} />,
      title: "Address",
      content: "AgriBridge HQ, Mumbai",
      subtext: "123 Agricultural Street, Mumbai 400001"
    },
    {
      icon: <Clock size={30} />,
      title: "Business Hours",
      content: "9 AM - 8 PM IST",
      subtext: "Every day including weekends"
    }
  ];

  return (
    <div className="contact-page">
      <Navbar />

      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <h1>Get In Touch</h1>
          <p>Have questions? We'd love to hear from you</p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="contact-info-section">
        <div className="container">
          <div className="info-grid">
            {contactInfo.map((info, index) => (
              <div key={index} className="info-card">
                <div className="info-icon">{info.icon}</div>
                <h3>{info.title}</h3>
                <p className="info-main">{info.content}</p>
                <p className="info-sub">{info.subtext}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-content">
            {/* Contact Form */}
            <div className="contact-form-wrapper">
              <h2>Send us a Message</h2>
              {submitted && (
                <div className="success-message">
                  ✓ Thank you for your message! We'll get back to you soon.
                </div>
              )}
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                  />
                </div>

                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXX XXXX XX"
                  />
                </div>

                <div className="form-group">
                  <label>Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="How can we help?"
                  />
                </div>

                <div className="form-group">
                  <label>Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    placeholder="Tell us more about your inquiry..."
                  ></textarea>
                </div>

                <button type="submit" className="btn-submit">Send Message</button>
              </form>
            </div>

            {/* Map/Image */}
            <div className="contact-image">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=500&h=500&fit=crop" 
                alt="Contact Us"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className="quick-help">
        <div className="container">
          <h2>Quick Help</h2>
          <div className="help-grid">
            <div className="help-card">
              <h3>Farmers Support</h3>
              <p>Need help listing your produce or managing orders?</p>
              <a href="/faq">View FAQs →</a>
            </div>
            <div className="help-card">
              <h3>Buyers Support</h3>
              <p>Questions about finding farmers or placing bulk orders?</p>
              <a href="/faq">View FAQs →</a>
            </div>
            <div className="help-card">
              <h3>Technical Issues</h3>
              <p>Having trouble with the app or website?</p>
              <a href="/faq">View FAQs →</a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;