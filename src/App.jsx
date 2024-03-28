import { Route, Routes } from 'react-router-dom'

import Login from './pages/login/Login'
import Main from './pages/main/Main'
import NotFound from './pages/notFound/NotFound'
import Register from './pages/register/Register'

import Layout from './hoc/Layout'
import PrivateRoutes from './hoc/PrivateRoutes'

import Alerts from './components/alerts/Alerts'
import UpdatePassword from './pages/updatePassword/UpdatePassword'
import ScrollToTopButton from './components/buttons/scrollToTopButton/ScrollToTopButton'

function App() {
  return (
    <div className="flex flex-col h-screen">
      <Alerts />
      <ScrollToTopButton />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/update-password" element={<UpdatePassword />} />
        <Route element={<PrivateRoutes />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Main />} />
          </Route>
        </Route>
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
