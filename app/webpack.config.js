var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: {
    app: './src/main.js',
  },
  output: {
    filename: './dist/app.js',
    publicPath: '/',
    path: __dirname,
    include: path.join(__dirname, 'src')
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      include: /dist|build|lib|node_modules/,
    }],
    preLoaders: [{
      test: /\.js$/,
      loader: 'eslint',
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
