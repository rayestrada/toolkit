'use strict';

var path = require('path');
var webpack = require('webpack');
var jQuery = require('jquery');
var glob = require('glob');
var MinifyPlugin = require('babel-minify-webpack-plugin');

var glob_entries = function (globs) {
  var entries = {};
  Object.keys(globs).forEach(function (key) {
    var globPath = globs[key];
    var files = glob.sync(globPath);

    for (var i = 0; i < files.length; i++) {
      var entry = files[i];
      entries[key + '/' + path.basename(entry, path.extname(entry))] = entry;
    }
  });
  return entries;
};

module.exports = function (gulpConfig) {
  var config = {
    entry: glob_entries(gulpConfig.src.scripts),
    output: {
      path: path.resolve(__dirname, gulpConfig.dest),
      filename: '[name].js'
    },
    externals: {
      // Use Jquery as an externally loaded file
      'jquery': 'jQuery'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              modules: true,
              presets: ['es2015']
            }
          }
        },
        {
          test: /\.css$/,
          include: /node_modules/,
          use: { loader: 'style-loader!css-loader' }
        },
        {
          // required for loading images in css from modules using js
          test: /\.(png|jpg|svg|gif)$/,
          include: /node_modules/,
          use: { loader: 'url-loader?limit=20000' } // (20kb) Any file smaller than limit will use data uri instead
        }

      ]
    },
    plugins: [
      // loads jquery within the context of the files and provides it as a global variable for files
      // new webpack.ProvidePlugin({
      //   '$':'jquery',
      //   'jQuery':'jquery',
      //   'window.jQuery':'jquery'
      // })
      new MinifyPlugin()
    ]
  }

  return config;
};
