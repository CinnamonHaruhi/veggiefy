import React, { useEffect, useState } from 'react';
import Sidebar from '../components/sidebar/Sidebar.jsx'
import FontLinks from '../components/FontLinks.jsx';
import axios from 'axios';
import Order from '../components/Order.jsx';
import Searchbar from '../components/searchbar/Searchbar.jsx';
import ItemsDialog from '../components/dialogs/ItemsDialog.jsx';
import useFetchOrders from '../hooks/useFetchOrders.js';

const Orders = () => {
  const { loading, orders, allOrderItems } = useFetchOrders();
  const [ orderItems, setOrderItems ] = useState([]);

  if (loading) {
    return <div>Loading...</div>
  }

  const orderComponents = [];
  for (const order of orders) {
    const date = new Date(order.order_date);
    orderComponents.push(<Order
      key={order.order_id}
      orderNo={order.order_no}
      orderDate={date.toLocaleDateString()}
      totalAmout={order.total_amount}
      status={order.status_name}
      username={order.username}
      showModal={() => {
        document.getElementById('itemsDialog').showModal();
        const items = allOrderItems.filter((i) => {
          return i.order_id == order.order_id;
        });
        setOrderItems(items);
      }}
    />);
  }

  return (
    <>
      <FontLinks/>
      <div className="main-page">
        <div className="main-app">

          <Sidebar/>

          <main className="main-content">
            <h1 className="main-title">Orders</h1>
            <Searchbar/>

            <div className="main-table-wrap" id="tableWrap">
              <table className="main-table">
                <thead>
                  <tr>
                    <th scope="col">Order No</th>
                    <th scope="col">Order date</th>
                    <th scope="col">Total amount</th>
                    <th scope="col">Status</th>
                    <th scope="col">User</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orderComponents}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
      
      <ItemsDialog orderItems={orderItems}/>
    </>
  )
}

export default Orders