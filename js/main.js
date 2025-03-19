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

// Fade in animation for folio cards
const folioCards = document.querySelectorAll('.folio-card');

const animateCard = (card) => {
    const duration = 1000; // Animation duration in ms (1 second)
    const startTime = performance.now();
    const startOpacity = 0;
    const endOpacity = 1;
    const startY = 20;
    const endY = 0;

    const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (ease-out)
        const easeOut = t => 1 - Math.pow(1 - t, 2);
        const easedProgress = easeOut(progress);

        // Calculate current values
        const currentOpacity = startOpacity + (endOpacity - startOpacity) * easedProgress;
        const currentY = startY + (endY - startY) * easedProgress;

        // Apply the animation
        card.style.opacity = currentOpacity;
        card.style.transform = `translateY(${currentY}px)`;

        // Continue animation if not finished
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    };

    requestAnimationFrame(animate);
};

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add 200ms delay before starting the animation
            setTimeout(() => {
                animateCard(entry.target);
            }, 200);
            observer.unobserve(entry.target); // Stop observing once the card is visible
        }
    });
}, observerOptions);

folioCards.forEach(card => {
    observer.observe(card);
});

// Parallax effect for intro section and footer
const introSection = document.querySelector('.intro');
const footerSection = document.querySelector('.contact-me');

if (introSection) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const speed = 0.4; // Adjust this value to control parallax speed
        const yPos = -(scrolled * speed);
        introSection.style.backgroundPosition = `center ${yPos}px`;
    });
}