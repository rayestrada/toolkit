// Accordion styling functionality and animation
module.exports = function() {
  $('.custom-accordion').each(function(i){
    $(this).addClass('enabled');
    if (i > 0) {
      $(this).addClass('collapsed').find('.accordion-content').slideUp('fast');
    }
  });

  $('.custom-accordion h3.accordion-trigger a').click(function(e){
    e.preventDefault();
    $(this).closest('.custom-accordion').toggleClass('collapsed');
    $(this).parent().next('.accordion-content').slideToggle('fast');
  });
}