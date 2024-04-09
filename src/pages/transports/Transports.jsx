import React, { useEffect, useMemo, useState } from 'react'
import CardsContainer from '../../components/cards/CardsContainer'
import Paginate from '../../components/pagination/Paginate'

import { useGetDriverCollectionQuery } from '../../services/databases/driverCollection'

function Transports() {
  const { data, error, isLoading } = useGetDriverCollectionQuery()
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 5
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage

  const currentItemsTransports = useMemo(() => {
    if (data && Array.isArray(data.documents) && data.documents.length > 0) {
      return data.documents.slice(indexOfFirstItem, indexOfLastItem)
    }
    return []
  }, [data, indexOfFirstItem, indexOfLastItem])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className="flex-1 py-16 mx-auto max-w-7xl px-6 lg:px-8">
      <h2 className="text-4xl font-bold text-center">Список транспортов</h2>
      <CardsContainer
        data={currentItemsTransports}
        error={error}
        isLoading={isLoading}
      />
      {!isLoading && currentItemsTransports.length > 0 && (
        <Paginate
          count={data ? data.length : 0}
          page={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
        />
      )}
    </div>
  )
}

export default Transports
