import React from 'react'
import './searchbar.css';

const Searchbar = () => {
  return (
    <form className="products-search" id="searchForm" role="search">
      <svg className="products-search-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5.5 5.5"/></svg>
      <input type="text" id="searchInput" placeholder="Search product name" aria-label="Search products by name" autoComplete="off"/>
      <button type="button" className="products-search-clear" id="searchClear" aria-label="Clear search">&times;</button>
    </form>
  )
}

export default Searchbar