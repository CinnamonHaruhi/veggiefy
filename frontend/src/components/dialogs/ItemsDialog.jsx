import { React, useRef } from 'react'
import './dialog.css';
import axios from 'axios';
import { toast, Slide } from 'react-toastify';

const ItemsDialog = ({ orderItems, setData }) => {
  const dialog = useRef(null);
  const items = orderItems;
  let orderStatus = "";
  
  if (items.length !== 0) {
    orderStatus = items[0].status_name.toLowerCase();
  }

  const handleStartPreparing = async () => {
    const preparingStatusId = 2;
    const res = await axios.put(`http://localhost:5000/admin/orders/${items[0].order_id}?statusId=${preparingStatusId}`);
    toast.success("Order has been sent to preparation page", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Slide,
    });
    setData(res.data);
    dialog.current.close();
  }

  return (
    <dialog ref={dialog} className="dialog" id='itemsDialog'>
      <form>
        <h2 id="dialogTitle">Order items</h2>
        <div className="dialogFields">
          {items.map((item) => {
            return(
            <div key={item.order_item_id}>
              <p>{item.product_name} ₱({item.price}) x{item.quantity}</p>
            </div>)
          })}
        </div>
        <div className='dialog-actions'>
          <button type="button" className="dialog-btn dialog-btn-light" id="dialogCancel" onClick={() => {document.getElementById("itemsDialog").close()}}>Close</button>
          {orderStatus == "pending" && 
          <button type="button" className="dialog-btn dialog-btn-dark" onClick={handleStartPreparing}>Start preparing</button>}
        </div>
      </form>
    </dialog> 
  )
}

export default ItemsDialog