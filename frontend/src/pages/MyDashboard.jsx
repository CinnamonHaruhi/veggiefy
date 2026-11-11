import React from 'react'
import FontLinks from '../components/FontLinks';
import Sidebar from '../components/sidebar/Sidebar';

const MyDashboard = () => {
  return (
    <>
      <FontLinks/>
      <div className="main-page">
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

export default MyDashboard