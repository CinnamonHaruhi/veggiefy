import { useEffect, useState } from 'react';
import axios from "axios";
import './order-card.css';

const OrderCard = (props) => {
  const [ items, setItems ] = useState([]); 

  useEffect(() => {
    const fetchItems = async(orderId) => {
      const items = await axios.get(`http://localhost:5000/admin/orders/${orderId}/items`);
      setItems(items.data); 
    }
    fetchItems(props.orderId);
  }, []);

  const itemComponents =[];
  for (const item of items) {
    itemComponents.push(
      <li key={item.order_item_id}>
        <label className="item">{item.product_name} ({item.quantity} kg)<input type="checkbox"/>
        <span className="box"></span>
        </label>
      </li>);
  }

  return (
    <article className="order-card" data-order="ORD001">
      <div className="order-head">
        <h2 className="order-id">{props.orderNo}</h2>
        <button type="button" className="kebab" aria-label="Order options" aria-haspopup="true"><span></span><span></span><span></span></button>
      </div>
      <div className="order-meta">
        <span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2Zm-2 8h14v10H5Z"/></svg>{props.date}</span>
        <span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.400 0-8 2.200-8 5v1h16v-1c0-2.800-3.600-5-8-5Z"/></svg>{props.user}</span>
      </div>
      <ul className="items">
        {itemComponents}
      </ul>
      <div className="order-foot">
        <span className="order-total">₱{props.total}</span>
        <button type="button" className="btn-pick">Picked Up</button>
      </div>
      <div className="menu" role="menu">
        <button type="button" role="menuitem" data-action="view">View</button>
        <button type="button" role="menuitem" data-action="cancel" className="danger">Cancel Order</button>
      </div>
  </article>
  )
}

export default OrderCard