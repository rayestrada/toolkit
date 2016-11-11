// // Example of markup format
// <div class="custom-accordion">
//   <h3 class="accordion-trigger"><a href='#'>Accordion Trigger</a></h3>
//   <div class="accordion-content">Accordion Content</div>
// </div>

module.exports = function() {
  // Accordion styling functionality and animation
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