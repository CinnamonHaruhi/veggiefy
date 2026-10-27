import React from 'react'
import './edit-dialog.css'
import axios from 'axios'

const EditDialog = ({ setProduct, product, setMessage }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:5000/admin/products/${product.product_id}`, product);
      console.log(res.data);
      localStorage.setItem("message", "Item updated successfully");
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  } 

  return (
    <dialog className="products-dialog" id="productDialog" aria-labelledby="dialogTitle">
      <form id="dialogForm" onSubmit={handleSubmit} noValidate>
        <h2 id="dialogTitle">Product</h2>

          <div id="dialogFields">
          <label>Product Name
            <input type="text" id="fName" 
            value={product.product_name}
            onChange={(e) => setProduct({...product, product_name: e.target.value})}
            />
          </label>
          <label>Unit
            <input type="text" id="fUnit"
            value={product.unit}
            onChange={(e) => setProduct({...product, unit: e.target.value})}
            />
          </label>
          <label>Price (₱)
            <input type="number" id="fPrice" step="0.01" min="0"
            value={product.price}
            onChange={(e) => setProduct({...product, price: e.target.value})}
            />
          </label>
          <label>Quantity
            <input type="number" id="fQuantity" step="1" min="0"
            value={product.quantity}
            onChange={(e) => setProduct({...product, quantity: e.target.value})}           
            />
          </label>
        </div>

        <p id="dialogMessage" className="products-dialog-message" hidden></p>
        <p id="dialogError" className="products-dialog-error" role="alert"></p>

        <div className="products-dialog-actions">
          <button type="button" className="products-btn products-btn-light" id="dialogCancel" onClick={() => {document.getElementById("productDialog").close()}}>Cancel</button>
          <button type="submit" className="products-btn products-btn-dark" id="dialogSubmit">Save</button>
        </div>
      </form>
    </dialog>
  )
}

export default EditDialog