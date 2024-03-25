import React from 'react'

import { ID } from 'appwrite'

import {
  useCreateDriverCollectionMutation,
  useGetDriverCollectionQuery,
} from '../../services/databases/driverCollection'

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
    <div className="flex-1">
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
          <button onClick={handleClick}>LCick</button>
        </>
      ) : null}
    </div>
  )
}

export default Main
