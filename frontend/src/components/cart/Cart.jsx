import React, { useContext, useEffect, useState } from 'react';
import './cart.css';
import { CartContext } from '../../contexts/cartContext';

const Cart = ({ setCartDialogOpen }) => {
  const cartContext = useContext(CartContext);
  const cartItems = cartContext.cartItems;
  const [ countBadge, setCountBadge ] = useState(5);

  useEffect(() => {
    const getCount = () => {
      let count = 0; 
      cartItems.forEach((item) => {
        count += item.quantity;
      });
      setCountBadge(count);
    }
    getCount();
  }, [cartItems]);

  return (  
    <button type="button" className="po-cart-btn" id="poCartBtn" aria-label="Open basket" onClick={() => {setCartDialogOpen(true)}}>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 3h3l2.5 12h11L21 7H6"/><circle className="po-fill" cx="9" cy="20" r="1.5"/><circle className="po-fill" cx="17" cy="20" r="1.5"/></svg>
      <span className="po-cart-badge" id="poCartBadge">{countBadge}</span>
    </button>
  ) 
}

export default Cart 