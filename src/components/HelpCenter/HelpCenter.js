import React from 'react';
import './HelpCenter.css';
import { useNavigate } from 'react-router-dom';
import customerCareBanner from '../Assets/customer-care.jpg';
import contactBanner from '../Assets/contact-banner.jpg';

const faqTopics = [
  {
    icon: '🚚',
    title: 'Delivery',
    items: ["Where's my order?", 'Delivery Options', 'Deliveries with Partner Brands'],
  },
  {
    icon: '↩️',
    title: 'Returns & Refunds',
    items: ['Returns Policy', 'How do I return?', 'Partner Returns'],
  },
  {
    icon: '📦',
    title: 'Order Issues',
    items: ['Amend or cancel order', "Something’s wrong with my item", 'Missing item'],
  },
  {
    icon: '👕',
    title: 'Product & Stock',
    items: ['Sizing help', 'Sale terms', 'Save for later'],
  },
  {
    icon: '💳',
    title: 'Payment, Promos & Vouchers',
    items: ['Payment options', 'Promo codes', 'Gift vouchers'],
  },
  {
    icon: '⚙️',
    title: 'Technical',
    items: ['Account', 'App', 'Notifications'],
  },
];

const popularFaqs = [
  'What is your Returns Policy?',
  'Will my parcel be charged customs and import charges?',
];

const HelpCenter = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* ✅ Customer Care Banner */}
      <div
        className="customer-care-banner"
        style={{ backgroundImage: `url(${customerCareBanner})` }}
      >
        <h1>CUSTOMER CARE</h1>
        <div className="search-container">
          <input type="text" placeholder="Search for help..." />
          <button aria-label="Search">🔍</button>
        </div>
      </div>

      <div className="hc-wrapper">
        {/* ✅ FAQ Topics */}
        <h2 className="hc-section-title">FAQ Topics</h2>
        <div className="hc-topics">
          {faqTopics.map((topic) => (
            <div key={topic.title} className="hc-topic-card">
              <div className="hc-topic-header">
                <span className="hc-icon">{topic.icon}</span>
                <h4>{topic.title}</h4>
              </div>
              <ul>
                {topic.items.map((q) => (
                  <li key={q}>
                    <button className="link-btn">{q}</button>
                  </li>
                ))}
              </ul>
              <button className="view-all-btn">View All →</button>
            </div>
          ))}
        </div>

        {/* ✅ Side-by-Side Layout: Popular FAQs + Contact Section */}
        <div className="faq-contact-layout">
          <div className="popular-faqs-section">
            <h2 className="hc-section-title">POPULAR FAQS</h2>
            <ul className="hc-popular-ul">
              {popularFaqs.map((faq) => (
                <li key={faq} onClick={() => navigate('/faq/returns-policy')}>
                  {faq} <span className="arrow">›</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="contact-section">
            <h2 className="contact-title">NEED TO GET IN TOUCH?</h2>
            <div className="contact-image-container">
              <img src={contactBanner} alt="Two women laughing" />
            </div>
            <button
              className="contact-button"
              onClick={() => navigate('/contact')}
            >
              CONTACT US NOW
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HelpCenter;
