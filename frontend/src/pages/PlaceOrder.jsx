import React, { useState, useRef } from 'react';
import FontLinks from '../components/FontLinks';
import Sidebar from '../components/sidebar/Sidebar';
import Searchbar from '../components/searchbar/Searchbar';
import ProductCard from '../components/product_card/ProductCard';
import Cart from '../components/cart/Cart';
import useFetchProducts from '../hooks/useFetchProducts';
import CartDialog from '../components/cart/CartDialog.jsx';
import CartItem from '../components/cart/CartItem.jsx';
import useHandleCart from '../hooks/useHandleCart.js';
import ProductCardDialog from '../components/product_card_dialog/ProductCardDialog.jsx';
import useHandleDialog from '../hooks/useHandleDialog.js';

const PlaceOrder = () => {
  const { products } = useFetchProducts();
  const { cartItems } = useHandleCart();
  const dialog = useRef(null);
  const { dialogOpen: pcDialogOpen, setDialogOpen: setPcDialogOpen } = useHandleDialog(dialog.current);
  const cartDialog = useRef(null);
  const { dialogOpen: cartDialogOpen, setDialogOpen: setCartDialogOpen } = useHandleDialog(cartDialog.current);
  const [ product, setProduct ] = useState({
    product_name: "",
    price: "",
    unit: "",
    stock: ""
  });

  return (
    <>
        <FontLinks/>
        <div className="main-page">
          <div className="main-app">
            <Sidebar/>
            <main className="main-content">
              <h1 className="main-title">Place Advance Order</h1>
              <div className="po-toolbar">
                <Searchbar/>
                <Cart setCartDialogOpen={setCartDialogOpen}/>
              </div>

              <section className="po-grid" id="poGrid" aria-label="Available products">
                {products.map((product) => {
                  return <ProductCard 
                    key={product.product_id}
                    product_id={product.product_id}
                    product_name={product.product_name}
                    price={product.price}
                    unit={product.unit}
                    quantity={product.quantity}
                    onClick={() => {
                      setProduct({
                        product_id: product.product_id,
                        product_name: product.product_name,
                        price: product.price,
                        unit: product.unit,
                        stock: product.quantity
                      });
                      setPcDialogOpen(true);
                    }}
                  />;
                })}
              </section>
            </main>
          </div>
        </div>

        <CartDialog ref={cartDialog} cartDialogOpen={cartDialogOpen} setCartDialogOpen={setCartDialogOpen}>
          {cartItems.map((cartItem) => {
            return <CartItem 
                key={cartItem.product_id}
                productId={cartItem.product_id}
                productName={cartItem.product_name}
                quantity={cartItem.quantity}
                price={cartItem.price}
                unit={cartItem.unit}
                stock={cartItem.stock}
              />;
          })}

        </CartDialog>

        <ProductCardDialog 
          ref={dialog} 
          product={product} 
          setPcDialogOpen={setPcDialogOpen}
          pcDialogOpen={pcDialogOpen}
        />
    </>
  ) 
}

export default PlaceOrder