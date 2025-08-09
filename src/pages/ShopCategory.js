import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import './CSS/shopcategory.css';

import dropdown_icon from '../components/Assets/dropdown_icon.jpg'; 
import Item from '../components/Item/Item'; 

const ShopCategory = ({ category, banner }) => {
  const { AllProducts } = useContext(ShopContext);

  let startIndex = 0;
  let endIndex = 0;

  if (category.toLowerCase() === 'men') {
    startIndex = 0;
    endIndex = 10;
  } else if (category.toLowerCase() === 'women') {
    startIndex = 10;
    endIndex = 30;
  } else if (category.toLowerCase() === 'kids') {
    startIndex = 30;
    endIndex = AllProducts.length;
  }

  const productsToShow = AllProducts.slice(startIndex, endIndex);

  return (
    <div className='shop_category'>
      <img className='shopcategory-banner' src={banner} alt="category banner" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing {startIndex + 1}–{Math.min(endIndex, AllProducts.length)}</span> out of {AllProducts.length} products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="Sort dropdown" />
        </div>
      </div>

      <div className="shopcategory-products">
        {productsToShow.map((item, i) => (
          <Item
            key={item.id}
            id={item.id}
            name={item.name}
            image={item.image}
            // 💲 Dollar signs added here
            new_price={`$${item.new_price}`}
            old_price={`$${item.old_price}`}
          />
        ))}
      </div>
    <button className="shopcategory-loadmore">Explore More</button>

    </div>
    
  );
};

export default ShopCategory;
