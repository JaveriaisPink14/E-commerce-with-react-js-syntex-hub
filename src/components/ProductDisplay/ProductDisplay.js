import React, { useContext, useState } from 'react';
import './ProductDisplay.css';
import star_icon from '../Assets/star_icon.jpg';
import { ShopContext } from '../../context/ShopContext';
import { CartContext } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // ✅ Import SweetAlert2

const ProductDisplay = ({ product }) => {
  const { addToCart } = useContext(ShopContext);
  const { incrementProduct } = useContext(CartContext);
  const [selectedSize, setSelectedSize] = useState(null);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn !== "true") {
      Swal.fire({
        icon: 'warning',
        title: 'Not Logged In',
        text: '❗ Please login your account first',
      });
      return;
    }

    if (!selectedSize) {
      Swal.fire({
        icon: 'info',
        title: 'Size Required',
        text: '⚠️ Please select a size',
      });
      return;
    }

    addToCart(product.id);
    incrementProduct(product.name);

    Swal.fire({
      icon: 'success',
      title: 'Added to Cart',
      text: `${product.name} has been added to your cart.`,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const handleBuyNow = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn !== "true") {
      Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: '❗ Please login first to place order',
      });
      return;
    }

    if (!selectedSize) {
      Swal.fire({
        icon: 'info',
        title: 'Select Size',
        text: '⚠️ Please select a size before proceeding',
      });
      return;
    }

    localStorage.setItem("buyNowProduct", JSON.stringify({
      ...product,
      quantity: 1,
      selectedSize: selectedSize
    }));

    navigate("/payment?mode=buyNow");
  };

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          {[1, 2, 3, 4].map((_, i) => (
            <img key={i} src={product.image} alt={`product-${i}`} />
          ))}
        </div>
        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={product.image} alt={product.name} />
        </div>
      </div>

      <div className="productdisplay-right">
        <h1>{product.name}</h1>

        <div className="productdisplay-right-stars">
          <img src={star_icon} alt="star" />
          <p>(122 reviews)</p>
        </div>

        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">${product.old_price}</div>
          <div className="productdisplay-right-price-new">${product.new_price}</div>
        </div>

        <div className="productdisplay-right-description">
          A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves.
        </div>

        <div className="productdisplay-right-size">
          <h2>Select Size</h2>
          <div className="productdisplay-right-sizes">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <div
                key={size}
                className={`size-box ${selectedSize === size ? "selected" : ""}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </div>
            ))}
          </div>
        </div>

        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          ADD TO CART
        </button>

        <button className="buy-now-btn" onClick={handleBuyNow}>
          BUY NOW
        </button>

        <p className="productdisplay-right-category">
          <span>Category:</span> Women, T-Shirt, Crop Top
        </p>
        <p className="productdisplay-right-category">
          <span>Tags:</span> Modern, Latest
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;
