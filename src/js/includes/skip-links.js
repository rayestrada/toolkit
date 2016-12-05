require('jquery.scrollto');

// animated anchor links
module.exports = function () {
  $('.skip-links').click(function () {
    var target = $(this).attr('href');
    $.scrollTo(target, 800, {
      onAfter: function () {
        $(target).focus();
      }
    });
  });
}