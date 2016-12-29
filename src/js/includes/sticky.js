// Sticky
// @TODO Work in progress create a coordinate tracker for load and resize
module.exports = function() {
  // for an onload event
  // I think we need to create a static coordinate tracker here by inserting markup and getting it's coordinates for load and resize
  // That way we accidently get altered coordinates after the stickt item has moved

  $(window).on('load scroll resize', function(){
    var tmsticky = $('.tm-sticky'),
      tmstickyanchor = $('.owl-carousel'),
      tmstickyoffset = 30,
      scrolltop = $(window).scrollTop(),
      stickycoord = tmsticky.offset(),
      anchorcoord = tmstickyanchor.offset(),
      anchorpoint = anchorcoord.top - tmsticky.height();

    if (scrolltop > stickycoord.top - tmstickyoffset) {
      tmsticky.css({
        'position': 'fixed',
        'top':  (scrolltop + tmstickyoffset) + 'px',
        'z-index': 10
      });
    }
  });
}