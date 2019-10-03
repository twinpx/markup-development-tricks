$( '.b-float-label input, .b-float-label textarea' ).blur( function() {
  var $input = $( this ),
      $label = $input.siblings( 'label' );
  if ( $input.val() !== '' ) {
    $label.addClass( 'active' );
  } else {
    $label.removeClass( 'active' );
  }
});