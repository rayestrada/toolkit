/**
 * @file
 * Menu accessibility enhancements and skip links.
 *
 */

($ => {
  // DOC READY
  $(() => {

    // Assign target selectors.
    const $nav = $('#navigation > ul.menu');
    const $trig = $('#menu-trigger > a');
    const $toMainContentLink = $('#top');
    const $backToTopLink = $('#bottom');
    const $mobileMenuClass = 'js-show-menu';
    const $kids = $nav.children();

    // Removes focus class and focus from all menu items.
    const outofmenu = () => {
      $kids.each(function () {
        $(this).removeClass('js-focus');
        $nav.find('a').blur();
      });
    }

    // Add class for top level menu items.
    $kids.addClass('js-top-level-menu-item');

    // Add class to first and last links in the menu.
    $nav.each(function () {
      $(this).find('a').first().addClass('js-first-menu-item');
      $(this).find('a').last().addClass('js-last-menu-item');
    });

    // Tabbing out of the end menu items.
    $nav.find('a.js-last-menu-item').keydown(e => {
      // Tabbed out no shift.
      if (e.which == 9 && !e.shiftKey) {
        outofmenu();
      }
    });
    $nav.find('a.js-first-menu-item').keydown(e => {
      // Shift tabbed out.
      if (e.which == 9 && e.shiftKey) {
        outofmenu();
      }
    });

    // Remove focus from menu when you are clicking outside of it.
    $(document).on('click', outofmenu());
    $nav.on('click', e => e.stopPropagation());

    // Add class on focus.
    $nav.find('a').on({
      focus: function () {
        $(this).closest('.js-top-level-menu-item').addClass('js-focus')
          .siblings().removeClass('js-focus');
      },
      mouseenter: () => {
        // Let normal hovers override.
        outofmenu();
      }
    });

    /**
     * Skip links
     */
    $toMainContentLink.on({
      focus: () => {
        $trig.removeClass('js-return-check');
      },
      click: () => {
        $trig.addClass('js-return-check');
      }
    });
    $backToTopLink.on('focus', () => {
      // Scroll back to top link into view.
      window.scrollTo(0, document.body.scrollHeight);
    });

  });
})(jQuery);
