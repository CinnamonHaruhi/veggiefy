import { React, useEffect, useState } from 'react';
import axios from 'axios';

const OrderCardButton = ({ setMessage, ...props }) => {
  const completedStatusId = 4;

  const handleButtonClick = () => {
    try {
      axios.put(`http://localhost:5000/admin/orders/${props.orderId}?statusId=${completedStatusId}`);
      localStorage.setItem("preparationMessage", "Order completed");
      window.location.reload(); 
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