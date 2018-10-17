/**
 * @file
 * Fancybox
 * Loading and intializing a javascript modal library.
 *
 * Docs: https://fancyapps.com/fancybox/
 */

// Load fancybox library.
import fancybox from 'fancybox'; fancybox(jQuery);
import 'fancybox/dist/css/jquery.fancybox.css';

($ => {
  // DOC READY
  $(() => {

    // Initialize fancybox on a selector.
    $('.fancybox').fancybox({
      // Accessibility edits:
      // Set focus to the modal on show.
      afterShow: function () {
        $(this.wrap).queue(function () {
          $(this).focus();
        });

        // Trigger click of close buton if you tab out.
        $('a.fancybox-close').keydown(function (e) {
          if (e.which == 9 && !e.shiftKey) {
            $(this).trigger('click');
          }
        });
      },
      // Set focus to the trigger on close.
      afterClose: function () {
        $(this.element).focus();
      }
    });

  });
})(jQuery);
