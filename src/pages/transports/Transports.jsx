import React, { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'

import CardsContainer from '../../components/cards/CardsContainer'
import Paginate from '../../components/pagination/Paginate'

import { useGetDriverCollectionQuery } from '../../services/databases/driverCollection'
import SearchCountry from '../../components/forms/searchCountry/SearchCountry'

function Transports() {
  const location = useLocation()
  const [state, setState] = useState(location.state)
  const [searchCountryValue, setSearchCountryValue] = useState({
    from: '',
    to: '',
  })

  const { data, error, isLoading } = useGetDriverCollectionQuery(
    state
      ? state
      : searchCountryValue.from || searchCountryValue.to
        ? searchCountryValue
        : '',
  )
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    if (searchCountryValue.from || searchCountryValue.to) {
      setState('')
    }
  }, [searchCountryValue])

  const itemsPerPage = 6
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage

  const currentItemsTransports = useMemo(() => {
    if (data && Array.isArray(data.documents) && data.documents.length > 0) {
      return data.documents?.slice(indexOfFirstItem, indexOfLastItem)
    }
    return []
  }, [data, indexOfFirstItem, indexOfLastItem])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="flex-1 py-16 mx-auto max-w-7xl px-6 lg:px-8">
      <h2 className="text-4xl font-bold text-center">Список транспортов</h2>
      <SearchCountry
        setSearchCountryValue={setSearchCountryValue}
        setState={setState}
      />
      <CardsContainer
        data={currentItemsTransports}
        error={error}
        isLoading={isLoading}
        who="водитель"
      />
      {!isLoading && currentItemsTransports.length > 0 && (
        <Paginate
          count={data.documents ? data.documents.length : 0}
          page={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
        />
      )}
    </div>
  )
}

export default Transports
