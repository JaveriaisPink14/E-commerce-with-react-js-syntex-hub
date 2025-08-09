// src/pages/ProductAnalytics.js
import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/CartContext';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import './ProductAnalytics.css';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

const categoryMap = {
  'T-Shirt 👕': 'Men',
  'Hoodie 🧥': 'Men',
  'Sneakers 👟': 'Women',
  'Skirt 👗': 'Women',
  'Baby Suit 👶': 'Kids',
  'Cap 🧢': 'Kids',
};

const ProductAnalytics = () => {
  const { cartCounts } = useContext(CartContext);
  const [categoryFilter, setCategoryFilter] = useState('All');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredData = Object.entries(cartCounts)
    .filter(([product]) => categoryFilter === 'All' || categoryMap[product] === categoryFilter)
    .map(([name, count]) => ({ name, count }));

  const categoryData = Object.entries(cartCounts).reduce((acc, [product, count]) => {
    const cat = categoryMap[product] || 'Other';
    acc[cat] = (acc[cat] || 0) + count;
    return acc;
  }, {});

  const pieChartData = Object.entries(categoryData).map(([category, count]) => ({
    name: category,
    value: count
  }));

  const topProducts = [...filteredData]
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);

  const totalAdds = Object.values(cartCounts).reduce((sum, val) => sum + val, 0);

  return (
    <div className="analytics-container">
      <h1 className="analytics-heading">📊 Product Cart Analytics</h1>

      <div className="stats-summary">
        <div>Total Products in Cart: <strong>{Object.keys(cartCounts).length}</strong></div>
        <div>Total Adds: <strong>{totalAdds}</strong></div>
      </div>

      <div className="analytics-filter">
        <label>Filter by Category:</label>
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
        </select>
      </div>

      {filteredData.length > 0 ? (
        <>
          <div className="analytics-grid">
            <div className="chart-box">
              <h3>📦 Bar Chart</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={filteredData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-box">
              <h3>📈 Category Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={pieChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="top-products">
            <h3>🔥 Top 3 Most Added Products</h3>
            <ul>
              {topProducts.map((item, index) => (
                <li key={index}>
                  #{index + 1} <strong>{item.name}</strong> – {item.count} adds
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <div className="empty-state">🛒 No products have been added to the cart yet.</div>
      )}
    </div>
  );
};

export default ProductAnalytics;
