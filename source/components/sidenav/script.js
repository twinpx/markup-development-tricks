( function($) {

  'use strict';
  
  $( function() {
    
    //materialize-0.97.5
    if ( document.getElementById( 'sideNavButton-0-97-5' )) {
      $( '#sideNavButton-0-97-5' ).sideNav({
        menuWidth: 300, // Default is 300
        edge: 'right', // Choose the horizontal origin
        closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        draggable: true, // Choose whether you can drag to open on touch screens,
        onOpen: function(el) { /* Do Stuff*/ }, // A function to be called when sideNav is opened
        onClose: function(el) { /* Do Stuff*/ }, // A function to be called when sideNav is closed
      });
      
      $( '#sideNav-0-97-5 .btn' ).click( function(e) {
        e.preventDefault();
        $( '#sideNavButton-0-97-5' ).sideNav( 'hide' );
      });
    }
    
    if ( document.getElementById( 'sideNavButton2-0-97-5' )) {
      $( '#sideNavButton2-0-97-5' ).sideNav({
        //attention - do not set width in % - the close button will not work
        menuWidth: '40%', // Default is 300
        edge: 'left', // Choose the horizontal origin
        closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        draggable: true, // Choose whether you can drag to open on touch screens,
        onOpen: function(el) { /* Do Stuff*/ }, // A function to be called when sideNav is opened
        onClose: function(el) { /* Do Stuff*/ }, // A function to be called when sideNav is closed
      });
      
      $( '#sideNav2-0-97-5 .btn' ).click( function(e) {
        e.preventDefault();
        $( '#sideNavButton2-0-97-5' ).sideNav( 'hide' );
      });
    }
    
    //materialize-0.100.2
    if ( document.getElementById( 'sideNavButton-0-100-2' )) {
      $( '#sideNavButton-0-100-2' ).sideNav({
        menuWidth: '40%', // Default is 300
        edge: 'right', // Choose the horizontal origin
        closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        draggable: true, // Choose whether you can drag to open on touch screens,
        onOpen: function(el) { /* Do Stuff*/ }, // A function to be called when sideNav is opened
        onClose: function(el) { /* Do Stuff*/ }, // A function to be called when sideNav is closed
      });
      
      $( '#sideNav-0-100-2 .btn' ).click( function(e) {
        e.preventDefault();
        $( '#sideNavButton-0-100-2' ).sideNav( 'hide' );
      });
    }
    
    //materialize-1.0.0
    if ( document.getElementById( 'sideNavButton-1-0-0' )) {
      $( '#sideNav-1-0-0' ).sidenav();
    }
    if ( document.getElementById( 'sideNavButton2-1-0-0' )) {
      $( '#sideNav2-1-0-0' ).sidenav({
        edge: 'right'
      });
    }
  
    /*if ( window.BX ) {
      BX.addCustomEvent( "onFrameDataReceived", function () {});
    }*/
  });

}( jQuery ));