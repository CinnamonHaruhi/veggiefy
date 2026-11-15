import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 
import useHandleCart from '../hooks/useHandleCart'

const OrderPlaced = () => { 
  const navigate = useNavigate();
  const { state } = useLocation();
  const { order_no, order_date, total_amount } = state;
  const { resetCart } = useHandleCart();

  useEffect(() => {
    resetCart();
  }, []);

  return (
    <main className="placed-wrap">
      <section className="placed-card">

      <h1 className="placed-title">Thank you, your order has been placed</h1>
      <p className="placed-sub">Please pay upon pickup</p>

      <dl className="placed-details">
        <dt>Order Date</dt>
        <dd id="orderDate">{new Date(order_date).toLocaleDateString()}</dd>

        <dt>Order Number</dt>
        <dd id="orderNumber">{order_no}</dd>

        <dt>Total</dt>
        <dd id="orderTotal">₱{total_amount}</dd>
      </dl>

      <div className="placed-actions">
        <button className="dialog-btn dialog-btn-dark">View my orders</button>
        <button className="dialog-btn dialog-btn-light" onClick={() => {navigate("/place-order")}}>Place another order</button>
      </div>

      </section>
    </main>
  )
}

export default OrderPlaced