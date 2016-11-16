require('jquery.viewport');
var throttle = require('./throttle');

// Fancybox options https://github.com/1337/jquery_viewport
module.exports = function() {
  // REVEALING CONTENT ON LOAD IN VIEWPORT
  $(window).on('load', function(){
    // hide blocks by default
    $('.f-item-group').addClass('transparent');

    // show blocks that are in the viewport
    $('.transparent:in-viewport').each(function(){
      $(this).removeClass('transparent');
    });
  });

  // REVEALING CONTENT ON SCROLL/RESIZE VIEWPORT
  $(window).on('scroll resize', throttle(function(){
    $('.transparent:in-viewport').each(function(i){
      // show content in staggered fashion setting a delay for each one
      $(this).delay(300*i).queue(function(){
        $(this).removeClass('transparent').dequeue();
      });
    });
  }));
}