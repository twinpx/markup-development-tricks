( function($) {

  'use strict';
  
  $( function() {
    
    setTimeout( function() {
      $( '.b-file-card' ).addClass( 'i-loaded' );
    }, 500);
  
    /*if ( window.BX ) {
      BX.addCustomEvent( "onFrameDataReceived", function () {});
    }*/
  });

}( jQuery ));