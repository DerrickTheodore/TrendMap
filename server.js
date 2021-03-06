const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const app = express();
const router = require('./router.js');
const path = require('path');

const compiler = webpack(webpackConfig);


app.use(express.static(__dirname + '/public'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/search', router);
app.get('/*', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')))


const server = app.listen(process.env.PORT || 8080, function() {
  const port = server.address().port;
  console.log(`App listening at port ${port}`)
})

module.exports = router;

