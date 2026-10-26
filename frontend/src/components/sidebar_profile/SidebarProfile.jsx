import React from 'react'
import './sidebar-profile.css'

const SidebarProfile = () => {
  return (
    <div className="products-admin-wrap">
      <div className="products-admin">
        <span className="products-avatar" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.4 0-8 2.2-8 5v2h16v-2c0-2.8-3.6-5-8-5Z"/></svg>
        </span>
        <span className="products-admin-name">Admin</span>
        <button type="button" className="products-admin-toggle" id="adminToggle" aria-label="Admin menu" aria-expanded="false">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
        </button>
        </div>
        <div className="products-admin-menu" id="adminMenu" hidden>
          <a href="login.html">Log out</a>
      </div>
    </div>
  )
}

export default SidebarProfile