import React, { createContext, useState } from "react";
import AllProductsMain from "../components/Assets/AllProducts";
import RelatedProductsData from "../components/Assets/data";
import new_collections from "../components/Assets/new_collections";


export const ShopContext = createContext(null);

const ShopContextProvider = ({ children }) => {
  // Merge all products
  const AllProducts = [...AllProductsMain, ...RelatedProductsData,...new_collections];

  // Initialize cart with product IDs
  const getDefaultCart = () => {
    const cart = {};
    AllProducts.forEach((product) => {
      cart[product.id] = 0;
    });
    return cart;
  };

  const [cartItems, setCartItems] = useState(getDefaultCart());

  // Add item to cart
  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] + 1,
      
    }));
    console.log(cartItems);
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] > 0 ? prev[itemId] - 1 : 0,
    }));
  };
const getTotalCartAmount = () => {
  let totalAmount = 0;
  for (const item in cartItems) {
    if (cartItems[item] > 0) {
      const itemInfo = AllProducts.find((product) => product.id === Number(item));
      if (itemInfo) {
        // Fix: Use new_price or price, and convert string to number safely
        const price = Number(itemInfo.new_price || itemInfo.price || 0);
        totalAmount += price * cartItems[item];
      }
    }
  }
  return totalAmount;
};

const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
        if (cartItems[item] > 0) {
            totalItem += cartItems[item];
        }
    }
    return totalItem;
}

  // Provide everything through context
  const contextValue = {
    AllProducts,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems ,
    
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
