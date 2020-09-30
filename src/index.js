import 'core-js'
import 'regenerator-runtime/runtime'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { init } from '@rematch/core'
import * as models from 'common/models'
import selectPlugin from '@rematch/select'
import createLoadingPlugin from '@rematch/loading'
import immerPlugin from '@rematch/immer'
import App from './App'

const store = init({
  models,
  plugins: [selectPlugin(), createLoadingPlugin(), immerPlugin()],
})

window.store = store

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
