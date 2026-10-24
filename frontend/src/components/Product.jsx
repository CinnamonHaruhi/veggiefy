import React from 'react'

const Product = (props) => {
  return (
    <div style={{border: "1px solid black", margin: "10px", padding:"10px", width: "20%", display: "flex", backgroundColor: "white"}}>
      <div>
        <p>ID: {props.id}</p>
        <p>Image: {props.image || "No image"}</p>
        <p>Product name: {props.name}</p>
        <p>Unit: {props.unit}</p>
        <p>Price: {props.price}</p>
      </div>
    </div>
  )
}

export default Product