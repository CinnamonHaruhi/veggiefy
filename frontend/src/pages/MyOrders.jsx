import React, { useEffect, useState } from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import Searchbar from '../components/searchbar/Searchbar'
import FontLinks from '../components/FontLinks'
import axios from 'axios'
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getSortedRowModel } from '@tanstack/react-table'
import Table from '../components/Table'

const MyOrders = () => {
  const [orders, setOrders] = useState([{
    completed_date:"",
    order_date: "",
    order_id: "",
    order_no: "",
    status_id: "",
    total_amount: "",
    user_id: "  "
  }]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await axios.get("http://localhost:5000/orders");
      console.log(res.data);
      setOrders(res.data);
    }
    fetchOrders();
  }, []);
  
  const columns = [
    {
      accessorKey: "order_no",
      header: "Order no",
      cell: (props) => <p>{props.getValue()}</p>
    },
    {
      accessorKey: "order_date",
      header: "Order date",
      cell: (props) => <p>{new Date(props.getValue()).toLocaleDateString()}</p>
    },
    {
      accessorKey: "total_amount",
      header: "Total amount",
      cell: (props) => <p>₱{props.getValue()}</p>
    }
  ]

  return (
    <>
      <FontLinks/>
      <div className="main-page">
        <div className="main-app">

          <Sidebar/>

          <main className="main-content">
            <h1 className="main-title">Orders</h1>
            <Searchbar/>
            <Table columns={columns} data={orders}/>
          </main>
        </div>
      </div>
    </>
  )
}

export default MyOrders