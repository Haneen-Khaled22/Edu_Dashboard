import React from 'react'
import { Outlet } from 'react-router-dom'
import ResponsiveSidebar from '../../Components/NavBar/NavBar'

function Layout() {
  return (
    <ResponsiveSidebar>
      <Outlet />
    </ResponsiveSidebar>
  )
}

export default Layout
