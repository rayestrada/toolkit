var path = require('path');
var webpack = require('webpack');

module.exports = function(gulpConfig) {
 var config = {
   entry: {
     'js/script': gulpConfig.src.scripts.trestle,
     'fabricator/js/fabricator': gulpConfig.src.scripts.fabricator
   },
   output: {
     path: path.resolve(__dirname, gulpConfig.dest),
     filename: '[name].js'
   },
   module: {
     loaders: [
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
         loader: 'url-loader?limit=10000' // (10kb) Any file smaller than limit will use data uri instead
       }
     ]
   },
   plugins: [
     // loads jquery and provides it as a global variable for js files
     new webpack.ProvidePlugin({
       '$':'jquery',
       'jQuery':'jquery',
       'window.jQuery':'jquery'
     })
  ]
 }

  if (!gulpConfig.dev) {
    config.plugins.push(
      new webpack.optimize.UglifyJsPlugin()
    );
  }

  return config;
};