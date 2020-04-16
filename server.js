const express = require('express');
const webpack = require('webpack');
const compression = require('compression');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.const shouldCompress = (req, res) => {
 
// const shouldCompress = (req, res) => {
//   if (req.headers['x-no-compression']) {
//     // don't compress responses if this request header is present
//     return false;
//   }

//   // fallback to standard compression
//   return compression.filter(req, res);
// };
app.use(compression());
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
}));

app.listen(8080, function () {
  console.log('Listening on port 8080!\n');
});