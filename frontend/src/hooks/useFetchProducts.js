import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useFetchProducts(data = null) {
  const [ products, setProducts ] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await axios.get("http://localhost:5000/products");
        setProducts(products.data);
      } catch (err) { 
        console.log(err);
        setProducts([]);
      }
    }
    fetchProducts();
  }, [data]);

  return  { products };
}