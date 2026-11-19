import React, { useEffect, useRef, useState,  } from 'react'
import Sidebar from '../components/sidebar/Sidebar';
import Searchbar from '../components/searchbar/Searchbar';
import FontLinks from  '../components/FontLinks';
import ProductDialog from '../components/dialogs/ProductDialog';
import useFetchProducts from '../hooks/useFetchProducts';
import useHandleDialog from '../hooks/useHandleDialog';
import { createColumnHelper } from '@tanstack/react-table';
import Table from '../components/Table';

const Products = () => {
  const editDialog = useRef(null);
  const {dialogOpen: editDialogOpen, setDialogOpen: setEditDialogOpen} = useHandleDialog(editDialog.current);
  const addDialog = useRef(null);
  const {dialogOpen: addDialogOpen, setDialogOpen: setAddDialogOpen} = useHandleDialog(addDialog.current);
  const [ loading, setLoading ] = useState(false);
  const [ data, setData ] = useState(null); //This is just so that the products page re renders after an edit
  const { products } = useFetchProducts(data);
  const [ globalFilter, setGlobalFilter ] = useState("");
  const [ prefillData, setPrefillData ] = useState({
    product_name: "",
    unit: "",
    price: "",
    quantity: ""
  });  
  
  if (loading) {
    return <div>Loading...</div>
  }

  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.display({
      id: "image",
      header: "Image",
      cell: <div className="img-ph" role="img" aria-label="No image"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="8" cy="8" r="2.2"/><path d="M2 21 9 11l4 5 3-3 6 8Z"/></svg></div>
    }),
    columnHelper.accessor("product_name", {
      header: "Name",
      cell: (props) => <p>{props.getValue()}</p>
    }),
    columnHelper.accessor("unit", {
      header: "Unit",
      cell: (props) => <p>{props.getValue()}</p>
    }),
    columnHelper.accessor("price", {
      header: "Price",
      cell: (props) => <p>₱{props.getValue()}</p>
    }),
    columnHelper.accessor("quantity", {
      header: "Quantity",
      cell: (props) => <p>{props.getValue()}</p>
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: row => {
        return <>
          <button type="button" aria-haspopup="menu" onClick={() => {
            setEditDialogOpen(true); 
            setPrefillData({
              product_id: row.row.original.product_id,
              product_name: row.row.original.product_name,
              unit: row.row.original.unit,
              price: row.row.original.price,
              quantity: row.row.original.quantity
            });
          }}>Edit</button>
          <button type="button">Delete</button>
        </>
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
            <h1 className="main-title">Product Catalog</h1>
            <div className="products-toolbar">
              <Searchbar globalFilter={globalFilter} setGlobalFilter={setGlobalFilter}/>
              <button onClick={() => {setAddDialogOpen(true)}} className="dialog-btn dialog-btn-dark" id="add-product-btn">Add</button>
            </div>
            <Table columns={columns} data={products} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
          </main>
        </div>
      </div>

      <ProductDialog
        ref={addDialog}
        action={"add"}
        dialogOpen={addDialogOpen}
        setDialogOpen={setAddDialogOpen}
        prefillData={prefillData}
        setPrefillData={setPrefillData}
        setData={setData}
      />

      <ProductDialog 
        ref={editDialog}
        action={"edit"}
        dialogOpen={editDialogOpen}
        setDialogOpen={setEditDialogOpen}
        prefillData={prefillData}
        setPrefillData={setPrefillData}
        setData={setData}
      />
    </>
  )
}

export default Products

