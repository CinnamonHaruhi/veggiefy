import { React, useRef, useState } from 'react';
import './product-card.css';
import ProductCardDialog from '../product_card_dialog/ProductCardDialog';

const ProductCard = (props) => {
  const [ dialogOpen, setDialogOpen ] = useState(false);

  return (
    <>
      <div className="po-card">
        <div className="po-img-ph" role="img">Image</div>
        <h2 className="po-card-name">{props.productName}</h2>
        <p className="po-card-price">₱{props.price}</p>
        <p className="po-card-stock">Available Stock: <strong>{props.quantity} {props.unit}</strong></p>
        <button type="button" className="po-card-add" onClick={() => {setDialogOpen(true)}}>+</button>
      </div>

      <ProductCardDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen}
        productName={props.productName}
        price={props.price}
        quantity={props.quantity}
        unit={props.unit}
      />
    </>
  )
}

export default ProductCard