import React from 'react'
import Card from './card/Card'
import SkeletonCard from './skeletonCard/SkeletonCard'

function CardsContainer({ data, isLoading, error }) {
  const skeleton = [...new Array(6)].map((_, index) => (
    <SkeletonCard key={index} />
  ))

  return (
    <div className="gap-12 grid-cols-1 sm:grid md:grid-cols-2 lg:grid-cols-3 mt-14">
      {isLoading ? (
        skeleton
      ) : error ? (
        <h3 className="text-3xl font-bold dark:text-white text-center mt-12">
          <mark className="px-2 text-white bg-gray-800 rounded dark:bg-blue-500">
            Транспорта пока нет :(
          </mark>
        </h3>
      ) : (
        data.map((item, id) => <Card key={id} data={item} />)
      )}
    </div>
  )
}

export default CardsContainer
