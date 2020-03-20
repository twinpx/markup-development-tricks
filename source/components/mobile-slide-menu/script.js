( function($) {

  'use strict';
  
  $( function() {
    
    $( '.b-mobile-slide-menu' ).each( function() {
      
      var $mobileSlideMenu = $( this );
      
      if ( !$mobileSlideMenu.is( ':visible' )) {
        return;
      }
      
      if ( $( window ).scrollTop() === 0 ) {
        //no scrolling
        $( 'html' ).addClass( 'i-overflow-hidden' );
      } else {
        $mobileSlideMenu.addClass( 'i-hidden' );
        $( 'html' ).removeClass( 'i-overflow-hidden' );
      }
      
      var pageX = {
        start: 0,
        current: 0,
        end: 0
      };
      
      var pageY = {
        start: 0,
        current: 0,
        end: 0
      };
      
      var $activeSlide = $mobileSlideMenu.find( '.b-msm-slide:eq(0)' ).addClass( 'i-active' );
      var $subSlide, $nextMenu;
      var $activeMenu = $mobileSlideMenu.find( '.b-msm-menu-item[ data-num=' + $activeSlide.data( 'num' ) + ' ]' ).addClass( 'i-active' );
      var lineHeight = 75;
      var $menuContainer = $mobileSlideMenu.find( '.b-mobile-slide-menu__menu-container' );
      var $menuItems = $menuContainer.find( '.b-msm-menu-item' );
      var diff;
      
      //swipe
      $mobileSlideMenu.on( 'touchstart', function(e) {
        e.stopPropagation();
        pageX.start = e.changedTouches[0].pageX;
        pageY.start = e.changedTouches[0].pageY;
      });
      
      $mobileSlideMenu.on( 'touchmove', function(e) {
        e.stopPropagation();
        
        //try without
        if ( $mobileSlideMenu.hasClass( 'i-swipe-up' ) || $mobileSlideMenu.hasClass( 'i-swipe-down' )) {
          return;
        }
        
        pageX.current = e.changedTouches[0].pageX;
        pageY.current = e.changedTouches[0].pageY;
        
        if ( Math.abs( pageY.current - pageY.start ) < Math.abs( pageX.current - pageX.start )) {
          return;//not a vertical swipe
        }
        
        if ( pageY.start > pageY.current ) {//vertical movement up
        
          if ( $activeSlide.is( $mobileSlideMenu.find( '.b-msm-slide:last' ))) {
            
            diff = pageY.start - pageY.current;
            $mobileSlideMenu.css({ marginTop: -0.5 * diff + 'px' });
          } else {
            $( 'html' ).addClass( 'i-overflow-hidden' );
            
            //small items move
            diff = pageY.start - pageY.current;
            $menuContainer.css({ marginTop: -0.1 * diff + 'px' });
          }
          
        } else if ( pageY.start < pageY.current ) {//vertical movement down
        
          if ( $activeSlide.is( $mobileSlideMenu.find( '.b-msm-slide:first' ))) {
            
            //reload the page
            $( 'html' ).removeClass( 'i-overflow-hidden' );
            
          } else {
            $( 'html' ).addClass( 'i-overflow-hidden' );
            
            //small items move
            diff = pageY.start - pageY.current;
            $menuContainer.css({ marginTop: -0.1 * diff + 'px' });
          }
          
        }
      });
      
      $mobileSlideMenu.on( 'touchend', function(e) {
        
        if ( $mobileSlideMenu.hasClass( 'i-swipe-up' ) || $mobileSlideMenu.hasClass( 'i-swipe-down' )) {
          return;
        }
        
        pageX.end = e.changedTouches[0].pageX;
        pageY.end = e.changedTouches[0].pageY;
        
        if ( Math.abs( pageY.current - pageY.start ) < Math.abs( pageX.current - pageX.start )) {
          return;//not a vertical swipe
        }
        
        if ( pageY.start > pageY.end ) {//vertical swipe up
          
          $subSlide = $activeSlide.next();
          
          if ( !$subSlide.length || pageY.start >= Number( $( window ).height() / 2 ) + Number( $menuContainer.height())) {
            //scroll the page
            $mobileSlideMenu.addClass( 'i-hidden' ).css({ marginTop: 0 });
            setTimeout( function() {
              $( 'html' ).removeClass( 'i-overflow-hidden' );
            }, 500);
            
            return;
          }
          swipeUpDown();
          
        } else if ( pageY.start < pageY.end ) {//vertical swipe down
          $subSlide = $activeSlide.prev();
          if ( !$subSlide.length ) {
            return;
          }
          swipeUpDown();
        }
      });
      
      //click menu
      $( '.b-msm-menu-item' ).click( function(e) {
        if ( $( this ).hasClass( 'i-active' )) {
          return true;
        }
        e.preventDefault();
        $subSlide = $mobileSlideMenu.find( '.b-msm-slide[ data-num=' + $( this ).data( 'num' ) + ' ]' );
        swipeUpDown();
      });
      
      function swipeUpDown() {
        $activeSlide.addClass( 'i-animate' );
        $activeSlide = $subSlide.addClass( 'i-sub' );
        
        setTimeout( function() {
          $mobileSlideMenu.find( '.b-msm-slide.i-active' ).removeClass( 'i-animate' ).removeClass( 'i-active' );
          $subSlide.removeClass( 'i-sub' ).addClass( 'i-active' );
        }, 500);
        
        //menu
        $activeMenu.removeClass( 'i-active' );
        $activeMenu = $mobileSlideMenu.find( '.b-msm-menu-item[ data-num=' + $activeSlide.data( 'num' ) + ' ]' ).addClass( 'i-active' );
        $menuContainer.css({ top: 'calc( 50% - ' + ( $menuItems.index( $menuContainer.find( '.i-active' )) * lineHeight + lineHeight/2 ) + 'px )', marginTop: 0 });
        
        //no scrolling
        $( 'html' ).addClass( 'i-overflow-hidden' );
      }
      
      //swipe the page
      $( 'body' ).on( 'touchstart', function(e) {
        if ( !$mobileSlideMenu.hasClass( 'i-hidden' )) {
          return;
        }
        pageX.start = e.changedTouches[0].pageX;
        pageY.start = e.changedTouches[0].pageY;
      });
      
      $( 'body' ).on( 'touchend', function(e) {
        if ( !$mobileSlideMenu.hasClass( 'i-hidden' )) {
          return;
        }
        
        pageX.end = e.changedTouches[0].pageX;
        pageY.end = e.changedTouches[0].pageY;
        
        if ( Math.abs( pageY.current - pageY.start ) < Math.abs( pageX.current - pageX.start )) {
          return;//not a vertical swipe
        }
        
        if ( pageY.start < pageY.end && $( window ).scrollTop() === 0 ) {//vertical swipe down
          $mobileSlideMenu.removeClass( 'i-hidden' );
          $( 'html' ).addClass( 'i-overflow-hidden' );
        }
      });
      
    });
  
    /*if ( window.BX ) {
      BX.addCustomEvent( "onFrameDataReceived", function () {});
    }*/
  });

}( jQuery ));