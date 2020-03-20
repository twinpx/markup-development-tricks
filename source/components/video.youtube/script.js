( function($) {

  'use strict';
  
  $( function() {
    
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    
    var $playerElems = $( '.b-video-yt' );
    var playerObject = {};

    window.onYouTubeIframeAPIReady = function() {
      
      $playerElems.each( function() {
        var $elem = $( this );
        playerObject[ $elem.attr( 'id' )] = new YT.Player( $elem.attr( 'id' ), {
          height: $elem.data( 'height' ),
          width: $elem.data( 'width' ),
          videoId: $elem.data( 'videoid' ),
          playerVars: {
            'controls': 0,
            'modestbranding': 1,
            'rel': 0,
            'showinfo': 0,

						'playlist': $elem.data("videoid"),
						'loop': 1
          },
          events: {
            'onReady': function( event ) {
              onPlayerReady( event, playerObject[ $elem.attr( 'id' )] );
            }
          }
        });
      });
      
    };

    function onPlayerReady( event, player ) {
      player.mute();
      event.target.playVideo();
      setTimeout(function() {
				$('.b-yt-shutter').remove();
			}, 500);
    }
  
    /*if ( window.BX ) {
      BX.addCustomEvent( "onFrameDataReceived", function () {});
    }*/
  });

}( jQuery ));