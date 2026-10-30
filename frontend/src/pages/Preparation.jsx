import {react, useState} from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import FontLinks from '../components/FontLinks';
import OrderCard from '../components/order_card/OrderCard';

const Preparation = () => {

  return (
    <>
      <FontLinks/>
      <div className="main-page">
        <div className="main-app">
          <Sidebar/>
          <main className="main-content">
            <h1 className="main-title">Preparation Checklist</h1>
            <div class="filters" role="tablist" aria-label="Filter orders">
              <button type="button" class="filter active" data-filter="all" role="tab" aria-selected="true">All</button>
              <button type="button" class="filter" data-filter="ready" role="tab" aria-selected="false">Ready</button>
              <button type="button" class="filter" data-filter="preparing" role="tab" aria-selected="false">Preparing</button>
          </div>

          <section className="orders-grid" id="ordersGrid">
            <OrderCard/>
          </section>

          </main>
        </div>
      </div>
    </>
  )
}

export default Preparation