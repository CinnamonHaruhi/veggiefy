import React, { useState } from 'react';
import FontLinks from '../components/FontLinks';
import Sidebar from '../components/sidebar/Sidebar';
import Searchbar from '../components/searchbar/Searchbar';
import ProductCard from '../components/product_card/ProductCard';
import Cart from '../components/cart/Cart';
import useFetchProducts from '../hooks/useFetchProducts';
import CartDialog from '../components/cart/CartDialog.jsx';
import CartItem from '../components/cart/CartItem.jsx';
import { CartContext } from '../contexts/cartContext.jsx';

const PlaceOrder = () => {
  const { products } = useFetchProducts();
  const [ cartDialogOpen, setCartDialogOpen ] = useState(false);
  const [ cartItems, setCartItems ] = useState([]);

  return (
    <>
      <CartContext.Provider value={{cartItems, setCartItems}}>
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
                    productId={product.product_id}
                    productName={product.product_name}
                    price={product.price}
                    quantity={product.quantity}
                    unit={product.unit}
                  />;
                })}
              </section>
            </main>
          </div>
        </div>

        <CartDialog cartDialogOpen={cartDialogOpen} setCartDialogOpen={setCartDialogOpen}>
            {cartItems.map((cartItem) => {
              return <CartItem 
                  key={cartItem.id}
                  productId={cartItem.id}
                  productName={cartItem.productName}
                  quantity={cartItem.quantity}
                  price={cartItem.price}
                  unit={cartItem.unit}
                  stock={cartItem.stock}
                />;
            })}
        </CartDialog>
      </CartContext.Provider>
    </>
  )
}

export default PlaceOrder