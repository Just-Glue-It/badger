const merge = require('webpack-merge');
const commonConfig = require('./webpack-com.config.js');

module.exports = merge(commonConfig, {
  debug: true,
  devtool: 'source-map',
  profile: false,
  watch: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
  },
  devServer: {
    port: 2020,
    hot: true,
    inline: true,
    historyApiFallback: true,
    colors: true,
    stats: 'normal'
  }
});
