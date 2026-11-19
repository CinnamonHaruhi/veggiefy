import { useEffect, useState } from 'react';
import FontLinks from '../components/FontLinks';
import Sidebar from '../components/sidebar/Sidebar';
import axios from 'axios';

const AdminDashboard = () => {
  const [ dashboardStats, setDashboardStats ] = useState({
    total_orders: 0,
    pending_orders: 0,
    ready_for_pickup: 0,
    total_customers: 0
  });
  const [ recentOrders, setRecentOrders ] = useState([]);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      const stats = await axios.get("http://localhost:5000/admin/dashboard/stats");
      setDashboardStats(stats.data);
    }
    fetchDashboardStats();
  }, []);

  useEffect(() => {
    const fetchRecentOrders = async () => {
      const recentOrders = await axios.get("http://localhost:5000/admin/dashboard/recent-orders");
      setRecentOrders(recentOrders.data)
    }
    fetchRecentOrders();
  });

  const statBoxStyle = {
    "border": "1px solid black",
    "padding": "10px",
    "display": "flex",
    "align-items": "center",
    "justify-content": "center",
    "width": "50%",
    "border-radius": "10px"
  }

  const statWrapperStyle = {
    "display": "flex",
    "flex-direction": "column", 
    "width": "100%",
    "height": "50%",
    "gap": "10px"
  } 

  const statRowStyle = {
    "display": "flex",
    "width": "100%",
    "gap": "10px",
    "height": "50%"
  }
  
  const tableStyle = {
    "width": "100%",
    "text-align": "center",
    "border": "1px solid black",
    "margin-top": "10px",
  }

  return (
    <>
      <FontLinks/>
      <div className="main-page">
        <div className="main-app">
          <Sidebar/>
          <main className="main-content">
            <h1 className="main-title">Dashboard</h1>

            <div style={statWrapperStyle}>
                <div style={statRowStyle}>
                  <div style={statBoxStyle}>
                    Total Orders: {dashboardStats.total_orders}
                  </div>
                  <div style={statBoxStyle}>
                    Pending Orders: {dashboardStats.pending_orders}
                  </div>
                </div>
                <div style={statRowStyle}>
                  <div style={statBoxStyle}>
                    Ready for pickup: {dashboardStats.ready_for_pickup}
                  </div>
                  <div style={statBoxStyle}>
                    Total customers: {dashboardStats.total_customers}
                  </div>
              </div>
            </div>
            <h2>Recent Orders</h2>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th>Order No</th>
                  <th>Order date</th>
                  <th>Total amount</th>
                  <th>User</th>
                  <th>Status</th>
                </tr>              
              </thead>

              <tbody>
                {recentOrders.map(order => {
                  return <tr>
                    <td>{order.order_no}</td>
                    <td>{new Date(order.order_date).toLocaleDateString()}</td>
                    <td>{order.total_amount}</td>
                    <td>{order.username}</td>
                    <td>{order.status_name}</td>
                  </tr>
                })}
              </tbody>
            </table>
          </main>
        </div>
      </div>
    </>
  )
}

export default AdminDashboard