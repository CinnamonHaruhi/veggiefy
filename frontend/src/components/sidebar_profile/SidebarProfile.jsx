import React, { useContext, useEffect } from 'react';
import './sidebar-profile.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SidebarProfile = (props) => {
  const navigate = useNavigate();

  const showLogoutDialog = async () => {
    document.getElementById("logoutDialog").showModal();
  }
  
  const handleLogout = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/logout");
    navigate("/login");
  }
    
  return (
    <>
      <div className="products-admin-wrap">
        <div className="products-admin">
          <span className="products-avatar" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.4 0-8 2.2-8 5v2h16v-2c0-2.8-3.6-5-8-5Z"/></svg>
          </span>
          <span className="products-admin-name">{props.username}</span>
          <button type="button" className="products-admin-toggle" id="adminToggle" aria-label="Admin menu" aria-expanded="false"
          onClick={showLogoutDialog}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </button>
          </div>
      </div>

      <dialog className="dialog" id='logoutDialog' aria-labelledby="dialogTitle">
        <form id="dialogForm" onSubmit={handleLogout} noValidate>
          <h2 id="dialogTitle">Log out</h2>
          <div id="dialogFields">
            <p>Are you sure you want to log out?</p>
          </div>
          <div className="dialog-actions">
            <button type="button" className="dialog-btn dialog-btn-light" id="dialogCancel" onClick={() => {document.getElementById("logoutDialog").close()}}>No</button>
            <button type="submit" className="dialog-btn dialog-btn-dark" id="dialogSubmit">Yes</button>
          </div>
        </form>
      </dialog>
    </>
  )
}

export default SidebarProfile