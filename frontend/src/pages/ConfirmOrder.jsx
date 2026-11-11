import React, { useEffect } from 'react'
import useHandleCart from '../hooks/useHandleCart'
import { useNavigate } from 'react-router-dom';

const OrderSummary = () => {
  const navigate = useNavigate();
  const { cartItems, totalAmount } = useHandleCart();

  useEffect(() => {
    if (cartItems.length == 0) {
      navigate("/place-order");
    }
  }, [])

  console.log(cartItems);

  return (
    <div style={{"padding": "15px"}}>
      <b>Confirm your order</b>
      <p style={{"font-size": "10px", "margin-top": "0px"}}>Please take a moment to review your order</p>

      <table style={{"border": "solid 1px black", "width": "500px", "margin-top": "15px", "margin-bottom": "15px", "border-collapse": "collapse"}}>
        <tr>
          <th style={{"textAlign": "start", "border": "solid 1px black"}}>Item</th>
          <th style={{"textAlign": "start", "border": "solid 1px black"}}>Quantity</th>
          <th style={{"textAlign": "start", "border": "solid 1px black"}}>Amount</th>
        </tr>

        {cartItems.map((cartItem) => {
          return <tr>
            <td style={{"border": "1px solid black"}}>{cartItem.productName} (₱{cartItem.price})</td>
            <td style={{"border": "1px solid black"}}>{cartItem.quantity}</td>
            <td style={{"border": "1px solid black"}}>₱{((cartItem.price * 100) * cartItem.quantity) / 100}</td>
          </tr>
        })}

        <tr>
          <td colSpan={2}><b>Total amount:</b></td>
          <td style={{"color": "green"}}><b>₱{totalAmount / 100}</b></td>
        </tr>
      </table>
      <button>Confirm order</button>
    </div>
  )
}

export default OrderSummary