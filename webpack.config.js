const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

// Is the current build a development build
const IS_DEV = process.env.NODE_ENV === 'dev'

const dirNode = 'node_modules'
const dirApp = path.join(__dirname, 'src')
const dirAssets = path.join(__dirname, 'src/assets')

const appHtmlTitle = 'Josh Hoegen'

/**
 * Webpack Configuration
 */
module.exports = {
  entry: {
    vendor: ['lodash'],
    bundle: path.join(dirApp, 'index'),
  },
  resolve: {
    modules: [dirNode, dirApp, dirAssets],
  },
  plugins: [
    new webpack.DefinePlugin({
      IS_DEV,
    }),

    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.ejs'),
      title: appHtmlTitle,
    }),

    new CopyWebpackPlugin([
      {
        from: 'src/assets',
        to: 'assets',
      },
    ]),
  ],
  module: {
    rules: [
      // BABEL
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        options: {
          compact: true,
        },
      },

      // STYLES
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: IS_DEV,
            },
          },
        ],
      },

      // CSS / SASS
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader', // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'sass-loader', // compiles Sass to CSS
          },
        ],
      },

      // IMAGES
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },

      {
        test: /\.(svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 25000,
          },
        },
      },

      // fonts
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
    ],
  },
}
