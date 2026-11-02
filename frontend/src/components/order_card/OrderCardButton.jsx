import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { toast, Slide } from 'react-toastify';

const OrderCardButton = (props) => {
  const completedStatusId = 4;

  const handleButtonClick = () => {
    try {
      axios.put(`http://localhost:5000/admin/orders/${props.orderId}?statusId=${completedStatusId}`); 
      toast.success("Order completed", {
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
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <button type="button" className="btn-pick" id='btn-pick'
    disabled={!props.allItemsReady}
    onClick={handleButtonClick}
    >
      Picked Up
    </button>
  )
}

export default OrderCardButton