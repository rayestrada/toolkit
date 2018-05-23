/**
 * @file
 * Intializing javascript accordions.
 *
 */

(function ($) {
  // DOC READY
  $(function () {

    // Set the selectors to target.
    var accordioncontainer = '.custom-accordion',
      accordioncontent = '.accordion-content',
      accordiontrigger = '.accordion-trigger';

    // Initialize the accordions.
    $(accordioncontainer).each(function (i) {
      $(this).addClass('js-tm-accordion-enabled');
      if (i > 0) {
        $(this).addClass('js-collapsed')
          .find(accordioncontent)
          .slideUp('fast');
      }
    });

    // Initialize onclick behavior.
    $(accordioncontainer + ' ' + accordiontrigger + ' a').on('click', function (e) {
      e.preventDefault();
      $(this).closest(accordioncontainer)
        .toggleClass('js-collapsed');
      $(this).parent()
        .next(accordioncontent)
        .slideToggle('fast');
    });

  });
})(jQuery);
