import React, { useEffect, useState, useRef } from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import Searchbar from '../components/searchbar/Searchbar'
import FontLinks from '../components/FontLinks'
import axios from 'axios'
import Table from '../components/Table'
import { createColumnHelper } from '@tanstack/react-table'
import ItemsDialog from '../components/dialogs/ItemsDialog'
import useHandleDialog from '../hooks/useHandleDialog'

const MyOrders = () => {
  const itemsDialog = useRef(null);
  const { setDialogOpen } = useHandleDialog(itemsDialog.current);
  const [orders, setOrders] = useState([{
    completed_date:"",
    order_date: "",
    order_id: "",
    order_no: "",
    status_id: "",
    status_name: "",
    total_amount: "",
    user_id: ""
  }]);
  const [ globalFilter, setGlobalFilter ] = useState(""); 
  const [ orderItems, setOrderItems ] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await axios.get("http://localhost:5000/orders");
      setOrders(res.data);
    }
    fetchOrders();
  }, []);

  const fetchOrderItems = async (orderId) => {
    const orderItems =  await axios.get(`http://localhost:5000/orders/${orderId}/items`);
    setOrderItems(orderItems.data);
  }

  const columnHelper = createColumnHelper();
  const columns = [ 
    columnHelper.accessor ("order_no", {
      header: "Order no",
      cell: (props) => <p>{props.getValue()}</p>
    }),
    columnHelper.accessor ("order_date", {
      header: "Order date",
      cell: (props) => <p>{new Date(props.getValue()).toLocaleDateString()}</p>
    }),
    columnHelper.accessor ("total_amount", {
      header: "Total amount",
      cell: (props) => <p>₱{props.getValue()}</p>
    }),
    columnHelper.accessor ("status_name", {
      header: "Status",
      cell: (props) => <p>{props.getValue()}</p>
    }),
    columnHelper.display({
      header: "Actions",
      cell: row => {
        return <button onClick={() => {
          fetchOrderItems(row.row.original.order_id);
          setDialogOpen(true);
        }}>View</button>
      }
    })
  ]

  return (
    <>
      <FontLinks/>
      <div className="main-page">
        <div className="main-app">

          <Sidebar/>

          <main className="main-content">
            <h1 className="main-title">Orders</h1>
            <Searchbar globalFilter={globalFilter} setGlobalFilter={setGlobalFilter}/>
            <Table columns={columns} data={orders} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter}/>
          </main>
        </div>
      </div>

      <ItemsDialog ref={itemsDialog} orderItems={orderItems} setDialogOpen={setDialogOpen}/>
    </>
  )
}

export default MyOrders