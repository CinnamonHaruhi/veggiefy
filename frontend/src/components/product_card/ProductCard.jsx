import React from 'react';
import './product-card.css';

const ProductCard = (props) => {
  return (
    <div className="po-card">
      <div className="po-img-ph" role="img">Image</div>
      <h2 className="po-card-name">{props.productName}</h2>
      <p className="po-card-price">₱{props.price}</p>
      <p className="po-card-stock">Available Stock: <strong>{props.quantity} {props.unit}</strong></p>
      <button type="button" className="po-card-add">+</button>
    </div>
  )
}

export default ProductCard