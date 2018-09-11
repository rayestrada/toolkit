/**
 * @file
 * Loading and Intializing javascript to animate skip links.
 *
 * Docs: https://github.com/flesler/jquery.scrollTo
 */

// Load scrollto library.
import 'jquery.scrollto';

($ => {
  // DOC READY
  $(() => {

    // Initialize on selector.
    $('.skip-links').on('click', function () {
      const target = $(this).attr('href');
      $.scrollTo(target, 800, {
        onAfter: () => {
          $(target).focus();
        }
      });
    });

  });
})(jQuery);
