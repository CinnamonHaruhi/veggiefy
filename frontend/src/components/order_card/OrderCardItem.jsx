import {React, useEffect, useState } from 'react';
import axios from 'axios';

const OrderCardItem = ({setButtonState, ...props}) => {
  const preparingStatusId = 2;
  const readyStatusId = 3;

  const checkboxHandler = async (e) => {
    let statusId = "";
    if (e.target.checked) {
      statusId = readyStatusId;
    } else {
      statusId = preparingStatusId;
    }
    try {
      await axios.put(`http://localhost:5000/admin/orders/${props.orderId}/items/${props.orderItemId}?statusId=${statusId}`);
      setButtonState();
      setOrderStatus();
    } catch (err) {
      console.log(err);
    }
  }

  const setOrderStatus = async () => {
    const allItemsReady =  await axios.get(`http://localhost:5000/admin/orders/${props.orderId}/items/ready`);

    if (allItemsReady.data) {
      axios.put(`http://localhost:5000/admin/orders/${props.orderId}?statusId=${readyStatusId}`); 
      return;
    } 

    axios.put(`http://localhost:5000/admin/orders/${props.orderId}?statusId=${preparingStatusId}`); 
  }

  return (
    <li>
      <label className="item">{props.productName} ({props.quantity} kg)<input id="checkbox" type="checkbox" onClick={checkboxHandler} 
      defaultChecked={props.statusId == readyStatusId ? true : false}/>
      <span className="box"></span>
      </label>
    </li>
  )
}

export default OrderCardItem