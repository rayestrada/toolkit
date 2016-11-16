require('owl.carousel');
require('owl.carousel/dist/assets/owl.carousel.min.css');

// DOC READY
$(function (){
  // Owl Carousel
  // Config options here http://www.owlcarousel.owlgraphic.com/docs/api-options.html
  $('.owl-carousel').owlCarousel({
    items: 1,
    loop: true,
    autoplay: true,
    autoplayTimeout: 6000,
    autoplaySpeed: 1000,
    autoplayHoverPause: true,
    nav: true,
    dots: false
  });
});