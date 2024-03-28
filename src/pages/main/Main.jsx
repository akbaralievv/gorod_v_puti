import React from 'react'

import { ID } from 'appwrite'

import {
  useCreateDriverCollectionMutation,
  useGetDriverCollectionQuery,
} from '../../services/databases/driverCollection'
import './Main.css'

import HomeSection from '../../layouts/sections/homeSection/HomeSection'
import CreatePublicSection from '../../layouts/sections/createPublicSection/CreatePublicSection'

function Main() {
  const { data, error, isLoading } = useGetDriverCollectionQuery()
  const [
    createDriver,
    {
      data: createDriverData,
      error: createDriverError,
      isLoading: createDriverLoading,
    },
  ] = useCreateDriverCollectionMutation()

  const id = ID.unique()

  const handleClick = () => {
    createDriver(id)
  }

  return (
    <div className="flex-1 _neKTiNR9ODo9dbROzCM dark">
      <HomeSection />
      <CreatePublicSection />
    </div>
  )
}

export default Main
