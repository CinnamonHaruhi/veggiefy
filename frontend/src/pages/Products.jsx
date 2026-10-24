import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Product from '../components/Product';

const Products = () => {
  const [ loading, setLoading ] = useState(false);
  const [ products, setProducts ] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/admin/products");
        setProducts(res.data);
        console.log(res.data);
      } catch (err) {
        setProducts(null);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>
  }

  const productComponents = [];

  for (const product of products) {
    productComponents.push(<Product key={product.product_id} id={product.product_id} name={product.product_name} unit={product.unit} price={product.price} image={null}/>);
  }

  return (
    <>
      <h2 style={{margin: "10px"}}>Products</h2>
      <div style={{display: "flex"}}>
        {productComponents}
      </div>
    </>
  )
}

export default Products

