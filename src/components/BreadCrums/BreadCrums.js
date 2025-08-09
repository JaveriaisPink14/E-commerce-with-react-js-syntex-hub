import React from 'react';
import './BreadCrums.css';
import arrow_icon from '../Assets/arrow_icon.png';

const BreadCrums = ({ product }) => {
  return (
    <div className="breadcrumb">
      <span>Home</span>
      <img src={arrow_icon} alt=">" />
      <span>Shop</span>

      {product?.category && (
        <>
          <img src={arrow_icon} alt=">" />
          <span>{product.category}</span>
        </>
      )}

      <img src={arrow_icon} alt=">" />
      <span>{product?.name}</span>
    </div>
  );
};

export default BreadCrums;
