/* eslint-disable import/no-extraneous-dependencies */
const path = require('path')
const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const baseConfig = require('./webpack.base.js')

const projRootDir = `${__dirname}/..`

module.exports = merge(baseConfig, {
  mode: 'production',
  output: {
    path: path.resolve(projRootDir, 'dist'),
    filename: '[name].[contenthash:8].js',
    chunkFilename: '[name].[contenthash:8].js',
  },
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  plugins: [new CleanWebpackPlugin()],
})
