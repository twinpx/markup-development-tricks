( function($) {

  'use strict';
  
  $( function() {
    
    //local
    var player = new Plyr( '#player', {
      controls: false,
      autoplay: true
    });

    player.on( 'canplay', function(e) {
      $( '.b-plyr' ).addClass( 'i-canplay' );
    });
    
    //youtube
    var playerYt = new Plyr( '#playerYt', {
      controls: false,
      autoplay: true
    });

    playerYt.on( 'ready', function(e) {
      $( '.b-plyr-yt' ).addClass( 'i-canplay' );
    });
  
    /*if ( window.BX ) {
      BX.addCustomEvent( "onFrameDataReceived", function () {});
    }*/
  });

}( jQuery ));