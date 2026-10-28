import React from 'react'

const Order = (props) => {
  return (
    <tr>
      <td>{props.orderNo}</td>
      <td>{props.orderDate}</td>
      <td>{props.totalAmout}</td>
      <td>{props.status}</td>
      <td>{props.username}</td>
      <td>
        <button type="button" aria-haspopup="menu" onClick={props.showModal}>View</button>
      </td>
    </tr>
  )
}

export default Order