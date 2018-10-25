/**
 * @file
 * Intializing javascript accordions.
 *
 */

($ => {
  // DOC READY
  $(() => {

    // Set the selectors to target.
    const accordionContainer = '.custom-accordion';
    const accordionContent = '.accordion-content';
    const accordionTrigger = '.accordion-trigger';

    // Initialize the accordions.
    $(accordionContainer).each(function (i) {
      $(this).addClass('js-tm-accordion-enabled');
      if (i > 0) {
        $(this).addClass('js-collapsed')
          .find(accordionContent)
          .slideUp('fast');
      }
    });

    // Initialize onclick behavior.
    $(accordionContainer + ' ' + accordionTrigger + ' a').on('click', function (e) {
      e.preventDefault();
      $(this).closest(accordionContainer)
        .toggleClass('js-collapsed');
      $(this).parent()
        .next(accordionContent)
        .slideToggle('fast');
    });

  });
})(jQuery);
