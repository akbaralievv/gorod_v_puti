import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Router, Routes } from 'react-router-dom'

import Login from './pages/login/Login'
import Main from './pages/main/Main'
import NotFound from './pages/notFound/NotFound'
import Register from './pages/register/Register'

import { getUserRequest } from './utils/api'

import Layout from './hoc/Layout'
import PrivateRoutes from './hoc/PrivateRoutes'

function App() {
  // const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(getUserRequest())
  // }, [])

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<PrivateRoutes />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Main />} />
        </Route>
      </Route>
      <Route path="/*" element={<NotFound />} />
    </Routes>
  )
}

export default App
