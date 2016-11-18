require('fancybox')($);
require('fancybox/dist/css/jquery.fancybox.css');

// http://fancyapps.com/fancybox/
// DOC READY
$(function (){
  $('.fancybox').fancybox({
    // Accessibility
    // Set focus to the modal on show
    afterShow: function() {
      $(this.content).focus();
    },
    // Set focus to the trigger on close
    afterClose : function() {
      $(this.element).focus();
    }
  });
});