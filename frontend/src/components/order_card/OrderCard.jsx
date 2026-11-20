import { useEffect, useState, useCallback } from 'react';
import axios from "axios";
import './order-card.css';
import OrderCardItem from './OrderCardItem';
import OrderCardButton from './OrderCardButton';
import { toast, Slide } from 'react-toastify';

const OrderCard = ({ setData, ...props }) => {
  const [ items, setItems ] = useState([]); 
  const [ loading, setLoading ] = useState(true);
  const [ allItemsReady, setAllItemsReady ] = useState(false);
  const [ menuClass, setMenuClass ] = useState("menu");

  const setButtonState = useCallback(
    async () => {
      const allItemsReady =  await axios.get(`http://localhost:5000/admin/orders/${props.orderId}/items/ready`);
      setAllItemsReady(allItemsReady.data);
    }
  );

  useEffect(() => {
    setButtonState();
  }, []);

  useEffect(() => {
    const fetchItems = async(orderId) => {
      try {
        const items = await axios.get(`http://localhost:5000/admin/orders/${orderId}/items`);
        setItems(items.data); 
      } catch (err) {
        console.log(err);
        setItems([]);
      } finally {
        setLoading(false);
      }
    }
    fetchItems(props.orderId);
  }, []);

  const handleMenu = () => {
    if (menuClass == "menu") {
      setMenuClass("menu open");
    } else {
      setMenuClass("menu");
    }
  }

  const cancelPrep = async () => {
    try {    
      const pendingStatusId = 1;
      const res = await axios.put(`http://localhost:5000/admin/orders/${props.orderId}`, null, {
        params: {
          statusId: pendingStatusId
        }
      });
      toast.success("Order has been sent back to the pending orders table", {
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
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <article className="order-card">
      <div className="order-head">
        <h2 className="order-id">{props.orderNo}</h2>
        <button type="button" className="kebab" aria-label="Order options" onClick={handleMenu}><span></span><span></span><span></span></button>
      </div>
      <div className="order-meta">
        <span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2Zm-2 8h14v10H5Z"/></svg>{props.date}</span>
        <span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.400 0-8 2.200-8 5v1h16v-1c0-2.800-3.600-5-8-5Z"/></svg>{props.user}</span>
      </div>
      <ul className="items">
        {items.map((item) => {
          return (<OrderCardItem
            key={item.order_item_id}
            orderId={item.order_id}
            orderItemId={item.order_item_id}
            productName={item.product_name}
            quantity={item.quantity}
            statusId={item.status_id}
            setButtonState={setButtonState}
          />)
        })}
      </ul>
      <div className="order-foot">
        <span className="order-total">₱{props.total}</span>
        <OrderCardButton orderId={props.orderId} allItemsReady={allItemsReady} setData={setData}/>
      </div>
      <div className={menuClass} role="menu">
        <button type="button">View</button>
        <button type="button" className="danger" onClick={cancelPrep}>Cancel preparation</button>
      </div>
  </article>
  )
}

export default OrderCard