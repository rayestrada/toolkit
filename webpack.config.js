'use strict';

const path = require('path');

module.exports = function (gulpConfig) {
  const config = {
    mode: gulpConfig.dev ? 'development' : 'production',
    entry: gulpConfig.src.scripts_webpack,
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
              presets: [
                [
                  '@babel/preset-env'
                ]
              ]
            }
          }
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          // required for loading images in css from modules using js
          test: /\.(png|jpg|svg|gif)$/,
          include: /node_modules/,
          use: {loader: 'url-loader?limit=20000'} // (20kb) Any file smaller than limit will use data uri instead
        }
      ]
    }
  };

  return config;
};
