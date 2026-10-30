import {react, useEffect, useState} from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import FontLinks from '../components/FontLinks';
import OrderCard from '../components/order_card/OrderCard';
import useFetchOrders from '../hooks/useFetchOrders.js';

const Preparation = () => {
  const [ status, setStatus ] = useState(["ready", "preparing"]);
  const { loading, orders, allOrderItems } = useFetchOrders(status);
  
  const orderCardComponents = [];
  for (const order of orders) {
    const date = new Date(order.order_date);
    orderCardComponents.push(<OrderCard
      key={order.order_id}
      orderNo={order.order_no}
      date={date.toLocaleDateString()}
      user={order.username}
      total={order.total_amount}
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
              <button type="button" className="filter active" data-filter="all" role="tab" aria-selected="true" onClick={() => {setStatus(["ready", "preparing"])}}>All</button>
              <button type="button" className="filter" data-filter="ready" role="tab" aria-selected="false" onClick={() => {setStatus(["ready"])}}>Ready</button>
              <button type="button" className="filter" data-filter="preparing" role="tab" aria-selected="false" onClick={() => {setStatus(["preparing"])}}>Preparing</button>
          </div>

          <section className="orders-grid" id="ordersGrid">
            {orderCardComponents}
          </section>

          </main>
        </div>
      </div>
    </>
  )
}

export default Preparation