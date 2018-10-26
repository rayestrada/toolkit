/**
 * @file
 * Common javascript file for loading scripts.
 *
 */

// Import scripts.
import './includes/table';
import './includes/throttle';
import './includes/viewport';
import './includes/menu';
import './includes/skip-links';
import './includes/form';
import './includes/loading-button';
// Lazysizes documentation: https://github.com/aFarkas/lazysizes.
import 'lazysizes';

($ => {
  // DOC READY
  $(() => {
    // Place code here or in a includes script file and require above.

    // Example of throttling.
    // $(window).on('resize', throttle(function () {
    //   console.log('resize');
    // }));

  });
})(jQuery);

// Example Drupal behavior.
// - Reinitialize something after an AJAX call.
// - using Drupal settings that are sent from php.
// To understand behaviors, see https://drupal.org/node/756722#behaviors.
// (function ($, Drupal) {
//   Drupal.behaviors.my_custom_behavior = {
//     attach: function (context, settings) {
//       // Do something Drupally
//     }
//   };
// })(jQuery, Drupal);
