import React, { useContext, useEffect, useState } from 'react';
import './Confirmation.css';
import { ShopContext } from '../context/ShopContext';

const Confirmation = () => {
  const { cartItems, AllProducts } = useContext(ShopContext);

  const [order, setOrder] = useState({});
  const [items, setItems] = useState([]);
  const [isBuyNow, setIsBuyNow] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('orderInfo'));
    setOrder(stored || {});
    setItems(stored?.items || []);

    // Detect if this was a "Buy Now" order
    if (stored?.items?.length > 0) {
      setIsBuyNow(true);
    }
  }, []);

  // 🔁 Total for cart-based orders
  const getTotalFromCart = () => {
    return Object.entries(cartItems).reduce((total, [id, quantity]) => {
      const product = AllProducts.find((item) => item.id === Number(id));
      if (product && quantity > 0) {
        return total + Number(product.new_price) * quantity;
      }
      return total;
    }, 0);
  };

  // 🔁 Total for buy-now product(s)
  const getTotalFromItems = () => {
    return items.reduce((total, p) => total + (p.new_price * p.quantity), 0);
  };

  return (
    <div className="confirmation">
      <h1>🎉 Order Placed Successfully</h1>
      <p>Thank you <b>{order.name}</b> for shopping with us!</p>

      <h3>🧾 Order Summary:</h3>

      {isBuyNow ? (
        items.map((p, i) => (
          <div key={i} className="confirmation-item">
            <img src={p.image} alt={p.name} />
            <div>
              <p><strong>{p.name}</strong></p>
              <p>Quantity: {p.quantity}</p>
              <p>Price: ${p.new_price} each</p>
              <p><strong>Subtotal: ${p.new_price * p.quantity}</strong></p>
            </div>
          </div>
        ))
      ) : (
        Object.entries(cartItems).map(([id, quantity]) => {
          const product = AllProducts.find((p) => p.id === Number(id));
          if (product && quantity > 0) {
            return (
              <div key={id} className="confirmation-item">
                <img src={product.image} alt={product.name} />
                <div>
                  <p><strong>{product.name}</strong></p>
                  <p>Quantity: {quantity}</p>
                  <p>Price: ${product.new_price} each</p>
                  <p><strong>Subtotal: ${Number(product.new_price) * quantity}</strong></p>
                </div>
              </div>
            );
          }
          return null;
        })
      )}

      <h3 style={{ marginTop: "30px" }}>
        🧮 Total Amount: ${isBuyNow ? getTotalFromItems() : getTotalFromCart()}
      </h3>

      <h4 style={{ marginTop: "30px" }}>🚚 Shipping to:</h4>
      <p>{order.address}, {order.city}, ZIP: {order.zip}</p>
    </div>
  );
};

export default Confirmation;
