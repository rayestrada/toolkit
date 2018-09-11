/**
 * @file
 * Loading and Intializing javascript viewport tracking.
 *
 * Docs: https://github.com/1337/jquery_viewport
 */

// Load the viewport library.
import 'jquery.viewport';
import throttle from './throttle'; 

($ => {
  // DOC READY
  $(() => {

    // Revealing content on load in viewport.
    $(window).on('load', () => {
      // Hide blocks by default.
      $('.f-item-group').addClass('js-transparent');

      // Show blocks that are in the viewport.
      $('.js-transparent:in-viewport').each(function () {
        $(this).removeClass('js-transparent');
      });
    });

    // Revealing content on scroll/review viewport.
    $(window).on('scroll resize', throttle(() => {
      $('.js-transparent:in-viewport').each(function (i) {
        // Show content in staggered fashion setting a delay for each one.
        $(this).delay(100 * i).queue(function () {
          $(this).removeClass('js-transparent').dequeue();
        });
      });
    }));

  });
})(jQuery);
