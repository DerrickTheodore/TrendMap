const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: path.join(__dirname, 'public/components'),
  entry: [
      './index.js',
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
    ],
  },
  resolve: {
    modules: [
      path.join(__dirname, 'node_modules'),
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'GOOGLE_API_map': JSON.stringify(process.env.GOOGLE_API),
      'GOOGLE_API_translate': JSON.stringify(process.env.GOOGLE_API_translate),
      'TWITTER_API_consumerKey': JSON.stringify(process.env.TWITTER_API_consumerKey),
      'TWITTER_API_consumerSecret': JSON.stringify(process.env.TWITTER_API_consumerSecret),
      'TWITTER_API_accessToken': JSON.stringify(process.env.TWITTER_API_accessToken),
      'TWITTER_API_accessTokenSecret': JSON.stringify(process.env.TWITTER_API_accessTokenSecret),
      'TWITTER_API_APP_Authorization_header_value': JSON.stringify(process.env.TWITTER_API_APP_Authorization_header_value)
    })
  ]
};