/**
 * Base webpack config used across other specific configs
 */

import path from 'path'
import webpack from 'webpack'
import { dependencies as externals } from './app/package.json'
import { dependencies as externals1 } from './package.json'

export default {
  externals: Object.keys(externals)
    .concat(Object.keys(externals1)),

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/, /\.d\.ts$/],
        use: {
          loader: 'awesome-typescript-loader',
          options: {
            silent: true,
            useBabel: true,
            useCache: true
          }
        }
      }]
  },

  output: {
    path: path.join(__dirname, 'app'),
    filename: 'bundle.js',
    // https://github.com/webpack/webpack/issues/1114
    libraryTarget: 'commonjs2'
  },

  /**
   * Determine the array of extensions that should be used to resolve modules.
   */
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    modules: [
      path.join(__dirname, 'app'),
      'node_modules',
    ],
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
  ],
};
