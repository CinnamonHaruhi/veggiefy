import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [ cartItems, setCartItems ] = useState([]);
  const [ totalAmount, setTotalAmount ] = useState(0);
  const [ countBadge, setCountBadge ] = useState(0);

  const resetCart = () => {
    setCartItems([]);
    setTotalAmount(0);
    setCountBadge(0);
  }

  const removeItem = (productId) => {
    setCartItems(cartItems.filter((item) => {
      if (item.productId != productId) {
        return true;
      } else {
        setCountBadge(countBadge - item.quantity);
        subtractFromTotal(item.price, item.quantity);
      }
    }));
  }

  const addOne = (productId) => {
    setCartItems(cartItems.map((item) => {
    if (item.productId == productId && item.quantity < item.stock) {
      item.quantity += 1;
      setCountBadge(countBadge + 1);
      addToTotal(item.price, 1);
    }
    return item;
    }));
  }

  const removeOne = (productId) => {
    setCartItems(cartItems.map((item) => {
    if (item.productId == productId && item.quantity > 1) {
      item.quantity -= 1;
      setCountBadge(countBadge - 1);
      subtractFromTotal(item.price, 1);
    }
    return item;
    }));
  }

  const addToCart = (product) => {
    setCartItems([product, ...cartItems]);
    setCountBadge(countBadge + product.quantity);
    addToTotal(product.price, product.quantity);
  }

  const addExistingToCart = (product) => {
    setCartItems(cartItems.map((item) => {
      if (item.productId == product.productId) {
        item.quantity += product.quantity;
      }
      return item;
    }));
    setCountBadge(countBadge + product.quantity);
    addToTotal(product.price, product.quantity);
  }

  const addToTotal = (price, quantity) => {
    price = price * 100;

    setTotalAmount(totalAmount + ( Number(price) * Number(quantity) ));
  }

  const subtractFromTotal = (price, quantity) => {
    price = price * 100;

    setTotalAmount(totalAmount - ( Number(price) * Number(quantity) ));
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
      addExistingToCart,
      countBadge }}>
      {children}
    </CartContext.Provider>
  );  
}