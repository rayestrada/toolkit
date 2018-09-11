/**
 * @file
 * Initialize responsive data table solution.
 *
 */

($ => {
  // DOC READY
  $(() => {

    // Initialize on selector.
    $('table.data').each(function () {
      const headerText = [];
      const headers = $(this).find('thead th');
      const tableRows = $(this).find('tbody tr');

      if (headers.length) {
        // Grab headers and put them into array.
        headers.each(function (i) {
          var current = headers[i];
          headerText.push(current.textContent.replace(/\r?\n|\r/, ""));
          // Add class to empty header cells.
          if (!current.textContent) {
            $(this).addClass('js-empty-header-cell');
          }
        });

        // Set attribute on each cell within a row.
        tableRows.each(function () {
          $(this).children().each(function (i) {
            if (headerText[i]) {
              $(this).attr('data-th', headerText[i]).addClass('js-labeled');
            }
          });
        });
      }
    });

  });
})(jQuery);
