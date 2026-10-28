import React from 'react'
import './dialog.css';

const ItemsDialog = ({ orderItems }) => {
  const items = orderItems;

  const itemComponents = [];
  for (const item of items) {
    itemComponents.push(
      <div  key={item.order_item_id}>
        <p>{item.product_name} x{item.quantity}</p>
      </div>
    )
  }

  return (
    <dialog className="dialog" id='itemsDialog'>
      <form>
        <h2 id="dialogTitle">Order items</h2>
        <div className="dialogFields">
          {itemComponents}
        </div>
        <div className='dialog-actions'>
          <button type="button" className="dialog-btn dialog-btn-light" id="dialogCancel" onClick={() => {document.getElementById("itemsDialog").close()}}>Close</button>
          <button type="button" className="dialog-btn dialog-btn-dark">Start preparing</button>
        </div>
      </form>
    </dialog> 
  )
}

export default ItemsDialog