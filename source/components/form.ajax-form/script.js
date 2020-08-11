( function($) {

  'use strict';
  
  $( function() {
    
    $( '.b-ajax-form' ).each( function() {
      
      var $this = $( this ),
          $form = $this.find( 'form' ),
          $response = $this.find( '.b-ajax-form__response' ),
          $error = $this.find( '.b-ajax-form__error' ),
          $submitButton = $form.find( '.btn[ type=submit ]' );
          
      if ( $.fn.mask ) {
        $form.find( '#tel' ).mask( '+9 (999) 999 99 99' );
      }
      
      $submitButton.click( function(e) {
        var errorFlag = false;
        
        //validate name input
        $form.find( 'input[ type="text" ]' ).each( function() {
          var $textInput = $( this );
          
          if ( $.trim( $textInput.val()) === '' ) {
            $textInput.closest( '.input-field' ).addClass( 'invalid' );
            errorFlag = true;
          } else {
            $textInput.closest( '.input-field' ).removeClass( 'invalid' );
          }
          
        });
        
        //validate email input
        $form.find( 'input[ type="email" ]' ).each( function() {
          
          var $emailInput = $( this );
          var emailString = $emailInput.val();
          var emailRegExp = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i;
        
          if ( !emailString.match( emailRegExp )) {
            $emailInput.closest( '.input-field' ).addClass( 'invalid' );
            errorFlag = true;
          } else {
            $emailInput.closest( '.input-field' ).removeClass( 'invalid' );
          }
          
        });
        
        //validate tel input
        $form.find( 'input[ type="tel" ]' ).each( function() {
          
          var $telInput = $( this );
          var telString = $telInput.val();
          var telRegExp = /^[\+]?[0-9]?\s?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9\s]{4,6}$/im;
        
          if ( !telString.match( telRegExp )) {
            $telInput.closest( '.input-field' ).addClass( 'invalid' );
            $telInput.siblings( 'label' ).addClass( 'active' );
            errorFlag = true;
          } else {
            $telInput.closest( '.input-field' ).removeClass( 'invalid' );
          }
          
        });
        
        if ( errorFlag ) {
          e.preventDefault();
          $form.find( '.input-field.invalid:eq(0) input' ).focus();
        }
      });
      
      $form.submit( function(e) {
        e.preventDefault();
        
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
                $error.text( data.MESSAGE );
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