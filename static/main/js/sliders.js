$('.carouselExampleSlidesOnly').slick({

      accessibility: true,

      adaptiveHeight: false,

      arrows: false,

      asNavFor: null,

      autoplay: true,

      autoplaySpeed: 3000,

      cssEase: 'ease',

      customPaging: false,

      dots: false,

      dotsClass: 'slick-dots',

      draggable: true,

      easing: 'linear',

      edgeFriction: 0.35,

      fade: false,

      focusOnSelect: false,

      focusOnChange: false,

      infinite: true,

      initialSlide: 0,

      lazyLoad: 'ondemand',

      mobileFirst: false,

      pauseOnHover: false,

      pauseOnFocus: true,

      pauseOnDotsHover: false,

      respondTo: 'window',

      responsive: [{

              breakpoint: 1024,
              settings: {

                  slidesToShow: 1,

                  infinite: true

              }

          },

          {
              breakpoint: 5000,

              settings: {

                  slidesToShow: 1,

                  slidesPerRow: 1,

                  infinite: true

              }

          },
          {

              breakpoint: 600,

              settings: {

                  slidesToShow: 1,

                  slidesPerRow: 1,

                  infinite: true

              }

          }, {

              breakpoint: 300,

              settings: "unslick" // destroys slick

          }
      ],



      rows: 1,

      rtl: false,
      slide: '',

      slidesToShow: 1,

      slidesPerRow: 1,

      speed: 500,

      swipe: true,

      swipeToSlide: false,

      touchMove: true,

      touchThreshold: 5,

      useCSS: true,

      useTransform: true,

      variableWidth: false,

      vertical: false,

      verticalSwiping: false,

      waitForAnimate: true,

      zIndex: 1000

  });

  /*$(".carouselExampleSlidesOnly").owlCarousel({
    autoPlay: 5000, //Set AutoPlay to 5 seconds
    loop: true,
    items : 1,
    nav:false,
  pagination: false,
  rewindNav:true,
  rewindSpeed: 0,
  responsiveClass: true,
  responsive:{
    480:{
      items:1,
      loop:true
    },
    767:{
      items:1,
      loop:true
    },
    992:{
      items:1,
      loop:true
    },
    1199:{
      items:1,
      loop:true
    }
  }
 
});*/

  /* AUCTIONS CAROUSEL */

  $(".auctions").slick({
     centerMode: false,
      autoplay: true,
      dots: false,
      prevArrow: false,
      infinite: true,
      nextArrow: false,
      lazyLoad: 'ondemand',
      slidesToShow: 1,
      responsive: [{
      
          breakpoint: 768,
          settings: {
              dots: false,
              arrows: false,
              infinite: true,
              slidesToShow: 1,
              slidesToScroll: 1
          }
      }]
  });

$('.product').slick({

      accessibility: true,

      adaptiveHeight: false,

      arrows: false,

      asNavFor: null,

      autoplay: true,

      autoplaySpeed: 3000,

      centerMode: true,

      centerPadding: '300px',

      cssEase: 'ease',

      customPaging: false,

      dots: false,

      dotsClass: 'slick-dots',

      draggable: true,

      easing: 'linear',

      edgeFriction: 0.35,

      fade: false,

      focusOnSelect: false,

      focusOnChange: false,

      infinite: true,

      initialSlide: 0,

      lazyLoad: 'ondemand',

      mobileFirst: false,

      pauseOnHover: false,

      pauseOnFocus: true,

      pauseOnDotsHover: false,

      respondTo: 'window',

      responsive: [{

              
              breakpoint: 1024,
              settings: {

                  slidesToShow: 1,
                  centerMode: false,
                  infinite: true

              }

          },

          {
              breakpoint: 5000,

              settings: {

                  slidesToShow: 1,

                  slidesPerRow: 1,

                  centerMode: true,

                  centerPadding: '400px',

                  infinite: true

              }

          },
          {
          
              breakpoint: 600,

              settings: {

                  slidesToShow: 1,

                  slidesPerRow: 1,

                  infinite: true,
                  centerMode: false,

              }

          }, 
            {
             breakpoint: 992,
              settings: {

                  slidesToShow: 1,
                  centerMode: false,
                  infinite: true

              }

          },
                   {

              breakpoint: 300,

              settings: "unslick" // destroys slick

          }
      ],



      rows: 1,

      rtl: false,
      slide: '',

      slidesToShow: 1,

      slidesPerRow: 1,

      speed: 500,

      swipe: true,

      swipeToSlide: false,

      touchMove: true,

      touchThreshold: 5,

      useCSS: true,

      useTransform: true,

      variableWidth: true,

      vertical: false,

      verticalSwiping: false,

      waitForAnimate: true,

      zIndex: 1000

  });

      $(".slider").slick({
      centerMode: false,
      autoplay: true,
      dots: false,
      prevArrow: false,
      infinite: true,
      nextArrow: false,
      lazyLoad: 'ondemand',
      slidesToShow: 6,
      responsive: [{
      
          breakpoint: 768,
          settings: {
              dots: false,
              arrows: false,
              infinite: true,
              slidesToShow: 3,
              slidesToScroll: 1
          }
      }]
  });

  /* ARTIST CAROUSEL */

  $('.artists-slider').slick({
      centerMode: false,
      autoplay: true,
      dots: false,
      prevArrow: false,
      infinite: true,
      nextArrow: false,
      lazyLoad: 'ondemand',
      slidesToShow: 5,
      slidesToScroll: 1,
      responsive: [{
      
          breakpoint: 768,
          settings: {
              dots: false,
              arrows: false,
              infinite: true,
              slidesToShow: 2,
              slidesToScroll: 1
          }
      }]

  });

  $(".sliders").slick({
      centerMode: false,
      autoplay: true,
      dots: false,
      prevArrow: false,
      infinite: true,
      nextArrow: false,
      lazyLoad: 'ondemand',
      slidesToShow: 1,
      responsive: [{
      
          breakpoint: 768,
          settings: {
              dots: false,
              arrows: false,
              infinite: true,
              slidesToShow: 1,
              slidesToScroll: 1
          }
      }]
  });

