import React, { useContext, useEffect, useState } from 'react';
import './cart-item.css';
import useHandleCart from '../../hooks/useHandleCart';

const CartItem = (props) => {
  const { cartItems, removeItem, addOne, removeOne } = useHandleCart();

  return (
    <li className="po-basket-item">        
      <div className="po-basket-info">
        <strong>{props.productName}</strong>
        <span>₱{props.price} per {props.unit}</span>
      </div>
      <div className="po-basket-side">
        <button type="button" className="po-trash" onClick={() => { removeItem(props.productId) }}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 3h6l1 2h4v2H4V5h4Zm-3 6h12l-1 12H7Z"/></svg></button>
        <div className="po-qty po-qty-sm">
          <button type="button" className="po-qty-btn" onClick={() => { removeOne(props.productId) } }>&minus;</button>
          <span className="po-qty-num">{props.quantity}</span>
          <button type="button" className="po-qty-btn" onClick={() => { addOne(props.productId) }}>+</button>
        </div>
      </div>
    </li>
  )
}

export default CartItem