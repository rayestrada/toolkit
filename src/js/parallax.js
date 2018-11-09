/**
 * @file
 * Loading and Intializing javascript jarallax tracking.
 *
 * Docs: https://www.npmjs.com/package/jarallax
 */

// Load the jarallax library.
require('jarallax/dist/jarallax.min.js');

(function ($) {
  // DOC READY
  $(function () {

    var $desktop = $(window).width() > 1020;

    if ($desktop) {

      // init Jarallax
      $('.parallax').jarallax({
        speed: 0.2,
        disableParallax: '/iPad|iPhone|iPod|Android/'
      });
      
    }

  });
})(jQuery);
