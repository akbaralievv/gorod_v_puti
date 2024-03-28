import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { getUserRequest } from '../utils/api'
import ModalPreload from '../components/modalPreload/ModalPreload'

const PrivateRoutes = () => {
  const { userData, loading: getUserLoad } = useSelector(
    (state) => state.getUser,
  )
  const { loading: logoutLoad } = useSelector((state) => state.logout)
  const [isAuthInitialized, setIsAuthInitialized] = useState(false)

  const location = useLocation()
  const dispatch = useDispatch()

  useEffect(() => {
    const checkAuthStatus = async () => {
      await dispatch(getUserRequest())
      setIsAuthInitialized(true)
    }

    checkAuthStatus()
  }, [dispatch])

  if (!isAuthInitialized || getUserLoad || logoutLoad) {
    return <ModalPreload />
  }

  return userData ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  )
}

export default PrivateRoutes
