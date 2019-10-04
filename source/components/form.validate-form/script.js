( function($) {

  'use strict';
  
  $( function() {
    
    $( '.b-validate-form' ).each( function() {
      
      var $this = $( this ),
          $form = $this.find( 'form' ),
          $submitButton = $form.find( '.btn[ type=submit ]' );
          
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
        
        //validate url input
        $form.find( 'input[ type="url" ]' ).each( function() {
          
          var $urlInput = $( this );
          var urlString = $urlInput.val();
          var urlRegExp = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/ig;
        
          if ( !urlString.match( urlRegExp )) {
            $urlInput.closest( '.input-field' ).addClass( 'invalid' );
            $urlInput.siblings( 'label' ).addClass( 'active' );
            errorFlag = true;
          } else {
            $urlInput.closest( '.input-field' ).removeClass( 'invalid' );
          }
          
        });
        
        if ( errorFlag ) {
          e.preventDefault();
          $form.find( '.input-field.invalid:eq(0) input' ).focus();
        }
      });
    });
  
    /*if ( window.BX ) {
      BX.addCustomEvent( "onFrameDataReceived", function () {});
    }*/
  });

}( jQuery ));