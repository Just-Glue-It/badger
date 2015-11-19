const vendorModules = /(node_modules)/;

module.exports = {
  target: 'web',
  entry: {
    app: './src/main.js',
    vendor: require('./src/vendor.js'),
  },
  output: {
    filename: './dist/app.js',
    publicPath: '/app',
    path: __dirname
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: vendorModules,
        loader: 'babel',
        query: {
          env: {
            development: {
              plugins: []
            }
          }
        }
      }
    ]
  }
};
