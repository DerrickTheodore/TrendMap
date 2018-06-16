const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const app = express();
const router = require('./router.js');

const compiler = webpack(webpackConfig);


app.use(express.static(__dirname + '/public'));
app.use('/search', router);


const server = app.listen(process.env.PORT || 8080, function() {
  const port = server.address().port;
  console.log(`App listening at port ${port}`)
})

module.exports = router;

