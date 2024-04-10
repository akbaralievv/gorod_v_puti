import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

import CardsContainer from '../../components/cards/CardsContainer'
import Paginate from '../../components/pagination/Paginate'

function Favorites() {
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem('favorites')) || [],
  )
  const { isFavorites } = useSelector((state) => state.isFavorites)
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 6
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage

  const currentItemsTransports = useMemo(() => {
    if (data && Array.isArray(data) && data.length > 0) {
      return data?.slice(indexOfFirstItem, indexOfLastItem)
    }
    return []
  }, [data, indexOfFirstItem, indexOfLastItem])

  useEffect(() => {
    setData(JSON.parse(localStorage.getItem('favorites')) || [])
  }, [isFavorites])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className="flex-1 py-16 mx-auto max-w-7xl px-6 lg:px-8">
      <h2 className="text-4xl font-bold text-center">Список избранных</h2>
      <CardsContainer data={currentItemsTransports} who="избранные" />
      {currentItemsTransports.length > 0 && (
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

export default Favorites