$("#artists").slick({

      centerMode: false,
      autoplay: true,
      dots: false,
      prevArrow: false,
      infinite: true,
      nextArrow: false,
      lazyLoad: 'ondemand',
      slidesToShow: 1,
      responsive: [{
      
          breakpoint: 768,
          settings: {
              dots: false,
              arrows: false,
              infinite: true,
              slidesToShow: 1,
              slidesToScroll: 1
          }
      }]
     
  });

$('.demo').slick({

        accessibility: true,

        adaptiveHeight: false,

        arrows: false,

        asNavFor: null,

        autoplay: true,

        autoplaySpeed: 3000,

        centerMode: false,


        cssEase: 'ease',

        customPaging: false,

        dots: false,

        dotsClass: 'slick-dots',

        draggable: true,

        easing: 'linear',

        edgeFriction: 0.35,

        fade: false,

        focusOnSelect: false,

        focusOnChange: false,

        infinite: true,

        initialSlide: 0,

        lazyLoad: 'ondemand',

        mobileFirst: false,

        pauseOnHover: false,

        pauseOnFocus: true,

        pauseOnDotsHover: false,

        respondTo: 'window',

        responsive: [{

            breakpoint: 1024,
            settings: {

                slidesToShow: 3,

                infinite: true

            }

        }, {

            breakpoint: 600,

            settings: {

                slidesToShow: 1,

                slidesPerRow: 2,

                infinite: true

            }

        }, {

            breakpoint: 300,

            settings: "unslick" // destroys slick

        }],



        rows: 1,

        rtl: false,
        slide: '',

        slidesToShow: 1,

        slidesPerRow: 4,

        speed: 500,

        swipe: true,

        swipeToSlide: false,

        touchMove: true,

        touchThreshold: 5,

        useCSS: true,

        useTransform: true,

        variableWidth: false,

        vertical: false,

        verticalSwiping: false,

        waitForAnimate: true,

        zIndex: 1000

    });

    $('.auctions').slick({

        accessibility: true,

        adaptiveHeight: false,

        arrows: false,

        asNavFor: null,

        autoplay: true,

        autoplaySpeed: 6000,

        centerMode: false,


        cssEase: 'ease',

        customPaging: false,

        dots: false,

        dotsClass: 'slick-dots',

        draggable: true,

        easing: 'linear',

        edgeFriction: 0.35,

        fade: false,

        focusOnSelect: false,

        focusOnChange: false,

        infinite: true,

        initialSlide: 0,

        lazyLoad: 'ondemand',

        mobileFirst: false,

        pauseOnHover: false,

        pauseOnFocus: true,

        pauseOnDotsHover: false,

        respondTo: 'window',

        responsive: [{

            breakpoint: 1024,
            settings: {

                slidesToShow: 1,

                infinite: true

            }

        }, {

            breakpoint: 600,

            settings: {

                slidesToShow: 1,

                slidesPerRow: 1,

                infinite: true

            }

        }, {

            breakpoint: 300,

            settings: "unslick" // destroys slick

        }],



        rows: 1,

        rtl: false,
        slide: '',

        slidesToShow: 1,

        slidesPerRow: 1,

        speed: 500,

        swipe: true,

        swipeToSlide: false,

        touchMove: true,

        touchThreshold: 5,

        useCSS: true,

        useTransform: true,

        variableWidth: false,

        vertical: false,

        verticalSwiping: false,

        waitForAnimate: true,

        zIndex: 1000

    });

  /*$('#new_arrivals').slick({
      autoPlay: 3000, //Set AutoPlay to 3 seconds
      loop: true,
      items: 8,
      responsiveClass: true,
      nav: false,
      responsive: {
          1366: {
              items: 5,
              nav: false,
          },
          1440: {
              items: 6,
              nav: false,
          }
      }

  });*/
/*var count1 = 1;
var count2 = 1;
var count3 = 1;
var count4 = 1;
var count5 = 1;
if(count1 < 5) {
$('#desktop-view .carouselExampleSlidesOnly .slick-list .slick-track').children('.slick-slide').each(function() {
      $(this).clone().appendTo('#desktop-view .carouselExampleSlidesOnly .slick-list .slick-track')
      count1++;
  });
}
if(count2 < 5) {
  $('#mobile-view .carouselExampleSlidesOnly .slick-list .slick-track').children('.slick-slide').each(function() {
      $(this).clone().appendTo('#mobile-view .carouselExampleSlidesOnly .slick-list .slick-track')
      count2++
  });
}
if(count3 < 5) {
  $('#desktop-view .product .slick-list .slick-track').children('.slick-slide').each(function() {
      $(this).clone().appendTo('#desktop-view .product .slick-list .slick-track')
      count3++
  });
}

if(count4 < 5) {
  $('#mobile-view .product .slick-list .slick-track').children('.slick-slide').each(function() {
      $(this).clone().appendTo('#mobile-view .product .slick-list .slick-track')
      count4++
  });
}

if(count5 < 5) {
$('.sliders .slick-list .slick-track').children('.slick-slide').each(function() {
      $(this).clone().appendTo('.sliders .slick-list .slick-track')
    count5++
  });
}

$('.slider .slick-list .slick-track').children('.slick-slide').each(function() {
      $(this).clone().appendTo('.slider .slick-list .slick-track')

  });


  $('.slick-cloned').remove()*/