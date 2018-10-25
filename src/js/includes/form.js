/**
 * @file
 * Form alters for accessibility.
 *
 */

($ => {
  // DOC READY
  $(() => {

    // Update Checkbox/Radios format: input nested in the label.
    $('label > input').each(function () {
      $(this).parent()
        .attr('for', $(this).attr('id'))
        .before($(this).detach());
    });

    // Checkbox & Radios focus/blur.
    $('input[type="checkbox"], input[type="radio"]').on({
      focus: function () {
        $(this).siblings('label')
          .addClass('js-focus');
      },
      blur: function () {
        $(this).siblings('label')
          .removeClass('js-focus');
      }
    });

    //Checkbox & Radios hover triggers focus/blur.
    $('input[type="checkbox"] + label, input[type="radio"] + label').on({
      mouseenter: function () {
        $(this).prev('input')
          .focus();
      },
      mouseleave: function () {
        $(this).prev('input')
          .blur();
      }
    });

  });
})(jQuery);
