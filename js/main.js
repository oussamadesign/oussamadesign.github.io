/* TOGGLE FUNCTION */
jQuery.fn.toggle = function( fn, fn2 ) {
  // Don't mess with animation or css toggles
  if ( !jQuery.isFunction( fn ) || !jQuery.isFunction( fn2 ) ) {
    return oldToggle.apply( this, arguments );
  }
  // migrateWarn("jQuery.fn.toggle(handler, handler...) is deprecated");
  // Save reference to arguments for access in closure
  var args = arguments,
  guid = fn.guid || jQuery.guid++,
  i = 0,
  toggler = function( event ) {
    // Figure out which function to execute
    var lastToggle = ( jQuery._data( this, "lastToggle" + fn.guid ) || 0 ) % i;
    jQuery._data( this, "lastToggle" + fn.guid, lastToggle + 1 );
    // Make sure that clicks stop
    event.preventDefault();
    // and execute the function
    return args[ lastToggle ].apply( this, arguments ) || false;
  };
  // link all the functions, so any of them can unbind this click handler
  toggler.guid = guid;
  while ( i < args.length ) {
    args[ i++ ].guid = guid;
  }
  return this.click( toggler );
};
var btnTop = $('.back-top');

$(document).ready(function() {
  $(".full-height").height($(window).height());

  // MENU TRIGGER -----------------------
  $(".primary-nav").hide();
  $('.menu-trigger').toggle(function(){
      $(".primary-nav").fadeIn(300);
      $(".intro-content").fadeOut(280);
      $("body").addClass('no-scroll');
      $(".menu-trigger i").removeClass('icon-menu');
      $(".menu-trigger i").addClass('icon-cross');

    },
    function(){
      $(".primary-nav").fadeOut(300);
      $(".intro-content").fadeIn(280);
      $("body").removeClass('no-scroll');
      $(".menu-trigger i").removeClass('icon-cross');
      $(".menu-trigger i").addClass('icon-menu');
  });
  // SEARCH TRIGGER -----------------------
  $('.search-btn').toggle(function(){
      $(".search-wrap").fadeIn(300);
      $(".language").hide();
      $(".search-btn i").removeClass('icon-magnifier');
      $(".search-btn i").addClass('icon-cross');

    },
    function(){
      $(".search-wrap").fadeOut(300);
      $(".search-btn i").removeClass('icon-cross');
      $(".language").show();
      $(".search-btn i").addClass('icon-magnifier');
  });

  // SEARCH TRIGGER -----------------------
  
  // jQuery is required to run this code
    scaleVideoContainer();

    initBannerVideoSize('.video-container .poster img');
    initBannerVideoSize('.video-container .filter');
    initBannerVideoSize('.video-container video');

    $(window).on('resize', function() {
      scaleVideoContainer();
      scaleBannerVideoSize('.video-container .poster img');
      scaleBannerVideoSize('.video-container .filter');
      scaleBannerVideoSize('.video-container video');
    });

    // CA SLIDER -----------------------
    $('.ca-slider').owlCarousel({
      center: true,
      items:2,
      loop:true,
      margin:80,
      navigation: true,
      responsive:{
          600:{
              items:2,
              margin:10
          }
      },
      navigationText : ["<i class='icon-arrow-left'></i>","<i class='icon-arrow-right'></i>"]
    });
    // Custom Navigation Events 
  $(".ca-slider-nav .next").on("click", function(){
    $(".ca-slider").trigger('owl.next');
    return false;
  })
  $(".ca-sliders-nav .prev").on("click", function(){
    $(".ca-slider").trigger('owl.prev');
    return false;
  })


  // FORM SCRIPT   ***********************************
  $("#contactForm").validator().on("submit", function (event) {
      if (event.isDefaultPrevented()) {
          // handle the invalid form...
          formError();
          submitMSG(false, "Did you fill in the form properly?");
      } else {
          // everything looks good!
          event.preventDefault();
          submitForm();
      }
  });

  function submitForm(){
      // Initiate Variables With Form Content
      var Fname = $("#firstName").val();
      var Lname = $("#lastName").val();
      var email = $("#email").val();
      var phone = $("#phone").val();
      var website = $("#website").val();
      var message = $("#message").val();

      $.ajax({
          type: "POST",
          url: "email.php",
          data: "name=" + Fname + "&lname=" + Lname + "&email=" + email + "&phone=" + phone + "&website=" + website + "&message=" + message,
          success : function(text){
              if (text == "success"){
                  formSuccess();
              } else {
                  formError();
                  submitMSG(false,text);
              }
          }
      });
  }

  function formSuccess(){
      $("#contactForm")[0].reset();
      submitMSG(true, "Message Submitted!")
  }

  function formError(){
      $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
          $(this).removeClass();
      });
  }

  function submitMSG(valid, msg){
      if(valid){
          var msgClasses = "align-center tada animated text-success";
      } else {
          var msgClasses = "align-center text-danger";
      }
      $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
  }

});

$(window).resize(function(){
  $(".full-height").height($(window).height());
});

$(window).on('load',function() {
  // WOW JS -----------------------------
  wow = new WOW(
    {
    boxClass:     'wow',      // default
    animateClass: 'animated', // default
    offset:       0,          // default
    mobile:       false,       // default
    live:         true        // default
    }
                    )
    wow.init();
  // The slider being synced must be initialized first
  $('#testimonialThumbs').flexslider({
    animation: "slide",
    controlNav: false,
    directionNav: false,
    animationLoop: false,
    slideshow: false,
    itemWidth: 96,
    itemMargin: 5,
    asNavFor: '#testimonialSlider'
  });
 
  $('#testimonialSlider').flexslider({
    animation: "fade",
    controlNav: false,
    directionNav: false,
    animationLoop: false,
    slideshow: false,
    sync: "#testimonialThumbs"
  });
});

function scaleVideoContainer() {
    var height = $(window).height() + 5;
    var unitHeight = parseInt(height) + 'px';
    $('.homepage-hero-module').css('height',unitHeight);
  }

  function initBannerVideoSize(element){
    $(element).each(function(){
      $(this).data('height', $(this).height());
      $(this).data('width', $(this).width());
    });

    scaleBannerVideoSize(element);
  }

  function scaleBannerVideoSize(element) {

    var windowWidth = $(window).width(),
    windowHeight = $(window).height() + 5,
    videoWidth,
    videoHeight;

    // console.log(windowHeight);

    $(element).each(function(){
      var videoAspectRatio = $(this).data('height')/$(this).data('width');

      $(this).width(windowWidth);

      if(windowWidth < 1000){
          videoHeight = windowHeight;
          videoWidth = videoHeight / videoAspectRatio;
          $(this).css({'margin-top' : 0, 'margin-left' : -(videoWidth - windowWidth) / 2 + 'px'});

          $(this).width(videoWidth).height(videoHeight);
      }

      $('.homepage-hero-module .video-container video').addClass('fadeIn animated');

    });
  }
$(window).scroll(function() {
  if ($(window).scrollTop() > 300) {
    btnTop.show();
  } else {
    btnTop.hide();
  }
});

btnTop.on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({scrollTop:0}, '300');
});