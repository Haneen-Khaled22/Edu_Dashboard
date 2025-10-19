import React from 'react'
import { Outlet } from 'react-router-dom'
import ResponsiveSidebar from '../../Components/SideBar/SideBar'
import { useAuth } from '../Context/Auth/AuthContext';

function Layout() {
 
  
  return (

    <ResponsiveSidebar>
      <Outlet />
    </ResponsiveSidebar>
  )
}

export default Layout
