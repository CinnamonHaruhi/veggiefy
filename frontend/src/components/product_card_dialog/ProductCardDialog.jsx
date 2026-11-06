import { React, useEffect, useRef } from 'react';
import './product-card-dialog.css';

const ProductCardDialog = ({ setDialogOpen, ...props }) => {
  const dialog = useRef(null);

  if (dialog.current) {
    if (props.dialogOpen) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  } 

  return (
    <dialog ref={dialog} className="po-dialog po-dialog-detail dialog" id="poDetailDialog" aria-labelledby="poDetailName">
        <button type="button" className="po-close" data-close aria-label="Close" onClick={()=>{setDialogOpen(false)}}>&times;</button>

        <div className="po-detail-top">
          <div className="po-img-ph po-img-lg" role="img" aria-label="No product image">
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="8" cy="8" r="2.2"/><path d="M2 21 9 11l4 5 3-3 6 8Z"/></svg>
          </div>
          <div className="po-detail-info">
            <h2 id="poDetailName">{props.productName}</h2>
            <p className="po-detail-price" id="poDetailPrice">₱{props.price} per {props.unit}</p>
          </div>
       </div>
        <p className="po-detail-stock">Available Stock: <strong id="poDetailStock">{props.quantity} {props.unit}</strong></p>

        <div className="po-qty" aria-label="Quantity">
          <button type="button" className="po-qty-btn" id="poDetailMinus" aria-label="Decrease quantity">&minus;</button>
          <span className="po-qty-num" id="poDetailQty" aria-live="polite">1</span>
          <button type="button" className="po-qty-btn" id="poDetailPlus" aria-label="Increase quantity">+</button>
        </div>

        <button type="button" className="po-btn dialog-btn dialog-btn-dark" id="poDetailAdd">Add</button>
    </dialog>
  )
}

export default ProductCardDialog