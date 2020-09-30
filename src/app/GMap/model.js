import random from 'lodash.random'

const GMapModel = {
  name: 'gmap',
  state: {
    locations: [],
    shapes: [],
    isPolygon: false,
    center: null,
    mapBusy: false,
  },
  effects() {
    return {
      async generateLocations(count = 5000) {
        const locations = []
        for (let i = 0; i < count; i += 1) {
          locations.push([random(-90, 90, true), random(-180, 180, true)])
        }

        this.update({
          locations,
          center: null,
          isPolygon: false,
          shapes: [],
        })
      },

      async removeLocations() {
        this.update({
          locations: [],
        })
      },

      async togglePolygon(payload) {
        this.update({
          isPolygon: !!payload.isPolygon,
        })
      },

      async setCenterLocation(payload) {
        this.update({
          center: payload.location,
        })
      },

      async setShapes(payload) {
        this.update({
          shapes: payload.shapes,
          locations: [],
          isPolygon: false,
          center: null,
        })
      },

      async setMapBusy(payload) {
        this.update({
          mapBusy: payload.busy,
        })
      },
    }
  },
  reducers: {
    update(state, data) {
      Object.assign(state, data)
    },
  },
}

export default GMapModel
