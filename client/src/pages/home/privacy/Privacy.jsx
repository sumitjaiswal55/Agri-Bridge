import React from 'react';
import Navbar from '../../../component/layout/Navbar.jsx';
import Footer from '../../../component/layout/Footer.jsx';
import './Privacy.css';

const Privacy = () => {
  return (
    <div className="privacy-page">
      <Navbar />

      {/* Hero Section */}
      <section className="privacy-hero">
        <div className="container">
          <h1>Privacy Policy</h1>
          <p>Last Updated: January 25, 2026</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="privacy-content">
        <div className="container">
          <div className="policy-text">
            <h2>1. Introduction</h2>
            <p>
              AgriBridge ("we," "us," "our," or "Company") respects your privacy and is committed to protecting your personal data. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website 
              and mobile application (collectively, the "Platform").
            </p>

            <h2>2. Information We Collect</h2>
            <h3>2.1 Information You Provide Directly</h3>
            <ul>
              <li><strong>Account Registration:</strong> Name, phone number, email, address, farm details, bank account information</li>
              <li><strong>Profile Information:</strong> Photos, produce details, transaction history, ratings and reviews</li>
              <li><strong>Communication:</strong> Messages, inquiries, and support requests</li>
              <li><strong>Payment Information:</strong> Bank details, payment methods, transaction records</li>
            </ul>

            <h3>2.2 Information Collected Automatically</h3>
            <ul>
              <li>Device information (phone model, OS, app version)</li>
              <li>IP address and location data</li>
              <li>Browsing history and interaction with the Platform</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>We use your information for the following purposes:</p>
            <ul>
              <li>To provide, maintain, and improve the Platform</li>
              <li>To process transactions and send transaction notifications</li>
              <li>To verify your identity and prevent fraud</li>
              <li>To send promotional materials and updates (with your consent)</li>
              <li>To provide customer support and respond to inquiries</li>
              <li>To comply with legal and regulatory requirements</li>
              <li>To analyze usage patterns and improve user experience</li>
            </ul>

            <h2>4. Data Security</h2>
            <p>
              AgriBridge implements advanced security measures to protect your personal data, including:
            </p>
            <ul>
              <li>SSL/TLS encryption for all data transmission</li>
              <li>Secure password hashing and storage</li>
              <li>Two-factor authentication (2FA)</li>
              <li>Regular security audits and penetration testing</li>
              <li>Restricted access to sensitive data</li>
              <li>Secure data storage with regular backups</li>
            </ul>
            <p>
              However, no internet transmission is completely secure. While we strive to protect your information, 
              we cannot guarantee absolute security.
            </p>

            <h2>5. Sharing Your Information</h2>
            <p>
              We do NOT sell your personal data. We only share information in the following circumstances:
            </p>
            <ul>
              <li><strong>Service Providers:</strong> Payment gateways, logistics partners, cloud storage providers</li>
              <li><strong>Legal Compliance:</strong> When required by law or to protect legal rights</li>
              <li><strong>Business Transactions:</strong> In case of merger or acquisition</li>
              <li><strong>With Your Consent:</strong> When you explicitly authorize sharing</li>
              <li><strong>Other Users:</strong> Public profile information visible to other users on the Platform</li>
            </ul>

            <h2>6. Your Rights</h2>
            <p>
              You have the right to:
            </p>
            <ul>
              <li>Access your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data (subject to legal requirements)</li>
              <li>Opt-out of marketing communications</li>
              <li>Download your data in a portable format</li>
              <li>Withdraw consent for data processing</li>
            </ul>

            <h2>7. Cookies and Tracking</h2>
            <p>
              We use cookies and similar technologies to enhance your experience. You can control cookie settings through your browser. 
              However, disabling cookies may affect Platform functionality.
            </p>

            <h2>8. Data Retention</h2>
            <p>
              We retain your personal data for as long as necessary to provide services and comply with legal obligations. 
              Upon account deletion, data is securely deleted within 30 days, except where required by law.
            </p>

            <h2>9. Third-Party Links</h2>
            <p>
              The Platform may contain links to third-party websites. We are not responsible for their privacy practices. 
              We recommend reviewing their privacy policies before sharing information.
            </p>

            <h2>10. Changes to Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of significant changes via email or 
              through the Platform. Your continued use of the Platform constitutes acceptance of changes.
            </p>

            <h2>11. International Data Transfers</h2>
            <p>
              Your data may be transferred to, stored in, and processed in countries other than India. By using the Platform, 
              you consent to such transfers and processing under this Privacy Policy.
            </p>

            <h2>12. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <ul>
              <li><strong>Email:</strong> privacy@agribridge.com</li>
              <li><strong>Phone:</strong> +91 (555) 123-4567</li>
              <li><strong>Address:</strong> 123 Agricultural Street, Mumbai 400001, India</li>
            </ul>

            <h2>13. Grievance Redressal</h2>
            <p>
              For any privacy concerns or complaints, please submit a grievance through our support portal. 
              We aim to resolve all complaints within 30 days.
            </p>

            <p className="policy-footer">
              <strong>Thank you for trusting AgriBridge with your information.</strong> We are committed to maintaining your privacy and trust.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Privacy;