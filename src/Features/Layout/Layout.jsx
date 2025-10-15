import React from 'react'
import { Outlet } from 'react-router-dom'
import ResponsiveSidebar from '../../Components/SideBar/SideBar'

function Layout() {
  
  return (

    <ResponsiveSidebar>
      <Outlet />
    </ResponsiveSidebar>
  )
}

export default Layout
