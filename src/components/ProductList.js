import React, { useEffect, useState } from "react";
import "./ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => => console.error("Error loading products:", err));
  }, []);

  return (
    <div className="product-list">
      <h2>All Products</h2>
      <div className="product-grid">
        {products.map((item) => (
          <div className="product-card" key={item.id}>
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>Category: {item.category}</p>
            <p className="price">
              <span className="old">Rs {item.old_price}</span> &nbsp;
              <span className="new">Rs {item.new_price}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
