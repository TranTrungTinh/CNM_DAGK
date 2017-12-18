const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const config = {
  cache: true,
  entry: './src/process/app.js',
  output: {
    path: path.resolve(__dirname,'public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    modules: ["node_modules"],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: /src/,
        exclude: /node_modules/
      },
      {
        use: ExtractTextPlugin.extract({
          fallback: ['style-loader'],
          use: ['css-loader']
        }),
        test: /\.css$/
      },
      //file-loader(for fonts)
      {
        test: /\.(png|sgv|woff|woff2|eot|ttf|otf)$/,
        loader: "url-loader?limit=8000"
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}

module.exports = config;