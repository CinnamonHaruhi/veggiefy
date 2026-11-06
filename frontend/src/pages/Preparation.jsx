import {react, useEffect, useState} from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import FontLinks from '../components/FontLinks';
import OrderCard from '../components/order_card/OrderCard';
import useFetchOrders from '../hooks/useFetchOrders.js';
import axios from 'axios';
import FilterButton from '../components/FilterButton.jsx';
import { toast, Slide } from 'react-toastify';


const Preparation = () => {
  const [ status, setStatus ] = useState(["ready", "preparing"]);
  const { loading, orders, allOrderItems } = useFetchOrders(status);
  const [ message, setMessage ] = useState(localStorage.getItem("preparationMessage"));

  useEffect(() => {
    const showToast = async () => {
      if (message) {
        toast.success(message, {
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
        localStorage.removeItem("preparationMessage");
        setMessage("");
      }
    }
    showToast();
  }, []);

  const orderCardComponents = [];
  for (const order of orders) {
    const date = new Date(order.order_date);
    orderCardComponents.push(<OrderCard
      key={order.order_id}
      orderId={order.order_id}
      orderNo={order.order_no}
      date={date.toLocaleDateString()}
      user={order.username}
      total={order.total_amount}
      statusName={order.status_name}
      setMessage={setMessage}
    />);
  }

  return (
    <>
      <FontLinks/>
      <div className="main-page">
        <div className="main-app">
          <Sidebar/>
          <main className="main-content">
            <h1 className="main-title">Preparation Checklist</h1>
            <div className="filters" role="tablist" aria-label="Filter orders">
              <FilterButton status={status} filterValue="all" filterName="All" onClick={() => {setStatus(["preparing", "ready"])}}/>
              <FilterButton status={status} filterValue="preparing" filterName="Preparing" onClick={() => {setStatus(["preparing"])}}/>
              <FilterButton status={status} filterValue="ready" filterName="Ready" onClick={() => {setStatus(["ready"])}}/>
            </div>

          <section className="orders-grid" id="ordersGrid">
            {orderCardComponents.length === 0 ? <p>No orders</p> : orderCardComponents}
          </section>
    
          </main>
        </div>
      </div>
    </>
  )
}

export default Preparation