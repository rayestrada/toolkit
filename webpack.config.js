'use strict';

var path = require('path');
var webpack = require('webpack');
var glob = require('glob');

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
          // Used for loading css files from modules using js
          test: /\.css$/,
          include: /node_modules/,
          loader: 'style-loader!css-loader'
        },
        {
          // required for loading images in css from modules using js
          test: /\.(png|jpg|svg|gif)$/,
          include: /node_modules/,
          loader: 'url-loader?limit=20000' // (20kb) Any file smaller than limit will use data uri instead
        }
      ]
    }
  };

  if (!gulpConfig.dev) {
    new webpack.optimize.UglifyJsPlugin();
  }

  return config;
};


/**
 * A function to glob entry points to achieve separate output files
 * @param globs
 * @returns {{}}
 */
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
