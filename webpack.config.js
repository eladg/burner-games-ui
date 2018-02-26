"use strict";
var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    './src/index.jsx', // your app's entry point
    './src/styles/index.scss',
  ],
  devtool: 'source-map',
  output: {
    publicPath: '/',
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      files: {
        css: ['style.css'],
        js: [ "bundle.js"],
      }
    }),
  ]
};