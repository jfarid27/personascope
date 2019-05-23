const path = require('path');
const config = require('./webpack.config.js');
const _ = require('lodash');

module.exports = _.extend(config, {
  watch: true,
  mode: 'development',
  devtool: 'eval-source-map',
});
