import React, { useEffect, useState } from 'react'
import { YMaps, Map, Placemark, Polyline } from '@pbe/react-yandex-maps'

const apiKey = import.meta.env.VITE_API_YANDEXMAP_KEY
const geocodeUrl = import.meta.env.VITE_BASE_URL_YANDEXMAP

function YandexMap({ data }) {
  const [coordinatesA, setCoordinatesA] = useState(null)
  const [coordinatesB, setCoordinatesB] = useState(null)

  const getCoordinates = async (address) => {
    const response = await fetch(
      `${geocodeUrl}?apikey=${apiKey}&geocode=${address}&format=json`,
    )
    const data = await response.json()
    const points =
      data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(
        ' ',
      )
    return [parseFloat(points[1]), parseFloat(points[0])]
  }

  useEffect(() => {
    if (data.from && data.to) {
      getCoordinates(data.from).then(setCoordinatesA)
      getCoordinates(data.to).then(setCoordinatesB)
    }
  }, [])
  const [ymaps, setYmaps] = useState(null)
  const [map, setMap] = useState(null)

  useEffect(() => {
    if (ymaps && map && coordinatesB && coordinatesA) {
      ymaps.geocode(coordinatesA).then((result) => {
        const firstCoords = result.geoObjects.get(0).geometry.getCoordinates()

        ymaps.geocode(coordinatesB).then((result) => {
          const secondCoords = result.geoObjects
            .get(0)
            .geometry.getCoordinates()

          const multiRoute = new ymaps.multiRouter.MultiRoute(
            {
              referencePoints: [firstCoords, secondCoords],
              params: {
                routingMode: 'auto',
              },
            },
            {
              boundsAutoApply: true,
            },
          )

          map.geoObjects.add(multiRoute)
        })
      })
    }
  }, [map, ymaps, coordinatesA, coordinatesB])
  return (
    <YMaps query={{ apikey: apiKey, load: 'package.full' }} onLoad={setYmaps}>
      <Map
        defaultState={{
          center: coordinatesA || coordinatesB || [42.875969, 74.603701],
          zoom: 12,
          controls: [
            'zoomControl',
            'fullscreenControl',
            'rulerControl',
            'trafficControl',
            'typeSelector',
          ],
        }}
        width="100%"
        height="400px"
        instanceRef={setMap}
      >
        {coordinatesA && <Placemark geometry={coordinatesA} />}
        {coordinatesB && <Placemark geometry={coordinatesB} />}
        {coordinatesA && coordinatesB && (
          <Polyline geometry={[coordinatesA, coordinatesB]} />
        )}
      </Map>
    </YMaps>
  )
}

export default YandexMap
