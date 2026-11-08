import React, { useEffect, useState } from 'react';
import Sidebar from '../components/sidebar/Sidebar.jsx'
import FontLinks from '../components/FontLinks.jsx';
import axios from 'axios';
import Order from '../components/Order.jsx';
import Searchbar from '../components/searchbar/Searchbar.jsx';
import ItemsDialog from '../components/dialogs/ItemsDialog.jsx';
import useFetchOrders from '../hooks/useFetchOrders.js';
import FilterButton from '../components/FilterButton.jsx';
import { toast, Slide } from 'react-toastify';

const Orders = () => {
  const [ orderItems, setOrderItems ] = useState([]);
  const [ status, setStatus ] = useState(["pending"]);
  const [ data, setData ] = useState(null);
  const { loading, orders, allOrderItems } = useFetchOrders(status, data);

  if (loading) {
    return <div>Loading...</div>
  }

  const orderComponents = orders.map((order) => {
    return <Order
      key={order.order_id}
      orderNo={order.order_no}
      orderDate={new Date(order.order_date).toLocaleDateString()}
      completedDate={new Date(order.completed_date).toLocaleDateString()}
      totalAmount={order.total_amount}
      status={order.status_name}
      username={order.username}
      filter={status[0]}
      showModal={() => {
        document.getElementById('itemsDialog').showModal();
        const items = allOrderItems.filter((i) => {
          return i.order_id == order.order_id;
        });
        setOrderItems(items);
      }}
    />
  });

  return (
    <>
      <FontLinks/>
      <div className="main-page">
        <div className="main-app">

          <Sidebar/>

          <main className="main-content">
            <h1 className="main-title">Orders</h1>
            <Searchbar/>

            <div className="filters" role="tablist" aria-label="Filter orders">
              <FilterButton status={status} filterValue="pending" filterName="Pending" onClick={() => {setStatus(["pending"])}}/>
              <FilterButton status={status} filterValue="completed" filterName="Completed" onClick={() => {setStatus(["completed"])}}/>
            </div>

            <div className="main-table-wrap" id="tableWrap">
              <table className="main-table">
                <thead>
                  {status[0] == "pending" ? 
                    <tr>
                      <th scope="col">Order No</th>
                      <th scope="col">Order date</th>
                      <th scope="col">Total amount</th>
                      <th scope="col">Status</th>
                      <th scope="col">User</th>
                      <th scope="col">Actions</th>
                    </tr> 
                    :
                    <tr>
                      <th scope="col">Order No</th>
                      <th scope="col">Order date</th>
                      <th scope="col">Completed date</th>
                      <th scope="col">Total Amount</th>
                      <th scope="col">User</th>
                      <th scope="col">Actions</th>
                    </tr>
                  }
                </thead>
                <tbody>
                  {orderComponents.length === 0 ? <tr><td colSpan={6}>No orders</td></tr> : orderComponents}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
      
      <ItemsDialog orderItems={orderItems} setData={setData}/>
    </>
  )
}

export default Orders