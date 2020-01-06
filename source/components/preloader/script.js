( function($) {

  'use strict';
  
  $( function() {
    
    $( '.b-color-preloader-button' ).click( function(e) {
      e.preventDefault();
      appendPreloader( 'color1', '#container' );
    });
    
    $( '.b-white-preloader-button' ).click( function(e) {
      e.preventDefault();
      appendPreloader( 'white', '#container' );
    });
    
    $( '.b-black-preloader-button' ).click( function(e) {
      e.preventDefault();
      appendPreloader( 'black', '#container' );
    });
    
    function appendPreloader( type, container ) {
      type = type || 'color1';
      var $preloader = $( '#circlePreloader .preloader-wrapper' )
                        .clone()
                        .find( '.spinner-layer' )
                        .addClass( 'spinner-' + type )
                        .end()
                        .appendTo( container );
    }
  
    /*if ( window.BX ) {
      BX.addCustomEvent( "onFrameDataReceived", function () {});
    }*/
  });

}( jQuery ));