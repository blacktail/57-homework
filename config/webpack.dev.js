/* eslint-disable import/no-extraneous-dependencies,no-console */
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.js')

const apiServers = {
  mock: 'http://127.0.0.1:3334',
  local: 'http://127.0.0.1:8088',
  prod: 'http://127.0.0.1:3334',
}

module.exports = (env) => {
  const apiServer = (env && env.API_SERVER) || process.env.API_SERVER || 'local'

  if (!apiServer) {
    console.log('API_SERVER=mock npm start')
    console.log('API_SERVER=local npm start')
    console.log('API_SERVER=prod npm start\n')
  } else {
    console.log('API_SERVER', apiServers[apiServer] || apiServer)
  }

  return merge(baseConfig, {
    mode: 'development',
    entry: {
      main: ['react-hot-loader/patch'],
    },
    resolve: {
      alias: {
        'react-dom': '@hot-loader/react-dom',
      },
    },
    devServer: {
      compress: true,
      disableHostCheck: true,
      host: 'localhost',
      port: 9003,
      hotOnly: true,
      open: true,
      historyApiFallback: true,
      proxy: [
        {
          context: ['/api', '/admin', '/customer'],
          pathRewrite: { '^/api': '' },
          target: apiServers[apiServer] || apiServer,
          changeOrigin: true,
          secure: false,
        },
        {
          context: ['/mock'],
          pathRewrite: { '^/mock': '' },
          target: apiServers.mock,
          changeOrigin: true,
          secure: false,
        },
      ],
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
    devtool: 'eval-source-map',
  })
}
