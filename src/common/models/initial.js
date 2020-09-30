/**
 * @description This model is used to store the state which should be loaded when the page is initially loaded
 */
const intialData = {
  state: {
    loading: false,
  },
  effects: {},
  reducers: {
    update(prev, data) {
      return {
        ...prev,
        ...data,
      }
    },
  },
}

export default intialData
