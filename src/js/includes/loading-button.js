/**
 * @file
 * Adding SVG loading animation to button
 */

(function ($) {
  // DOC READY
  $(function () {

    // When loading button clicked, add the .load-triggered class to the button
    $('.loading-button').removeClass('load-triggered').on('click', function () {
      $(this).addClass('load-triggered');
    });

  });
})(jQuery);
