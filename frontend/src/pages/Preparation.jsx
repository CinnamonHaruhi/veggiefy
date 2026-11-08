import {react, useState} from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import FontLinks from '../components/FontLinks';
import OrderCard from '../components/order_card/OrderCard';
import useFetchOrders from '../hooks/useFetchOrders.js';
import axios from 'axios';
import FilterButton from '../components/FilterButton.jsx';
import { toast, Slide } from 'react-toastify';


const Preparation = () => {
  const [ status, setStatus ] = useState(["ready", "preparing"]);
  const [ data, setData ] = useState(null);
  const { loading, orders, allOrderItems } = useFetchOrders(status, data);

  const orderCards = orders.map((order) => {
    <OrderCard
      key={order.order_id}
      orderId={order.order_id}
      orderNo={order.order_no}
      date={new Date(order.order_date).toLocaleDateString()}
      user={order.username}
      total={order.total_amount}
      statusName={order.status_name}
      setData={setData}
    />
  });

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
            {orderCards.length === 0 ? <p>No orders</p> : orderCards}
          </section>
    
          </main>
        </div>
      </div>
    </>
  )
}

export default Preparation