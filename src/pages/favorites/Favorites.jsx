import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

import CardsContainer from '../../components/cards/CardsContainer'
import Paginate from '../../components/pagination/Paginate'
import SearchCountry from '../../components/forms/searchCountry/SearchCountry'

function Favorites() {
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem('favorites')) || [],
  )
  const { isFavorites } = useSelector((state) => state.isFavorites)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchCountryValue, setSearchCountryValue] = useState({
    from: '',
    to: '',
  })

  const itemsPerPage = 6
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage

  const filteredData = useMemo(() => {
    if (!searchCountryValue.from && !searchCountryValue.to) {
      return data
    }
    return data.filter(
      (item) =>
        (searchCountryValue.from
          ? item.from
              .toLowerCase()
              .includes(searchCountryValue.from.toLowerCase())
          : true) &&
        (searchCountryValue.to
          ? item.to.toLowerCase().includes(searchCountryValue.to.toLowerCase())
          : true),
    )
  }, [data, searchCountryValue])

  const currentItemsTransports = useMemo(() => {
    if (
      filteredData &&
      Array.isArray(filteredData) &&
      filteredData.length > 0
    ) {
      return filteredData?.slice(indexOfFirstItem, indexOfLastItem)
    }
    return []
  }, [filteredData, indexOfFirstItem, indexOfLastItem])

  useEffect(() => {
    setData(JSON.parse(localStorage.getItem('favorites')) || [])
  }, [isFavorites])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentPage])

  return (
    <div className="flex-1 py-16 mx-auto max-w-7xl px-6 lg:px-8">
      <h2 className="text-4xl font-bold text-center">Список избранных</h2>
      <SearchCountry setSearchCountryValue={setSearchCountryValue} />
      <CardsContainer data={currentItemsTransports} />
      {filteredData.length > 0 && (
        <Paginate
          count={data ? filteredData.length : 0}
          page={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
        />
      )}
    </div>
  )
}

export default Favorites
