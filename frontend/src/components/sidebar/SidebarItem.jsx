import React from 'react'
import { Link } from 'react-router-dom' 

const SidebarItem = (props) => {
  return (
    <Link to={props.path} className={props.path == window.location.pathname ? props.class + " is-active" :  props.class}>
      {props.children}
      <span>{props.label}</span>
    </Link>
  )
}

export default SidebarItem