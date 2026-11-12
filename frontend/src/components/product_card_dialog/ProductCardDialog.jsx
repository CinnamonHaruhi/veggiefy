import { React, useEffect, useState } from 'react';
import './product-card-dialog.css';
import useHandleCart from '../../hooks/useHandleCart.js';

const ProductCardDialog = ({ setPcDialogOpen, pcDialogOpen, ref, ...props }) => {
  const [ quantity, setQuantity ] = useState(1);
  const [ errorMessage, setErrorMessage ] = useState("");
  const { addToCart, addExistingToCart, cartItems } = useHandleCart();
  const productProp = props.product;

  useEffect(() => {
    if (!pcDialogOpen) {
      setErrorMessage("");
      setQuantity(1);
    }
  }, [pcDialogOpen]);

  const addToCartWrapper = () => {
    const product = {
      product_id: productProp.product_id,
      product_name: productProp.product_name,
      quantity: quantity,
      price: productProp.price,
      unit: productProp.unit,
      stock: productProp.stock
    }
    console.log(product);
    const index = cartItems.findIndex((item) => {
      return item.product_id == productProp.product_id;
    });
    if (index == -1) {
      addToCart(product);
    } else {
      const qtyInCart = cartItems[index].stock;
      if ((qtyInCart + product.quantity) > cartItems[index].stock) {
        setErrorMessage(`Quantity cannot exceed available stock. You already have ${qtyInCart} in your cart`);
        return;
      }
      addExistingToCart(product);
    }
    setPcDialogOpen(false);
  }

  const increaseQty = () => {
    if (productProp.stock === quantity) {
      return;
    }
    setQuantity(quantity + 1);
  }

  const decreaseQty = () => {
    if (quantity === 1) {
      return;
    }
    setQuantity(quantity - 1);
  }

  return (
    <dialog ref={ref} className="po-dialog po-dialog-detail dialog" id="poDetailDialog" aria-labelledby="poDetailName">
        <button type="button" className="po-close" data-close aria-label="Close" onClick={()=>{setPcDialogOpen(false)}}>&times;</button>

        <div className="po-detail-top">
          <div className="po-img-ph po-img-lg" role="img" aria-label="No product image">
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="8" cy="8" r="2.2"/><path d="M2 21 9 11l4 5 3-3 6 8Z"/></svg>
          </div>
          <div className="po-detail-info">
            <h2 id="poDetailName">{productProp.product_name}</h2>
            <p className="po-detail-price" id="poDetailPrice">₱{productProp.price} per {productProp.unit}</p>
          </div>
       </div>
        <p className="po-detail-stock">Available Stock: <strong id="poDetailStock">{productProp.stock} {productProp.unit}</strong></p>

        <div className="po-qty" aria-label="Quantity">
          <button type="button" className="po-qty-btn" onClick={decreaseQty}>&minus;</button>
          <span className="po-qty-num" id="poDetailQty" aria-live="polite">{quantity}</span>
          <button type="button" className="po-qty-btn" onClick={increaseQty}>+</button>
        </div>
        <p className="po-detail-error" id="poDetailError">{errorMessage}</p>

        <button type="button" className="po-btn dialog-btn dialog-btn-dark" id="poDetailAdd" onClick={addToCartWrapper}>Add</button>
    </dialog>
  )
}

export default ProductCardDialog