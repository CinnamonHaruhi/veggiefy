import React, { useRef, useState } from 'react';
import Sidebar from '../components/sidebar/Sidebar.jsx'
import FontLinks from '../components/FontLinks.jsx';
import Searchbar from '../components/searchbar/Searchbar.jsx';
import ItemsDialog from '../components/dialogs/ItemsDialog.jsx';
import useFetchOrders from '../hooks/useFetchOrders.js';
import FilterButton from '../components/FilterButton.jsx';
import { createColumnHelper } from '@tanstack/react-table';
import Table from '../components/Table.jsx';
import useHandleDialog from '../hooks/useHandleDialog.js';

const Orders = () => {
  const [ orderItems, setOrderItems ] = useState([]);
  const [ status, setStatus ] = useState(["pending"]);
  const [ data, setData ] = useState(null);
  const { loading, orders, allOrderItems } = useFetchOrders(status, data);
  const [ globalFilter, setGlobalFilter ] = useState("");
  const itemsDialog = useRef(null);
  const { setDialogOpen } = useHandleDialog(itemsDialog.current);

  if (loading) {
    return <div>Loading...</div>
  }

  const showItemsDialog = (orderId) => {
    setDialogOpen(true);
    const items = allOrderItems.filter((i) => {
      return i.order_id == orderId;
    });
    setOrderItems(items);
  }

  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor("order_no" ,{
      header: "Order no",
      cell: (props) => <p>{props.getValue()}</p>
    }),
    columnHelper.accessor("order_date" ,{
      header: "Order date",
      cell: (props) => <p>{new Date(props.getValue()).toLocaleDateString()}</p>
    }),
    columnHelper.accessor("total_amount" ,{
      header: "Total amount",
      cell: (props) => <p>₱{props.getValue()}</p>
    }),
    columnHelper.accessor("username" ,{
      header: "User",
      cell: (props) => <p>{props.getValue()}</p>
    }),
    columnHelper.display({
      header: "Actions",
      cell: row => {
        return <button onClick={() => {showItemsDialog(row.row.original.order_id)}}>View</button>
      }
    }),
  ]

  const columnsCompleted = [
    columnHelper.accessor("order_no" ,{
      header: "Order no",
      cell: (props) => <p>{props.getValue()}</p>
    }),
    columnHelper.accessor("order_date" ,{
      header: "Order date",
      cell: (props) => <p>{new Date(props.getValue()).toLocaleDateString()}</p>
    }),
    columnHelper.accessor("completed_date" ,{
      header: "Completed date",
      cell: (props) => <p>{new Date(props.getValue()).toLocaleDateString()}</p>
    }),
    columnHelper.accessor("total_amount" ,{
      header: "Total amount",
      cell: (props) => <p>₱{props.getValue()}</p>
    }),
    columnHelper.accessor("username" ,{
      header: "User",
      cell: (props) => <p>{props.getValue()}</p>
    }),
    columnHelper.display({
      header: "Actions",
      cell: row => {
        return <button onClick={() => {showItemsDialog(row.row.original.order_id)}}>View</button>
      }
    }),
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

            <div className="filters" role="tablist" aria-label="Filter orders">
              <FilterButton status={status} filterValue="pending" filterName="Pending" onClick={() => {setStatus(["pending"])}}/>
              <FilterButton status={status} filterValue="completed" filterName="Completed" onClick={() => {setStatus(["completed"])}}/>
            </div>
            <Table data={orders} columns={status[0] == "pending" ? columns : columnsCompleted } globalFilter={globalFilter} setGlobalFilter={setGlobalFilter}/>
          </main>
        </div>
      </div>
      
      <ItemsDialog ref={itemsDialog} orderItems={orderItems} setData={setData} setDialogOpen={setDialogOpen}/>
    </>
  )
}

export default Orders