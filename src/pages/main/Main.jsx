import React from 'react'

import { ID } from 'appwrite'

import {
  useCreateDriverCollectionMutation,
  useGetDriverCollectionQuery,
} from '../../services/databases/driverCollection'

import HomeSection from '../../layouts/sections/homeSection/HomeSection'
import PublicationSection from '../../layouts/sections/publicationSection/PublicationSection'

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
      <PublicationSection />
    </div>
  )
}

export default Main
