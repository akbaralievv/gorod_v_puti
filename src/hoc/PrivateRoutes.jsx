import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

import { getUserRequest } from '../utils/api'
import ModalPreload from '../components/modalPreload/ModalPreload'

const PrivateRoutes = () => {
  const { userData, loading: getUserLoad } = useSelector(
    (state) => state.getUser,
  )
  const { loading: logoutLoad } = useSelector((state) => state.logout)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserRequest())
  }, [])

  if (getUserLoad || logoutLoad) return <ModalPreload />

  return userData ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoutes
