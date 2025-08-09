import { createContext, useState } from 'react';

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cartCounts, setCartCounts] = useState({});

  const incrementProduct = (productName) => {
    setCartCounts((prev) => ({
      ...prev,
      [productName]: (prev[productName] || 0) + 1,
    }));
  };

  return (
    <CartContext.Provider value={{ cartCounts, incrementProduct }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
