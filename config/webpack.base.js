/* eslint-disable import/no-extraneous-dependencies */
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isProdMode = process.env.NODE_ENV === 'production'
const projRootDir = `${__dirname}/..`

module.exports = {
  entry: {
    main: [path.resolve(projRootDir, 'src/index.js')],
  },
  output: {
    publicPath: '/',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: !isProdMode,
            },
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[hash:base64:8]',
              },
              sourceMap: !isProdMode,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                config: path.resolve(projRootDir, 'config/postcss.config.js'),
                sourceMap: !isProdMode,
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: !isProdMode,
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: !isProdMode,
            },
          },
        ],
      },
      {
        test: /\.less$/, // only for antd
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: !isProdMode,
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                modifyVars: {},
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1024,
            name: 'fonts/[name].[ext]',
          },
        },
      },
      {
        test: /\.(gif|jpg|jpeg|png)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1024,
            name: 'images/[name].[ext]',
          },
        },
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: '@svgr/webpack',
            options: {
              babel: false,
              icon: true,
            },
          },
          {
            loader: 'url-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: isProdMode ? '[name].[contenthash:8].css' : '[name].css',
      chunkFilename: isProdMode ? '[name].[contenthash:8].css' : '[id].css',
    }),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      base: '/',
      favicon: 'public/favicon.ico',
      minify: isProdMode
        ? {
            collapseWhitespace: true,
            removeComments: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,

            removeStyleLinkTypeAttributes: true,
            useShortDoctype: true,
          }
        : false,
    }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn|en/),
  ],
}
