import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [ cartItems, setCartItems ] = useState([]);
  const [ totalAmount, setTotalAmount ] = useState();

  const resetCart = () => {
    setCartItems([]);
  }

  const removeItem = (productId) => {
    setCartItems(cartItems.filter((item) => {
      return item.productId != productId;
    }));
  }

  const addOne = (productId) => {
    setCartItems(cartItems.map((item) => {
    if (item.productId == productId && item.quantity < item.stock) {
      item.quantity += 1;
    }
    return item;
    }));
  }

  const removeOne = (productId) => {
    setCartItems(cartItems.map((item) => {
    if (item.productId == productId && item.quantity > 1) {
      item.quantity -= 1;
    }
    return item;
    }));
  }

  const addToCart = (product) => {
    setCartItems([product, ...cartItems]);
  }

  const addExistingToCart = (product) => {
    setCartItems(cartItems.map((item) => {
      if (item.productId == product.productId) {
        item.quantity += product.quantity;
      }
      return item;
    }));
  }

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      setCartItems, 
      resetCart, 
      totalAmount, 
      removeItem, 
      addOne,
      removeOne,
      addToCart,
      addExistingToCart }}>
      {children}
    </CartContext.Provider>
  );  
}