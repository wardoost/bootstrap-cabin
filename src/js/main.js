// Functions for the gallery
var activityIndicatorOn = function() {
  $('<div id="imagelightbox-loading"><i class="fa fa-refresh fa-spin"></i></div>').appendTo( 'body' );
},
activityIndicatorOff = function() {
  $('#imagelightbox-loading').fadeOut( 350, function() {
    $(this).remove();
  });
},

overlayOn = function() {
  $('<div id="imagelightbox-overlay"></div>').appendTo( 'body' );
},
overlayOff = function() {
  $('#imagelightbox-overlay').fadeOut( 350, function() {
    $(this).remove();
  });
},

navigationOn = function(instance, selector) {
  var images = $( selector );
  if( images.length ) {
    var nav = $( '<div id="imagelightbox-nav"></div>' );
    for( var i = 0; i < images.length; i++ )
      nav.append( '<a href="#"></a>' );

    nav.appendTo( 'body' );
    nav.on( 'click touchend', function(){ return false; });

    var navItems = nav.find( 'a' );
    navItems.on( 'click touchend', function()
    {
      var $this = $( this );
      if( images.eq( $this.index() ).attr( 'href' ) != $( '#imagelightbox' ).attr( 'src' ) )
        instance.switchImageLightbox( $this.index() );

      navItems.removeClass( 'active' );
      navItems.eq( $this.index() ).addClass( 'active' );

      return false;
    })
    .on( 'touchend', function(){ return false; });
  }
},
navigationUpdate = function(selector) {
  var items = $( '#imagelightbox-nav a' );
  items.removeClass( 'active' );
  items.eq( $( selector ).filter( '[href="' + $( '#imagelightbox' ).attr( 'src' ) + '"]' ).index( selector ) ).addClass( 'active' );
},
navigationOff = function() {
  $( '#imagelightbox-nav' ).fadeOut( 350, function() {
    $(this).remove();
  });
},

captionOn = function() {
  var description = $( 'a[href="' + $( '#imagelightbox' ).attr( 'src' ) + '"] img' ).attr( 'alt' );
  if( description.length > 0 )
    $( '<div id="imagelightbox-caption">' + description + '</div>' ).appendTo( 'body' );
},
captionOff = function() {
  $( '#imagelightbox-caption' ).fadeOut( 350, function() {
    $(this).remove();
  });
},

createFullscreenGallery = function(selector){
  var $selector = selector;
  // Check if images have retina equivalent
  $selector.each(function() {
    var $obj = $(this);

    // Wrap image in link
    $obj.wrap($("<a/>")
      .attr("href", $obj.attr('src'))
      .attr("data-imagelightbox", "markdown-gallery")
    );

    // Add notification that image can be tapped
    $obj.parent().parent().addClass("openImgContainer");
    $obj.parent().after("<p class='openImg'><i class='fa fa-hand-o-up'></i></p>");
  });

  // Create gallery
  $("a[data-imagelightbox='markdown-gallery']");
  var selectorE = 'a[data-imagelightbox="markdown-gallery"]';
  var instanceE = $( selectorE ).imageLightbox(
  {
    animationSpeed: 350,    
    preloadNext:    true,   // silently preload the next image
    enableKeyboard: true,   // enable keyboard shortcuts (arrows Left/Right and Esc)
    quitOnImgClick: false,   // quit when the viewed image is clicked
    quitOnDocClick: true,   // quit when anything but the viewed image is clicked
    onStart:        function() { overlayOn(); navigationOn( instanceE, selectorE );},
    onEnd:          function() { activityIndicatorOff(); overlayOff(); navigationOff(); captionOff();},
    onLoadStart:    function() { activityIndicatorOn(); captionOff();},
    onLoadEnd:      function() { navigationUpdate( selectorE ); activityIndicatorOff(); captionOn();},
  });
},

getOrientation = function(img, threshold){
  threshold = threshold || 0.3;
  var $img = img;

  var width = $img.width();
  var height = $img.height();

  if(width > height * (1 + threshold)) { 
    return "landscape"; 
  } else if(width * (1 + threshold) < height) {
    return "portrait";
  } else{
    return "square";
  }
};

/* ON PAGE LOAD */

$(function() {
    
  // For all markdown images in posts
  $('.post-body.markdown img').each(function() {
    // Add class to stretch images to the edges on mobile
    $(this).parent().addClass('mobileFullWidth');
    // Add class which represents the orientation of the image
    $(this).addClass(getOrientation($(this)));
  });

  // Create span element wrapping links with 3d rolling animation
  $('.post-body.markdown a, h1.post-title').each(function() {
    if(!$(this).has('*').length) $(this).addClass('link3D').wrapInner('<span  data-title="' + $(this).text() + '"></span>');
  });

  var $selector = '.post-body.markdown img';
  var $totalImgs = $selector.length;
  var $callback;
  var $callbackArg;

  if(Modernizr.touch){
    $callback = createFullscreenGallery;
    $callbackArg = $('.post-body.markdown img');
  }

  // Check if images have retina equivalent
  $($selector.retina)({ selector: $selector, });

  // Place social icons
  if($("#shb").length > 0) {
    SHB.build({
      elementID: 'shb',

      pref: {
        btnSizeClass: 'btn-sm',
      },

      buttons: {
        fbShare: true,
        tweet: true,
        plusShare: true,
        linkedInShare: true,
        pinterest: true
      }
    });
  }

  // Add slide animation to bootstrap dropdown
  $('.dropdown').on('show.bs.dropdown', function(e){
    $(this).find('.dropdown-menu').first().stop(true, true).slideDown();
  });
  $('.dropdown').on('hide.bs.dropdown', function(e){
    $(this).find('.dropdown-menu').first().stop(true, true).slideUp();
  });

});