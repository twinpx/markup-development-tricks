( function($) {

  'use strict';
  
  $( function() {
    
    $( '.b-mobile-slide-menu-horizontal' ).each( function() {
      
      var $mobileSlideMenuHorizontal = $( this );
      var $container = $mobileSlideMenuHorizontal.find( '.swiper-container' );
      var $items = $mobileSlideMenuHorizontal.find( '.swiper-wrapper a' );
      
      setTimeout( function() {
        $mobileSlideMenuHorizontal.find( '.bj-page-header__submenu' ).addClass( 'i-animate' );
      }, 500);
      
      var menuItems = 0;
      $items.each( function() {
        menuItems += $( this ).width();
      });
      var menuItemWidth = menuItems / $items.length;
      
      if ( $container.width() < ( $items.length-1 ) * 30 + menuItems ) {
        var swiper = new Swiper( $container, {
          slidesPerView: Math.round( $container.width()*10 / ( menuItemWidth + 30 )) / 10,
          spaceBetween: 30,
          freeMode: true
        });
      }
      });
  
    /*if ( window.BX ) {
      BX.addCustomEvent( "onFrameDataReceived", function () {});
    }*/
  });

}( jQuery ));