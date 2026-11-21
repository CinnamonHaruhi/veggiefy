import React, { useEffect, useState, useRef } from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import Searchbar from '../components/searchbar/Searchbar'
import FontLinks from '../components/FontLinks'
import axios from 'axios'
import Table from '../components/Table'
import { createColumnHelper } from '@tanstack/react-table'
import ItemsDialog from '../components/dialogs/ItemsDialog'
import useHandleDialog from '../hooks/useHandleDialog'
import ConfirmDialog from '../components/dialogs/ConfirmDialog'
import { toast, Slide } from 'react-toastify';

const MyOrders = () => {
  const itemsDialog = useRef(null);
  const confirmDialog = useRef(null);
  const { setDialogOpen } = useHandleDialog(itemsDialog.current);
  const { setDialogOpen: setConfirmDialogOpen } = useHandleDialog(confirmDialog.current);
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
  const [ orderIdCancel, setOrderIdCancel ] = useState();
  const [ data, setData ] = useState();

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await axios.get("http://localhost:5000/orders");
      setOrders(res.data);
    }
    fetchOrders();
  }, [data]);

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
        return <><button onClick={() => {
          fetchOrderItems(row.row.original.order_id);
          setDialogOpen(true);
        }}>View</button>
        {row.row.original.status_name.toLowerCase() == "pending" && 
        <button onClick={() => {
          setConfirmDialogOpen(true);
          setOrderIdCancel(row.row.original.order_id);
        }}>Cancel</button>}
        </>
      }
    })
  ]

  const cancelOrder = async () => {
    const res = await axios.put(`http://localhost:5000/orders/${orderIdCancel}/cancel`);
    setConfirmDialogOpen(false);
    setData(res.data);

    toast.success("Order cancelled successfully", {
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
  }

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
      <ConfirmDialog 
        ref={confirmDialog} 
        title={"Cancel order"} 
        text={"Are you sure you want to cancel this order?"} 
        setDialogOpen={setConfirmDialogOpen}
        onClick={cancelOrder}
      />
    </>
  )
}

export default MyOrders