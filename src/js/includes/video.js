/**
 * @file
 * Initialize background video fallback
 *
 * Docs: https://codepen.io/dudleystorey/pen/knqyK
 *
 */

(function ($) {
  // DOC READY
  $(function () {

    // Initialize on selector.
    var $vid = $("div.background-video video");
    var $pauseButton = $("button.background-video__pause");

    if (window.matchMedia('(prefers-reduced-motion)').matches) {
        $vid.removeAttr("autoplay");
        $vid.get(0).pause();
        $pauseButton.text('Paused');
    }

    function vidFade() {
      $vid.addClass("stopfade");
    }

    $vid.on('ended', function(){
      // only functional if "loop" is removed 
        $vid.get(0).pause();
      console.log('that');
      // to capture IE10
      vidFade();
    }); 

    $pauseButton.on("click", function() {
      $vid.toggleClass("stopfade");
      console.log('this');
      if ($vid.get(0).paused) {
        $vid.get(0).play();
        $pauseButton.text('Pause');
      } else {
        $vid.get(0).pause();
        $pauseButton.text('Paused');
      }
    })


  });
})(jQuery);
