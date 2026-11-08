import React, { useContext, useState } from 'react';
import './cart-item.css';
import { CartContext } from '../../contexts/cartContext';

const CartItem = (props) => {
  const cartContext = useContext(CartContext);  
  const cartItems = cartContext.cartItems;
  const setCartItems = cartContext.setCartItems;
  const [quantity, setQuantity] = useState(props.quantity);
  const index = cartItems.findIndex((item) => {
    return item.id == props.productId;
  });

  const removeItem = () => {
    setCartItems(cartItems.filter((cartItem) => {
      return cartItem.id != props.productId;
    }));
  }

  const increaseQty = () => {
    if (quantity == props.stock) {
      return;
    }

    setQuantity(quantity + 1);
    cartItems[index].quantity = quantity;
    console.log(cartItems[index]);
  };

  const decreaseQty = () => {
    if (quantity == 1) {
      return;
    }

    setQuantity(quantity - 1);
    cartItems[index].quantity = quantity;
    console.log(cartItems[index]);
  }

  return (
    <li className="po-basket-item">        
      <div className="po-basket-info">
        <strong>{props.productName}</strong>
        <span>₱{props.price} per {props.unit}</span>
      </div>
      <div className="po-basket-side">
        <button type="button" className="po-trash" onClick={removeItem}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 3h6l1 2h4v2H4V5h4Zm-3 6h12l-1 12H7Z"/></svg></button>
        <div className="po-qty po-qty-sm">
          <button type="button" className="po-qty-btn" onClick={decreaseQty}>&minus;</button>
          <span className="po-qty-num">{quantity}</span>
          <button type="button" className="po-qty-btn" onClick={increaseQty}>+</button>
        </div>
      </div>
    </li>
  )
}

export default CartItem