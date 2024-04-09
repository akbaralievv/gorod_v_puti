import { Route, Routes } from 'react-router-dom'
import React, { Suspense, lazy } from 'react'

import Alerts from './components/alerts/Alerts'
import ScrollToTopButton from './components/buttons/scrollToTopButton/ScrollToTopButton'
import PrivateRoutes from './hoc/PrivateRoutes'
import Layout from './hoc/Layout'
import ModalPreload from './components/modalPreload/ModalPreload'

const Login = lazy(() => import('./pages/login/Login'))
const Main = lazy(() => import('./pages/main/Main'))
const NotFound = lazy(() => import('./pages/notFound/NotFound'))
const Register = lazy(() => import('./pages/register/Register'))
const UpdatePassword = lazy(
  () => import('./pages/updatePassword/UpdatePassword'),
)
const Transports = lazy(() => import('./pages/transports/Transports'))
const Passengers = lazy(() => import('./pages/passengers/Passengers'))
const Detail = lazy(() => import('./pages/detail/Detail'))

function App() {
  return (
    <div className="flex flex-col h-screen">
      <Alerts />
      <ScrollToTopButton />
      <Suspense fallback={<ModalPreload />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/update-password" element={<UpdatePassword />} />
          <Route element={<PrivateRoutes />}>
            <Route element={<Layout />}>
              <Route path="/" element={<Main />} />
              <Route path="/transports" element={<Transports />} />
              <Route path="/passengers" element={<Passengers />} />
              <Route path="/transports/:id" element={<Detail />} />
              <Route path="/passengers/:id" element={<Detail />} />
            </Route>
          </Route>
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
