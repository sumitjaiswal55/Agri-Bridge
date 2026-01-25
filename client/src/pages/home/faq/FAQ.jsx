import React, { useState } from 'react';
import Navbar from '../../../component/layout/Navbar.jsx';
import Footer from '../../../component/layout/Footer.jsx';
import { ChevronDown } from 'lucide-react';
import './FAQ.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      category: "For Farmers",
      questions: [
        {
          q: "How do I get started on AgriBridge?",
          a: "Simply sign up with your phone number, verify your identity, and list your produce. Our team will verify your details within 24 hours, and you're ready to receive orders!"
        },
        {
          q: "What are the registration requirements?",
          a: "You need to be an active farmer with your own farm or land. We require government ID, proof of land ownership, and basic contact details. Our verification process typically takes 24-48 hours."
        },
        {
          q: "How do I list my produce?",
          a: "Upload photos of your produce, enter quantity, type, quality grade, and your asking price. Our app guides you through each step. Listings go live within minutes!"
        },
        {
          q: "What commission does AgriBridge charge?",
          a: "AgriBridge charges ZERO commission to farmers! We believe farmers should keep all their earnings. We make money through our buyer network and optional premium features."
        },
        {
          q: "How are payments made and how long do they take?",
          a: "Payments are transferred directly to your bank account within 24 hours of delivery verification. You can track payment status in real-time through the app."
        },
        {
          q: "Can I cancel an order?",
          a: "You can cancel before a buyer confirms pickup. Once a buyer confirms, you'll receive payment upon pickup. Contact our support team for any concerns."
        }
      ]
    },
    {
      category: "For Buyers",
      questions: [
        {
          q: "How do I find farmers on AgriBridge?",
          a: "Browse our comprehensive catalog filtered by crop type, quality, location, and price. You can also search for specific produce or connect directly with farmers."
        },
        {
          q: "Are the farmers verified?",
          a: "Yes! Every farmer on AgriBridge goes through rigorous verification. We verify their identity, farm ownership, and track record to ensure you're buying from trusted sources."
        },
        {
          q: "What are the minimum order quantities?",
          a: "Minimum quantities vary by farmer and crop. Most farmers accept orders from 50kg onwards, but some accept smaller quantities. Check individual listings for details."
        },
        {
          q: "How is delivery handled?",
          a: "We partner with trusted logistics providers. Farmers arrange pickup from their location, and delivery is handled professionally with tracking updates throughout."
        },
        {
          q: "What if the produce quality is not as expected?",
          a: "Quality is guaranteed! If there's any issue, report within 24 hours of delivery. We'll work with the farmer to resolve it or offer a full refund."
        },
        {
          q: "Can I place bulk orders?",
          a: "Absolutely! Bulk orders receive special discounts. Contact our sales team or connect directly with farmers for wholesale pricing and regular supply agreements."
        }
      ]
    },
    {
      category: "Payments & Logistics",
      questions: [
        {
          q: "What payment methods are accepted?",
          a: "We accept all major payment methods: UPI, Credit/Debit Cards, Net Banking, and Direct Bank Transfers. All payments are secured with bank-level encryption."
        },
        {
          q: "Are there any hidden charges?",
          a: "No hidden charges ever! Farmers pay zero commission. Buyers only pay product cost + delivery charges (clearly shown before checkout). Everything is transparent."
        },
        {
          q: "How is delivery cost calculated?",
          a: "Delivery costs are calculated based on distance and weight. The exact cost is shown in the order summary before you confirm. Farmers and buyers can arrange pickup to save on delivery."
        },
        {
          q: "Can I track my order in real-time?",
          a: "Yes! Real-time tracking is available for all orders. You'll receive updates via SMS and in-app notifications about pickup, transit, and delivery."
        },
        {
          q: "What if a shipment gets damaged?",
          a: "Our logistics partners have insurance coverage. If damage occurs, report it immediately with photos. We'll file a claim and compensate you accordingly."
        }
      ]
    },
    {
      category: "Technical & Account",
      questions: [
        {
          q: "Is my personal data safe on AgriBridge?",
          a: "Absolutely! We use enterprise-grade security with SSL encryption, two-factor authentication, and strict data protection protocols. Your data is never shared with third parties."
        },
        {
          q: "How do I reset my password?",
          a: "Click 'Forgot Password' on the login page, enter your registered email/phone, and follow the verification process. You'll receive instructions to set a new password."
        },
        {
          q: "Can I have multiple accounts?",
          a: "One person can only have one active account (farmer or buyer). If you're both a farmer and buyer, contact our support team for a multi-role account setup."
        },
        {
          q: "How do I delete my account?",
          a: "Go to Settings > Account > Delete Account. You'll need to confirm this action. All your data will be securely deleted within 30 days as per our privacy policy."
        },
        {
          q: "Does AgriBridge have a customer app?",
          a: "Yes! Download 'AgriBridge' from the App Store (iOS) or Play Store (Android). The app offers the full web experience with push notifications for orders and payments."
        }
      ]
    }
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  let globalIndex = 0;

  return (
    <div className="faq-page">
      <Navbar />

      {/* Hero Section */}
      <section className="faq-hero">
        <div className="container">
          <h1>Frequently Asked Questions</h1>
          <p>Find answers to common questions about AgriBridge</p>
        </div>
      </section>

      {/* Search Section */}
      <section className="faq-search-section">
        <div className="container">
          <div className="search-box">
            <input 
              type="text" 
              placeholder="Search your question..." 
              className="search-input"
            />
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="faq-section">
        <div className="container">
          {faqData.map((category, categoryIndex) => (
            <div key={categoryIndex} className="faq-category">
              <h2 className="category-title">{category.category}</h2>
              <div className="faq-accordion">
                {category.questions.map((item, questionIndex) => {
                  const currentIndex = globalIndex++;
                  return (
                    <div 
                      key={questionIndex} 
                      className={`accordion-item ${activeIndex === currentIndex ? 'active' : ''}`}
                    >
                      <button 
                        className="accordion-header"
                        onClick={() => toggleAccordion(currentIndex)}
                      >
                        <span className="question-text">{item.q}</span>
                        <ChevronDown 
                          size={20} 
                          className={`chevron ${activeIndex === currentIndex ? 'rotate' : ''}`}
                        />
                      </button>
                      {activeIndex === currentIndex && (
                        <div className="accordion-content">
                          <p>{item.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="help-section">
        <div className="container">
          <h2>Still Have Questions?</h2>
          <p>Can't find the answer you're looking for? Our support team is here to help.</p>
          <div className="help-buttons">
            <a href="/contact" className="btn-contact">Contact Support</a>
            <a href="mailto:support@agribridge.com" className="btn-email">Email Us</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;