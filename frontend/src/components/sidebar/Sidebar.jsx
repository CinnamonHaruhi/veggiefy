import React from 'react'
import './sidebar.css'
import { Link } from 'react-router-dom'
import SidebarProfile from '../sidebar_profile/SidebarProfile'

const Sidebar = () => {
  return (
    <aside className="sidebar" id="sidebar">

      <div className="sidebar-brand">
        <img src="logo.svg" alt="Veggiefy logo"/>
        <span className="wordmark">Veggiefy</span>
      </div>

      <nav className="sidebar-nav" aria-label="Main navigation">
        <a href="#" className="sidebar-nav-item" data-page="Dashboard">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path className="products-fill" d="M3 11.5 12 3l9 8.5V21a1 1 0 0 1-1 1h-5.5v-7h-5v7H4a1 1 0 0 1-1-1Z"/></svg>
          <span>Dashboard</span>
        </a>
        <a href="#" className="sidebar-nav-item" data-page="Orders">
          <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="4" width="14" height="18" rx="2"/><path d="M9 2h6v4H9zM9 11h6M9 15h6"/></svg>
          <span>Orders</span>
        </a>
        <Link to="/admin/products" className="sidebar-nav-item is-active" aria-current="page">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 3h3l2.5 12h11L21 7H6"/><circle className="products-fill" cx="9" cy="20" r="1.5"/><circle className="products-fill" cx="17" cy="20" r="1.5"/></svg>
          <span>Products</span>
        </Link>
        <a href="#" className="sidebar-nav-item" data-page="Preparation">
          <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="3" width="16" height="19" rx="2"/><circle cx="12" cy="11" r="3"/><path d="M8 18h8"/></svg>
          <span>Preparation</span>
        </a>
        <a href="#" className="sidebar-nav-item" data-page="Reports">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3v18h18M8 17v-5M13 17V8M18 17v-8"/></svg>
          <span>Reports</span>
        </a>
        <a href="#" className="sidebar-nav-item" data-page="Customers">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path className="products-fill" d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.4 0-8 2.2-8 5v2h16v-2c0-2.8-3.6-5-8-5Z"/></svg>
          <span>Customers</span>
        </a>
      </nav>
      
      <SidebarProfile/>
    </aside>
  )
}
export default Sidebar