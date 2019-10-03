( function($) {

  'use strict';
  
  $( function() {
    
    $( '.b-ajax-form' ).each( function() {
      
      var $this = $( this ),
          $form = $this.find( 'form' ),
          $response = $this.find( '.b-ajax-form__response' ),
          $error = $this.find( '.b-ajax-form__error' );
      
      $form.submit( function(e) {
        e.preventDefault();
        
        //validate tel input
        var errorFlag = false;
        $( 'input[ type="tel" ]' ).each( function() {
          
          var $telInput = $( this );
          var telString = $telInput.val();
          var telRegExp = /^[\+]?[0-9]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        
          if ( !telString.match( telRegExp )) {
            $telInput.addClass( 'invalid' );
            errorFlag = true;
          }
          
        });
        
        if ( errorFlag ) {
          return;
        }
        
        //send ajax
        $.ajax({
          url: $form.attr( 'action' ),
          type: $form.attr( 'method' ),
          dataType: "json",
          data: $form.serialize(),
          success: function( data ) {
            
            if ( data && typeof data === 'object' && data.STATUS ) {
              if ( data.STATUS === 'Y' && data.MESSAGE ) {
                $( '#formResponseID-1, #formResponseID-2' ).text( data.MESSAGE );
                $form.hide();
                $error.hide();
                $response.show();
              } else if ( data.STATUS === 'N' && data.MESSAGE ) {
                $form.show();
                $error.show();
                $( '.b-ajax-form__error' ).text( data.MESSAGE );
                $response.hide();
              }
            }
            
          },
          error: function( a, b, c ) {            
            if ( window.console ) {
              console.log(a);
              console.log(b);
              console.log(c);
            }
          }
        });
        
      });
    });
  
    /*if ( window.BX ) {
      BX.addCustomEvent( "onFrameDataReceived", function () {});
    }*/
  });

}( jQuery ));