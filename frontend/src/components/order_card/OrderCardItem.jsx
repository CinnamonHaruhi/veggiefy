import {React, useEffect, useState } from 'react';
import axios from 'axios';

const OrderCardItem = ({onCheckboxClick, ...props}) => {
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
      onCheckboxClick();
    } catch (err) {
      console.log(err);
    }
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