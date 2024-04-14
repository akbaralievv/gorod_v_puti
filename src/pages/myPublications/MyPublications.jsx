import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

import CardsContainer from '../../components/cards/CardsContainer'
import Paginate from '../../components/pagination/Paginate'
import SearchCountry from '../../components/forms/searchCountry/SearchCountry'

import { useGetPassengerCollectionQuery } from '../../services/databases/passengerCollection'
import { useGetDriverCollectionQuery } from '../../services/databases/driverCollection'

function MyPublications() {
  const [searchCountryValue, setSearchCountryValue] = useState({
    from: '',
    to: '',
  })
  const { userData, loading: getUserLoad } = useSelector(
    (state) => state.getUser,
  )
  const {
    data: passengersData,
    error: passengersError,
    isLoading: passengersLoading,
    refetch: passengersRefetch,
  } = useGetPassengerCollectionQuery({
    search:
      searchCountryValue.from || searchCountryValue.to
        ? searchCountryValue
        : '',
    user_id: userData.$id,
  })
  const {
    data: driverData,
    error: driverError,
    isLoading: driverLoading,
    refetch: driverRefetch,
  } = useGetDriverCollectionQuery({
    search:
      searchCountryValue.from || searchCountryValue.to
        ? searchCountryValue
        : '',
    user_id: userData.$id,
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [data, setData] = useState([])

  useEffect(() => {
    if (!passengersLoading && !driverLoading && passengersData && driverData) {
      setData([...passengersData.documents, ...driverData.documents])
    }
  }, [passengersData, driverData, passengersLoading, driverLoading])

  const itemsPerPage = 6
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage

  const currentItemsTransports = useMemo(() => {
    if (data && Array.isArray(data) && data.length > 0) {
      return data.slice(indexOfFirstItem, indexOfLastItem)
    }
    return []
  }, [data, indexOfFirstItem, indexOfLastItem])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentPage])

  return (
    <div className="flex-1 py-16 mx-auto max-w-7xl px-6 lg:px-8">
      <h2 className="text-4xl font-bold text-center">
        Мои опубликованные посты
      </h2>
      <SearchCountry setSearchCountryValue={setSearchCountryValue} />
      <CardsContainer
        data={currentItemsTransports}
        error={driverError || passengersError}
        isLoading={driverLoading || passengersLoading}
        edit={true}
        passengersRefetch={passengersRefetch}
        driverRefetch={driverRefetch}
      />
      {!driverLoading &&
        !passengersLoading &&
        currentItemsTransports.length > 0 && (
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

export default MyPublications
