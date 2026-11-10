import { React, useContext, useRef, useState } from 'react';
import './product-card-dialog.css';
import useHandleCart from '../../hooks/useHandleCart.js';

const ProductCardDialog = ({ setDialogOpen, setStock, ...props }) => {
  const dialog = useRef(null);
  const [ quantity, setQuantity ] = useState(1);
  const [ errorMessage, setErrorMessage ] = useState("");
  const { addToCart, addExistingToCart, cartItems } = useHandleCart();
  
  if (dialog.current) {
    if (props.dialogOpen) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  } 

  /*
  const addToCart = () => {
    const index = cartItems.findIndex((item) => {
      return item.id == props.productId;
    });

    if (index == -1) {
      setCartItems([{
        id: props.productId,
        productName: props.productName,
        quantity: quantity,
        price: props.price,
        unit: props.unit,
        stock: props.stock
      }, ...cartItems]);
      updateTotal(props.price, quantity);
    } else {
      //if a product is already in the cart we simply modify the quantity
      const qtyInCart = cartItems[index].quantity;
      if ((qtyInCart + quantity ) > props.stock) {
        setErrorMessage(`Quantity cannot exceed available stock. You already have ${qtyInCart} in your cart`);
        return;
      }
      //cartItems[index].quantity += quantity;
      //I'm doing this instead so the cart items rerender :/ i'm too fried for this shit rn
      const updatedCartItems = cartItems.map((item) => {
        if (item.id == props.productId) {
          item.quantity += quantity;
        }
        return item;
      });
      setCartItems(updatedCartItems);
    }
    dialog.current.close();
    setDialogOpen(false);
  }
  */
 
  const addToCartWrapper = () => {
    const product = {
      productId: props.productId,
      productName: props.productName,
      quantity: quantity,
      price: props.price,
      unit: props.unit,
      stock: props.stock
    }
    const index = cartItems.findIndex((item) => {
      return item.productId == props.productId;
    });
    if (index == -1) {
      addToCart(product);
    } else {
      const qtyInCart = cartItems[index].quantity;
      if ((qtyInCart + product.quantity) > cartItems[index].stock) {
        setErrorMessage(`Quantity cannot exceed available stock. You already have ${qtyInCart} in your cart`);
        return;
      }
      addExistingToCart(product);
    }
    dialog.current.close();
    setDialogOpen(false);
  }

  const increaseQty = () => {
    if (props.stock === quantity) {
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
    <dialog ref={dialog} className="po-dialog po-dialog-detail dialog" id="poDetailDialog" aria-labelledby="poDetailName">
        <button type="button" className="po-close" data-close aria-label="Close" onClick={()=>{setDialogOpen(false)}}>&times;</button>

        <div className="po-detail-top">
          <div className="po-img-ph po-img-lg" role="img" aria-label="No product image">
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="8" cy="8" r="2.2"/><path d="M2 21 9 11l4 5 3-3 6 8Z"/></svg>
          </div>
          <div className="po-detail-info">
            <h2 id="poDetailName">{props.productName}</h2>
            <p className="po-detail-price" id="poDetailPrice">₱{props.price} per {props.unit}</p>
          </div>
       </div>
        <p className="po-detail-stock">Available Stock: <strong id="poDetailStock">{props.stock} {props.unit}</strong></p>

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