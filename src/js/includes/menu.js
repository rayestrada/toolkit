/**
 * @file
 * Menu accessibility enhancements and skip links.
 *
 */

(function ($) {
  // DOC READY
  $(function () {

    // Assign target selectors.
    var $nav = $('#navigation > ul.menu');
    var $trig = $('#menu-trigger > a');
    var $toMainContentLink = $('#top');
    var $backToTopLink = $('#bottom');
    var $mobileMenuClass = 'js-show-menu';
    var $kids = $nav.children();

    // Add class for top level menu items.
    $kids.addClass('js-top-level-menu-item');

    // Add class to first and last links in the menu.
    $nav.each(function () {
      $(this).find('a').first().addClass('js-first-menu-item');
      $(this).find('a').last().addClass('js-last-menu-item');
    });

    // Tabbing out of the end menu items.
    $nav.find('a.js-last-menu-item').keydown(function (e) {
      // Tabbed out no shift.
      if (e.which == 9 && !e.shiftKey) {
        outofmenu();
      }
    });
    $nav.find('a.js-first-menu-item').keydown(function (e) {
      // Shift tabbed out.
      if (e.which == 9 && e.shiftKey) {
        outofmenu();
      }
    });

    // Remove focus from menu when you are clicking outside of it.
    $(document).on('click', outofmenu());
    $nav.on('click', function (e) {
      e.stopPropagation();
    });

    // Add class on focus.
    $nav.find('a').on({
      focus: function () {
        $(this).closest('.js-top-level-menu-item').addClass('js-focus')
          .siblings().removeClass('js-focus');
      },
      mouseenter: function () {
        // Let normal hovers override.
        outofmenu();
      }
    });

    // Removes focus class and focus from all menu items.
    function outofmenu() {
      $kids.each(function () {
        $(this).removeClass('js-focus');
        $nav.find('a').blur();
      });
    }

    /**
     * Skip links
     */
    $toMainContentLink.on({
      focus: function () {
        $trig.removeClass('js-return-check');
      },
      click: function () {
        $trig.addClass('js-return-check');
      }
    });
    $backToTopLink.on('focus', function () {
      // Scroll back to top link into view.
      window.scrollTo(0, document.body.scrollHeight);
    });

  });
})(jQuery);
