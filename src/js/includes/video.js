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
    var vid = $("bgvid");
    var pauseButton = $("#polina button");

    if (window.matchMedia('(prefers-reduced-motion)').matches) {
        vid.removeAttr("autoplay");
        vid.pause();
        pauseButton.innerHTML = "Paused";
    }

    function vidFade() {
      vid.addClass("stopfade");
    }

    vid.on('ended', function(){
      // only functional if "loop" is removed 
      vid.pause();
      // to capture IE10
      vidFade();
    }); 

    pauseButton.on("click", function() {
      vid.toggleClass("stopfade");
      if (vid.paused) {
        vid.play();
        pauseButton.innerHTML = "Pause";
      } else {
        vid.pause();
        pauseButton.innerHTML = "Paused";
      }
    })


  });
})(jQuery);
