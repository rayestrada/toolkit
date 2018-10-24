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

    // object-fit polyfill run
    // objectFitImages();

    /* init Jarallax */
    $('.jarallax').jarallax({
        speed: 0.2
    });

  });
})(jQuery);
