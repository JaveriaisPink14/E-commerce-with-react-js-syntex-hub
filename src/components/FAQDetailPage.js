import React from 'react';
import './FAQDetailPage.css';
import contactBanner from './Assets/contact-banner.jpg';
import { useNavigate } from 'react-router-dom';

const FAQDetailPage = () => {
  const navigate = useNavigate(); // ✅ useNavigate inside component

  return (
    <div className="faq-page-wrapper">
      <div
        className="faq-header-banner"
        style={{ backgroundImage: `url(${contactBanner})` }}
      >
        <div className="faq-header-content">
          <h1>RETURNS & REFUNDS</h1>
        </div>
      </div>

      <div className="faq-main-content">
        <div className="faq-content-area">
          <h2 id="returns-policy">What is your Returns Policy?</h2>

          {/* Table of Contents Links */}
          <div className="faq-links-column">
            <ul>
              <li><a href="#returning-unwanted-item">Returning an unwanted item?</a></li>
              <li><a href="#after-that">After that?</a></li>
              <li><a href="#original-condition">Original Condition</a></li>
              <li><a href="#responsibility">Responsibility</a></li>
              <li><a href="#fair-use">Fair use</a></li>
              <li><a href="#exchanges">Exchanges</a></li>
              <li><a href="#faulty-incorrect-items">Faulty and incorrect items</a></li>
              <li><a href="#new-returns-note-label">New returns note/label</a></li>
              <li><a href="#asos-brand-partners">ASOS Brand Partners</a></li>
            </ul>
          </div>

          {/* FAQ Content Sections */}
          <h3 id="returning-unwanted-item">Returning an unwanted item?</h3>
          <p>
            We get it, sometimes something just doesn't work for you and you want your money back.
            As long as an item is still in its original condition, we accept returns, subject to the
            rules below, including rules about fair use...
          </p>

          <h3 id="after-that">After that?</h3>
          <p>If your return window has passed, we may not be able to process a refund.</p>

          <h3 id="original-condition">Original Condition</h3>
          <p>Items must be returned in their original condition with tags and packaging.</p>

          <h3 id="responsibility">Responsibility</h3>
          <p>You're responsible for safely returning the item to us unless otherwise stated.</p>

          <h3 id="fair-use">Fair use</h3>
          <p>We reserve the right to decline a return if abuse of the return policy is suspected.</p>

          <h3 id="exchanges">Exchanges</h3>
          <p>We do not offer exchanges. Just return and re-order.</p>

          <h3 id="faulty-incorrect-items">Faulty and incorrect items</h3>
          <p>If something’s wrong with your order, please contact us as soon as possible.</p>

          <h3 id="new-returns-note-label">New returns note/label</h3>
          <p>You must include the correct returns note and use the label provided in your account.</p>

          <h3 id="asos-brand-partners">ASOS Brand Partners</h3>
          <p>
            Items sold by ASOS Brand Partners follow the same returns policy,
            unless stated otherwise on the product page...
          </p>
        </div>

        {/* Right Sidebar */}
        <div className="faq-sidebar-right">
          <div className="sidebar-section faq-topics">
            <h4>FAQ TOPICS</h4>
            <ul>
              <li><a href="#"><span className="icon">🚚</span> Delivery</a></li>
              <li><a href="#"><span className="icon">📦</span> Returns & Refunds</a></li>
              <li><a href="#"><span className="icon">⚠️</span> Order issues</a></li>
              <li><a href="#"><span className="icon">👕</span> Product & Stock</a></li>
              <li><a href="#"><span className="icon">💳</span> Payment, Promos & Gift Vouchers</a></li>
              <li><a href="#"><span className="icon">⚙️</span> Technical</a></li>
            </ul>
          </div>

          <div className="sidebar-section search-help">
            <p>NEED TO SEARCH FOR IT?</p>
            <div className="search-box">
              <input type="text" placeholder="Search for help" />
              <button>🔍</button>
            </div>
          </div>

          <div className="sidebar-section contact-us-banner">
            <img src={contactBanner} alt="Contact Us" />
          </div>

          <div className="sidebar-section contact-us">
            <p>NEED TO GET IN TOUCH?</p>
            <button
              className="contact-us-button"
              onClick={() => navigate('/contact')} // ✅ This works now
            >
              CONTACT US NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQDetailPage;
