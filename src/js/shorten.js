/**
 * @file
 * Loading and Intializing javascript to shorten text by character count.
 *
 * Docs: https://github.com/rayestrada/jquery.shorten
 */

// Load shorten library.
import 'jquery-shorten-plus';

($ => {
  // DOC READY
  $(() => {

    // Initialize on selector.
    $('.shorten').shorten();

  });
})(jQuery);