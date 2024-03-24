import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getUserRequest } from '../utils/api'

const useAuth = () => {
  const { userData, loading } = useSelector((state) => state.getUser)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUserRequest())
  }, [])

  return { userData, loading }
}

export default useAuth
