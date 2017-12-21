const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const app = express();

const compiler = webpack(webpackConfig);

app.use(express.static(__dirname + '/www'));

const server = app.listen(4568, function() {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Google Map Practice app listening at http://%s:%s',
  host, port);
})

