import React from 'react';
import './cart-item.css';

const CartItem = () => {
  return (
    <li className="po-basket-item">        
      <div className="po-basket-info">
        <strong>Tomatoes are so gross!</strong>
        <span>per kg</span>
      </div>
      <div className="po-basket-side">
        <button type="button" className="po-trash">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 3h6l1 2h4v2H4V5h4Zm-3 6h12l-1 12H7Z"/></svg></button>
        <div className="po-qty po-qty-sm">
          <button type="button" className="po-qty-btn">&minus;</button>
          <span className="po-qty-num">1</span>
          <button type="button" className="po-qty-btn">+</button>
        </div>
      </div>
    </li>
  )
}

export default CartItem