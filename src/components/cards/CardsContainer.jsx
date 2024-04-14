import React from 'react'

import Card from './card/Card'
import SkeletonCard from './skeletonCard/SkeletonCard'

function CardsContainer({
  data,
  isLoading,
  error,
  edit,
  passengersRefetch,
  driverRefetch,
}) {
  const skeleton = [...new Array(6)].map((_, index) => (
    <SkeletonCard key={index} />
  ))

  return (
    <div className="gap-12 grid-cols-1 grid md:grid-cols-2 lg:grid-cols-3 mt-14">
      {isLoading ? (
        skeleton
      ) : error || data.length === 0 ? (
        <h3 className="text-3xl font-bold dark:text-white text-center mt-12">
          Ничего не нашлось :(
        </h3>
      ) : (
        data?.map((item) => (
          <Card
            key={item.$id}
            data={item}
            edit={edit}
            passengersRefetch={passengersRefetch}
            driverRefetch={driverRefetch}
          />
        ))
      )}
    </div>
  )
}

export default CardsContainer
