import React from 'react'
import { Outlet } from 'react-router-dom'

import Footer from '../layouts/footer/Footer'
import Header from '../layouts/header/Header'

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout
