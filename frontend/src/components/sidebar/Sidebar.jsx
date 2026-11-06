import { React, useContext } from 'react'
import './sidebar.css'
import SidebarProfile from '../sidebar_profile/SidebarProfile'
import SidebarItems from './SidebarItems'
import { UserContext } from '../../contexts/authContext'

const Sidebar = () => {
  const user = useContext(UserContext);
  const isAdmin = user.role_id == 1;

  return (
    <aside className="sidebar" id="sidebar">
      <div className="sidebar-brand">
        <img src="logo.svg" alt="Veggiefy logo"/>
        <span className="wordmark">Veggiefy</span>
      </div>

      <nav className="sidebar-nav" aria-label="Main navigation">
        <SidebarItems isAdmin={isAdmin}></SidebarItems>
      </nav>
      
      <SidebarProfile username={user.username}/>
    </aside>
  )
}
export default Sidebar