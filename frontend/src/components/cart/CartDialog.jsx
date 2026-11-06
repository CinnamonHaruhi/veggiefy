import { React, useRef } from 'react';
import './cart-dialog.css';

const CartDialog = ({setCartDialogOpen, children, ...props}) => {
  const cartDialog = useRef(null);
  if (cartDialog.current) {
    if (props.cartDialogOpen) {
      cartDialog.current.showModal();
    } else {
      cartDialog.current.close();
    }
  }

  return (
    <dialog ref={cartDialog} className="po-dialog po-dialog-basket" id="poBasketDialog" aria-labelledby="poBasketTitle">
      <div className="po-basket-head">
        <h2 id="dialogTitle">In basket</h2>
        <div className="po-basket-head-right">
          <button type="button" className="po-reset" id="poReset">Reset</button>
          <button type="button" className="po-close" data-close aria-label="Close basket" onClick={() => {setCartDialogOpen(false)}}>&times;</button>
        </div>
      </div>

      {children ? 
        <ul className="po-basket-list" id="poBasketList">
          {children}
        </ul>
      :
        <p className="po-basket-empty" id="poBasketEmpty">Your basket is empty.</p>
      }


      <div className="po-basket-total">
        <span>Total</span>
        <strong id="poTotal">₱0.00</strong>
      </div>

      <div className="po-basket-actions">
        <button type="button" className="po-btn dialog-btn dialog-btn-light" onClick={() => {setCartDialogOpen(false)}}>Close</button>
        <button type="button" className="po-btn dialog-btn dialog-btn-dark" id="poPlaceOrder">Place order</button>
      </div>
    </dialog>
  )
}

export default CartDialog