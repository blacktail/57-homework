/* eslint-disable no-new */
import React from 'react'
import { useRef, useDidMount, useDispatch, useEffect, useCallback } from 'common/hooks'
import { randomColor } from 'common/utils'
import { createPolygonColorButton } from './color_button'
import { drawPolygon, drawShapes } from './draw_helper'

function Map({ locations = [], isPolygon = false, center, shapes }) {
  const dispatch = useDispatch()

  const elRef = useRef(null)
  const mapRef = useRef(null)
  const markers = useRef([])
  const markerCluster = useRef(null)
  const polygonRef = useRef(null)
  const shapesRef = useRef(null)

  const generatePolygon = useCallback(() => {
    dispatch({
      type: 'gmap/togglePolygon',
      payload: {
        isPolygon: true,
      },
    })
  }, [dispatch])

  useDidMount(() => {
    async function initMap() {
      await window.gmapPromise
      mapRef.current = new window.google.maps.Map(elRef.current, {
        center: { lat: 30.5728, lng: 104.0668 },
        zoom: 6,
      })

      const map = mapRef.current

      map.addListener('rightclick', () => {
        if (shapes.length === 0) {
          generatePolygon(true)
        }
      })

      const button = createPolygonColorButton()
      button.addEventListener('click', () => {
        if (polygonRef.current) {
          polygonRef.current.setOptions({
            fillColor: randomColor(),
          })
        }

        if (shapesRef.current) {
          shapesRef.current.forEach(poly => {
            poly.setOptions({
              fillColor: randomColor(),
            })
          })
        }
      })
      map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(button)
    }

    initMap()
  })

  useEffect(() => {
    console.log('run Effect')
    async function runEffect() {
      if (mapRef.current) {
        const map = mapRef.current
        const labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

        // Clear Markers First
        if (markerCluster.current) {
          markerCluster.current.setMap(null)
        }
        if (markers.current && markers.current.length > 0) {
          for (let i = 0; i < markers.current.length; i += 1) {
            markers.current[i].setMap(null)
          }

          markers.current = null
        }

        // Clear Polygon
        if (polygonRef.current) {
          polygonRef.current.setMap(null)
          polygonRef.current = null
        }

        // Clear Shapes
        if (shapesRef.current) {
          shapesRef.current.forEach(shape => shape.setMap(null))
          shapesRef.current = null
        }

        // Draw markers(use marker cluster here to improve the UE)
        if (shapes && shapes.length > 0) {
          shapesRef.current = await drawShapes(map, shapes, dispatch)
        } else if (locations.length > 0) {
          if (isPolygon) {
            polygonRef.current = drawPolygon(map, map.getBounds(), locations)
          } else {
            markers.current = locations.map((location, i) => {
              return new window.google.maps.Marker({
                position: {
                  lat: location[0],
                  lng: location[1],
                },
                label: labels[i % labels.length],
              })
            }) // Add a marker clusterer to manage the markers.

            markerCluster.current = new window.MarkerClusterer(mapRef.current, markers.current, {
              imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
            })
          }
        }
      }
    }

    runEffect()
  }, [dispatch, isPolygon, locations, shapes])

  useEffect(() => {
    if (mapRef.current && center) {
      mapRef.current.setCenter({
        lat: center[0],
        lng: center[1],
      })
    }
  }, [center])

  return (
    <div id="map" ref={elRef} style={{ width: '100%', height: '100%' }}>
      Map Initializing...
    </div>
  )
}

window.gmapPromise = new Promise(resolve => {
  if (window.google) {
    resolve()
  } else {
    window.initMap = () => {
      resolve()
    }
  }
})

export default Map
