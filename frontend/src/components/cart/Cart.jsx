import React, { useContext, useEffect, useState } from 'react';
import './cart.css';
import useHandleCart from '../../hooks/useHandleCart';

const Cart = ({ setCartDialogOpen }) => {
  const { countBadge } = useHandleCart();

  return (  
    <button type="button" className="po-cart-btn" id="poCartBtn" aria-label="Open basket" onClick={() => {setCartDialogOpen(true)}}>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 3h3l2.5 12h11L21 7H6"/><circle className="po-fill" cx="9" cy="20" r="1.5"/><circle className="po-fill" cx="17" cy="20" r="1.5"/></svg>
      <span className="po-cart-badge" id="poCartBadge">{countBadge}</span>
    </button>
  ) 
}

export default Cart 