import React, { useEffect, useState,  } from 'react'
import axios from 'axios';
import Product from '../components/Product';
import Sidebar from '../components/sidebar/Sidebar';
import Searchbar from '../components/searchbar/Searchbar';
import FontLinks from  '../components/FontLinks';
import EditDialog from '../components/dialogs/EditDialog';
import useFetchProducts from '../hooks/useFetchProducts';

const Products = () => {
  const [ openEditDialog, setOpenEditDialog ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const [ data, setData ] = useState(null); //This is just so that the products page re renders after an edit
  const { products } = useFetchProducts(data);
  const [ prefillData, setPrefillData ] = useState({
    product_name: "",
    unit: "",
    price: "",
    quantity: ""
  });  

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <FontLinks/>
      <div className="main-page">
        <div className="main-app">
          <Sidebar/>
          <main className="main-content">
            <h1 className="main-title">Product Catalog</h1>
            <Searchbar/>

            <div className="main-table-wrap" id="tableWrap">
              <table className="main-table">
                <thead>
                  <tr>
                    <th scope="col">Image</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Unit</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody id="productBody">
                  {products.map((product) => {
                    return (<Product 
                    key={product.product_id} 
                    id={product.product_id} 
                    name={product.product_name} 
                    unit={product.unit} 
                    price={product.price} 
                    image={null} 
                    quantity={product.quantity}
                    setOpenEditDialog={setOpenEditDialog}
                    setPrefillData={() => {
                      setPrefillData({
                        product_id: product.product_id,
                        product_name: product.product_name,
                        unit: product.unit,
                        price: product.price,
                        quantity: product.quantity
                      })
                    }}
                    />)
                  })}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>

      <EditDialog 
        product_name={products.name} 
        unit={products.unit} 
        price={products.price} 
        quantity={products.quantity}
        openEditDialog={openEditDialog}
        setOpenEditDialog={setOpenEditDialog}
        prefillData={prefillData}
        setPrefillData={setPrefillData}
        setData={setData}
      />
    </>
  )
}

export default Products

