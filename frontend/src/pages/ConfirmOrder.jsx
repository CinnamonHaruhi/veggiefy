import React, { useEffect } from 'react'
import useHandleCart from '../hooks/useHandleCart'
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/sidebar/Sidebar';
import FontLinks from '../components/FontLinks';
import axios from 'axios';

const OrderSummary = () => {
  const navigate = useNavigate();
  const { cartItems, totalAmount } = useHandleCart();
  console.log(cartItems);

  useEffect(() => {
    if (cartItems.length == 0) {
      navigate("/place-order");
    }
  }, [])

  const handleConfirm = async () => {
    try {
      const orderData = {
        total_amount: (totalAmount / 100),
        order_items: 
          cartItems.map((cartItem) => {
            return {
              product_id: cartItem.productId,
              quantity: cartItem.quantity,
              price_at_order: cartItem.price
            }
          })
      };
      console.log(orderData);
      const res = await axios.post("http://localhost:5000/orders/confirm", orderData);
      console.log(res);
    } catch (err) {
      console.log(err.response.data);
    }
  }
  
  return (
    <>
      <FontLinks/>
      <div className="main-page">
        <div className="main-app">
          <main className="main-content">
            <h1 id="confirm-ord-title">Confirm your order</h1>
            <p id="confirm-ord-sub">Please take a moment to review your order</p>

            <div className="main-table-wrap" id="tableWrap">
              <table className="main-table">
                <thead>
                  <tr>
                    <th scope="col">Item</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((cartItem) => {
                    return (
                      <tr key={cartItem.productId}>
                        <td>{cartItem.productName} (₱{cartItem.price} per {cartItem.unit})</td>
                        <td>{cartItem.quantity}</td>
                        <td>₱{((cartItem.price * 100) * cartItem.quantity) / 100}</td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <th scope="row" colspan="2">Total amount:</th>
                    <td class="total-amount" id="confirm-ord-total">₱{totalAmount / 100}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div id="confirm-ord-btns">
              <button className="dialog-btn dialog-btn-light" onClick={() => {navigate("/place-order")}}>Back</button>
              <button className="dialog-btn dialog-btn-dark" id="confirm-ord-btn" onClick={handleConfirm}>Confirm Order</button>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

export default OrderSummary