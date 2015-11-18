var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: {
    app: './src/main.js',
  },
  output: {
    filename: './dist/app.js',
    publicPath: '/',
    path: __dirname
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /build|lib|node_modules/,
      loaders: ['babel']
    }, {
      test: /\.json$/,
      // exclude: /build|lib|node_modules/,
      loaders: ['json']
    }],
    preLoaders: [
      { test: /\.js$/, loader: 'eslint', exclude: /build|lib|node_modules/ },
    ]
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
