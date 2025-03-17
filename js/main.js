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
    $('.loading-wrap').fadeOut(2000);
    $(".full-height").height($(window).height());
  
    // MENU TRIGGER -----------------------
    //$(".navigation").hide();
    $('.burger-btn').toggle(function(){
        $(".navigation").css({"transform" : "translateX(0)"});
        $(".burger-icon").attr('src','images/media/cross.png');
      },
      function(){
        $(".navigation").css({"transform" : "translateX(120%)"});
        $(".burger-icon").attr('src','images/media/burger.png');
    });
  });

// Contact info box flip effect
document.addEventListener('DOMContentLoaded', function() {
  const contactBtn = document.querySelector('.contact-me-btn');
  const contactInfoBox = document.querySelector('.contact-info-box');
  
  if (contactBtn && contactInfoBox) {
    contactBtn.addEventListener('click', function(e) {
      e.preventDefault();
      contactInfoBox.classList.toggle('flipped');
    });
  }
});