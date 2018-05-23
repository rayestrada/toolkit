/**
 * @file
 * Intializing javascript to make tabs.
 *
 */

(function ($) {
  // DOC READY
  $(function () {

    // Assign target selectors.
    var tabcontainer = '.tm-tabs',
      tabcontent = '.tab-content',
      tablabel = '.tab-label';

    // Prepare the tabs for interaction.
    $(tabcontainer).each(function () {
      // add class to provide default state
      $(this).addClass('js-tab-enabled');

      $(this).find(tablabel).addClass('js-tab-label');

      // Empty string to append tab links.
      var tablinks = '';

      // Loop through tab content.
      $(this).find(tabcontent).each(function (i) {
        var tablink = '<a href="#" data-tab="js-tab-number-' + i + '">' + $(this).find(tablabel).text() + '</a>';

        if (i > 0) {
          // Hide the tab content that is not the first one.
          $(this).addClass('js-tab-hide');
          tablink = '<li>' + tablink + '</li>';
        }
        else {
          // Make the first tab link active.
          tablink = '<li class="js-active">' + tablink + '</li>';
        }

        tablinks += tablink;

        // Add an index specific class to content.
        $(this).addClass('js-tab-content').addClass('js-tab-number-' + i);
      });

      // Add the tablinks to the markup.
      $(this).prepend('<ul class="js-tab-links">' + tablinks + '</ul>');
    });


    // Trigger click events on the tabs we created.
    $('.js-tab-links a').click(function (e) {
      e.preventDefault();
      var $tab = $(this).data('tab');

      // Track active state of the tabcontent.
      $(this).closest(tabcontainer).find(tabcontent).addClass('js-tab-hide');
      $(this).closest(tabcontainer).find('.' + $tab).removeClass('js-tab-hide');

      // Track active state of the links.
      $(this).parent().siblings().removeClass('js-active');
      $(this).parent().addClass('js-active');

    });

  });
})(jQuery);
