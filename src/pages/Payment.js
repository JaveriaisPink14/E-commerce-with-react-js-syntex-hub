import React, { useState, useEffect } from 'react';
import './Payment.css';
import { useLocation, useNavigate } from 'react-router-dom';

const Payment = () => {
  const [info, setInfo] = useState({ name: '', email: '', address: '', city: '', zip: '' });
  const [buyNowProduct, setBuyNowProduct] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const isBuyNow = new URLSearchParams(location.search).get('mode') === 'buyNow';

  useEffect(() => {
    if (isBuyNow) {
      const data = JSON.parse(localStorage.getItem("buyNowProduct"));
      setBuyNowProduct(data);
    }
  }, [isBuyNow]);

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    if (Object.values(info).some((val) => val.trim() === '')) {
      alert('⚠️ Please fill all fields!');
      return;
    }

    const orderData = {
      ...info,
      items: isBuyNow ? [buyNowProduct] : [], // will fill full cart later
    };

    localStorage.setItem("orderInfo", JSON.stringify(orderData));
    navigate("/confirmation");
  };

  return (
    <div className="payment-container">
      <h2>🚚 Shipping Information</h2>

      <div className="form">
        {['name', 'email', 'address', 'city', 'zip'].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={`Enter your ${field}`}
            value={info[field]}
            onChange={handleChange}
          />
        ))}

        {isBuyNow && buyNowProduct ? (
          <div className="buy-now-summary">
            <h3>🛍️ Product Summary</h3>
            <p><strong>{buyNowProduct.name}</strong> × {buyNowProduct.quantity}</p>
            <p>Price: ${buyNowProduct.new_price}</p>
            <p>Size: {buyNowProduct.selectedSize}</p>
          </div>
        ) : (
          <p className="full-cart-info">🛒 Order includes full cart items</p>
        )}

        <button onClick={handlePlaceOrder}>📦 PLACE ORDER</button>
      </div>
    </div>
  );
};

export default Payment;
