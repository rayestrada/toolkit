/**
 * @file
 * Intializing javascript equal heights.
 *
 * Docs: https://github.com/liabru/jquery-match-height
 */

// Load equal heights library.
import 'jquery-match-height';

($ => {
  // DOC READY
  $(() => {

    // Initialize equal heights on a selector.
    $('.eqheight').matchHeight();

  });
})(jQuery);
