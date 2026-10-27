import React from 'react';

const Product = (props) => {
  return (
    <tr>
      <td><div className="img-ph" role="img" aria-label="No image"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="8" cy="8" r="2.2"/><path d="M2 21 9 11l4 5 3-3 6 8Z"/></svg></div></td>
      <td>{props.name}</td>
      <td>{props.unit}</td>
      <td>{props.price}</td>
      <td>{props.quantity}</td>
      <td>
        <button type="button" aria-haspopup="menu" onClick={props.showModal}>Edit</button>
        <button type="button" aria-haspopup="menu">Delete</button>
      </td>
    </tr>
  )
}

export default Product