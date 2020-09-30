import axios from 'axios'
import { message } from 'antd'
import uiConfig from 'common/config'
import urlJoin from 'url-join'

// global interceptors setup
axios.interceptors.request.use(
  (config) => {
    const { url } = config

    // append api base path to the url if not present
    if (!url.startsWith(uiConfig.apiBase) && !url.startsWith('/mock')) {
      config.url = urlJoin(uiConfig.apiBase, config.url) // eslint-disable-line
    }

    if (localStorage.idToken && url.indexOf('/admin') === -1) {
      config.headers.common.Authorization = `Bearer ${localStorage.idToken}` // eslint-disable-line
    }

    if (localStorage.adminIdToken && url.indexOf('/admin') > -1) {
      config.headers.common.Authorization = `Bearer ${localStorage.adminIdToken}` // eslint-disable-line
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (
      (error.config.useGlobalErrorHandler !== false &&
        ((error?.response?.status !== 401 && error?.response?.status !== 403) ||
          error.response.data.AuthenticationException)) ||
      (error?.response?.status === 401 && error.request.responseURL.indexOf('activate') > -1)
    ) {
      message.error(
        error?.response?.data?.AuthenticationException ||
          error?.response?.data?.detail ||
          error?.response?.data?.title ||
          error.toJSON().message
      )
    }

    return Promise.reject(error)
  }
)

window.addEventListener('unhandledrejection', (event) => {
  event.preventDefault()
  // TODO: add monitoring in the future
  // eslint-disable-next-line
  console.warn('unhandledrejection', event)
  // eslint-disable-next-line
  console.warn(event?.reason?.stack)
})
