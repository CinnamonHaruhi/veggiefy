import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useFetchOrders(statuses) {
  const [ loading, setLoading ] = useState(false);
  const [ orders, setOrders ] = useState([]);
  const [ allOrderItems, setAllOrderItems ] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orders = await axios.get("http://localhost:5000/admin/orders", {
          params: {
            status: statuses
          }
        });
        setOrders(orders.data);

        const orderItems = await axios.get("http://localhost:5000/admin/orders/items", {
          params: {
            status: statuses
          }
        });
        setAllOrderItems(orderItems.data);
      } catch (err) {
        console.log(err);
        setOrders([]);
        setAllOrderItems([]);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, [statuses]);

  return { loading, orders, allOrderItems };
}