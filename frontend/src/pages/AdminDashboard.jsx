import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FontLinks from '../components/FontLinks';
import Sidebar from '../components/sidebar/Sidebar';

const AdminDashboard = () => {
  return (
    <>
      <FontLinks/>
      <div className="products-page">
        <div className="main-app">
          <Sidebar/>
          <main className="main-content">
            <h1 className="main-title">Dashboard</h1>

            <div className="main-table-wrap" id="tableWrap">
              <p>bla bla bla</p>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

export default AdminDashboard