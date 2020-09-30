import { sleep } from 'common/utils'
import { Modal } from 'antd'

export function drawPolygon(map, bounds, locations, mapper) {
  let filteredLocations = locations.map(
    mapper ||
      (location => ({
        lat: location[0],
        lng: location[1],
      }))
  )

  if (bounds) {
    filteredLocations = filteredLocations.filter(location => {
      return bounds.contains(location)
    })
  }

  const polygon = new window.google.maps.Polygon({
    paths: filteredLocations,
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
  })
  polygon.setMap(map)

  return polygon
}

export async function drawShapes(map, shapes, dispatch) {
  Modal.warn({
    content: 'Please wait for drawing...',
  })
  map.fitBounds({
    east: 167.53058104383695,
    west: 99.91385130750884,
    north: -12.493260954896456,
    south: -38.499036253493536,
  })

  dispatch({
    type: 'gmap/setMapBusy',
    payload: {
      busy: true,
    },
  })

  await sleep(50)

  const resultShapes = []
  for (let i = 0; i < shapes.length; i += 1) {
    const shape = shapes[i]

    if (i % 20 === 0) {
      // eslint-disable-next-line no-await-in-loop
      await sleep(10)
    }

    switch (shape?.geometry?.type) {
      case 'MultiPolygon':
        shape.geometry.coordinates.forEach(coordsArr => {
          resultShapes.push(
            drawPolygon(map, null, coordsArr[0], location => ({
              lat: location[1],
              lng: location[0],
            }))
          )
        })
        break
      case 'Polygon':
        shape.geometry.coordinates.forEach(coordsArr => {
          resultShapes.push(
            drawPolygon(map, null, coordsArr, location => ({
              lat: location[1],
              lng: location[0],
            }))
          )
        })
        break
      default:
        break
    }
  }

  dispatch({
    type: 'gmap/setMapBusy',
    payload: {
      busy: false,
    },
  })

  Modal.destroyAll()

  return resultShapes
}

export default {
  drawPolygon,
  drawShapes,
}
