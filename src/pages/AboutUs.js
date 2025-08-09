// src/pages/AboutUs.js

import React from 'react';
import './AboutUs.css';
import aboutBanner from '../components/Assets/about-banner.jpg';

const AboutUs = () => (
  <div className="about-wrapper">

    {/* ✅ Banner with animated text */}
    <div className="about-banner">
      <img src={aboutBanner} alt="Shopper Banner" />
      <div className="about-banner-text">
        <h1>Welcome to Shopper</h1>
        <p>Your one-stop fashion & lifestyle destination – stylishly curated, globally delivered.</p>
      </div>
    </div>

    {/* ✅ Intro Paragraph */}
    <section className="about-intro">
      <h2>About Us</h2>
      <p>
        Shopper launched with the goal of combining stylish, thoughtfully curated products with exceptional customer experience.
        From our first launch to thousands of customers across continents, we empower creativity and everyday joy through design.
      </p>
    </section>

    {/* ✅ Fast Facts */}
    <section className="about-facts">
      <h3>Fast Facts</h3>
      <div className="facts-grid">
        <div className="fact-card">
          <h2>5K+</h2>
          <p>Products Available</p>
        </div>
        <div className="fact-card">
          <h2>99%</h2>
          <p>Happy Customers</p>
        </div>
        <div className="fact-card">
          <h2>20+</h2>
          <p>Countries Served</p>
        </div>
        <div className="fact-card">
          <h2>50K+</h2>
          <p>Orders Delivered</p>
        </div>
      </div>
    </section>

    {/* ✅ Mission Cards */}
    <section className="about-mission">
      <h3>Our Mission</h3>
      <div className="mission-cards">
        <div className="mission-card">
          <h4>Inspire Creativity</h4>
          <p>Curated products that spark joy and expression.</p>
        </div>
        <div className="mission-card">
          <h4>Support Dreams</h4>
          <p>Empowering students, creators and artists everywhere.</p>
        </div>
        <div className="mission-card">
          <h4>Grow Globally</h4>
          <p>Elegant design delivered across borders.</p>
        </div>
      </div>
    </section>

  </div>
);

export default AboutUs;
