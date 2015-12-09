var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: {
    app: './www/js/index.js',
  },
  output: {
    filename: './www/dist/app.js',
    publicPath: '/',
    path: __dirname,
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      exclude: /build|lib|node_modules/,
    },
             { test: /\.json$/, loader: "json-loader" }],
    preLoaders: [{
      test: /\.js$/,
      loaders: ['eslint'],
      exclude: /build|lib|node_modules/
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  eslint: {
    configFile: '.eslintrc'
  },
};
