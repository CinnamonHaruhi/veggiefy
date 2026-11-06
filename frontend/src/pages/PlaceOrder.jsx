import React from 'react';
import FontLinks from '../components/FontLinks';
import Sidebar from '../components/sidebar/Sidebar';
import Searchbar from '../components/searchbar/Searchbar';
import ProductCard from '../components/product_card/ProductCard';
import Cart from '../components/cart/Cart';

const PlaceOrder = () => {
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
              <Cart/>
            </div>

            <section className="po-grid" id="poGrid" aria-label="Available products">
              <ProductCard productName="Tomato" price="50" quantity="23"/>
              <ProductCard productName="Tomato" price="50" quantity="23"/>
              <ProductCard productName="Tomato" price="50" quantity="23"/>
              <ProductCard productName="Tomato" price="50" quantity="23"/>
              <ProductCard productName="Tomato" price="50" quantity="23"/>
            </section>
          </main>
        </div>
      </div>
    </>
  )
}

export default PlaceOrder