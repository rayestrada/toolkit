// declare files as variables so we can initialize them later
var eqheights = require('./includes/eqheights');
var accordion = require('./includes/accordion');
var table = require('./includes/table');
var throttle = require('./includes/throttle');
var fancybox = require('./includes/fancybox');
var cookies = require('./includes/cookies');
var carousel = require('./includes/carousel');

// import modernizr
require('./includes/modernizr.min.js');

// DOC READY
$(function (){
  new eqheights();
  new accordion();
  new fancybox();
  new cookies();
  new carousel();

  // Example of using throttle
  // $(window).on('resize', throttle(function () {
  //   console.log('resize');
  // }));
});