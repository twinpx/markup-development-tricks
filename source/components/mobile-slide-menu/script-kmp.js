( function($) {

  'use strict';
  
  $( function() {
    
    $( '.b-mobile-slide-menu' ).each( function() {
      
      var $mobileSlideMenu = $( this );
      var intervalId;
      
      if ( !$mobileSlideMenu.is( ':visible' )) {
        return;
      }
      
      $( '.header-video' ).remove();
      
      setTimeout( function() {
        $mobileSlideMenu.addClass( 'i-loaded' );
        $( 'header' ).addClass( 'i-loaded' );
        startIntervalSwipe();
      }, 2500);
      
      if ( $( window ).scrollTop() === 0 ) {
        //no scrolling
        $( 'html' ).addClass( 'i-overflow-hidden' );
      } else {
        $( 'header' ).css({ marginTop: -1*$( 'header' ).height() + 'px' }).addClass( 'i-hidden' );
        $( 'html' ).removeClass( 'i-overflow-hidden' );
        $( '.b-tour-list' ).addClass( 'i-animate-button' );
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
      var timeoutID;
      
      //swipe
      $mobileSlideMenu.on( 'touchstart', function(e) {
        e.stopPropagation();
        pageX.start = e.originalEvent.changedTouches[0].pageX;
        pageY.start = e.originalEvent.changedTouches[0].pageY;
      });
      
      $mobileSlideMenu.on( 'touchmove', function(e) {
        e.stopPropagation();
        
        pageX.current = e.originalEvent.changedTouches[0].pageX;
        pageY.current = e.originalEvent.changedTouches[0].pageY;
        
        if ( Math.abs( pageY.current - pageY.start ) < Math.abs( pageX.current - pageX.start )) {
          return;//not a vertical swipe
        }
        
        if ( pageY.start > pageY.current ) {//vertical movement up
        
          if ( $activeSlide.is( $mobileSlideMenu.find( '.b-msm-slide:last' ))) {
            
            diff = pageY.start - pageY.current;
            $( 'header' ).css({ marginTop: -0.5 * diff + 'px' });
          } else {
            $( 'html' ).addClass( 'i-overflow-hidden' );
            
            //small items move
            diff = pageY.start - pageY.current;
            $menuContainer.css({ marginTop: -0.4 * diff + 'px' });
          }
          
        } else if ( pageY.start < pageY.current ) {//vertical movement down
        
          if ( $activeSlide.is( $mobileSlideMenu.find( '.b-msm-slide:first' ))) {
            
            //reload the page
            $( 'html' ).removeClass( 'i-overflow-hidden' );
            
          } else {
            $( 'html' ).addClass( 'i-overflow-hidden' );
            
            //small items move
            diff = pageY.start - pageY.current;
            $menuContainer.css({ marginTop: -0.4 * diff + 'px' });
          }
          
        }
      });
      
      $mobileSlideMenu.on( 'touchend', function(e) {
        
        pageX.end = e.originalEvent.changedTouches[0].pageX;
        pageY.end = e.originalEvent.changedTouches[0].pageY;
        
        if ( Math.abs( pageY.end - pageY.start ) < Math.abs( pageX.end - pageX.start )) {
          return;//not a vertical swipe
        }
        
        if ( pageY.start > pageY.end ) {//vertical swipe up
          
          startIntervalSwipe();
          
          $subSlide = $activeSlide.next();
          verticalSwipeUp();
          
        } else if ( pageY.start < pageY.end ) {//vertical swipe down
          startIntervalSwipe();
          $subSlide = $activeSlide.prev();
          if ( !$subSlide.length ) {
            return;
          }
          swipeUpDown();
        }
      });
      
      //click menu
      /*$( '.b-msm-menu-item' ).click( function(e) {
        
        if ( $( this ).hasClass( 'i-active' )) {
          return true;
        }
        e.preventDefault();
        $subSlide = $mobileSlideMenu.find( '.b-msm-slide[ data-num=' + $( this ).data( 'num' ) + ' ]' );
        swipeUpDown();
      });*/
      
      function startIntervalSwipe() {
        if ( intervalId ) {
          clearInterval( intervalId );
        }
        intervalId = setInterval( function() {
          $subSlide = $activeSlide.next();
          if ( !$subSlide.length ) {
            $subSlide = $mobileSlideMenu.find( '.b-msm-slide:eq(0)' );
          }
          verticalSwipeUp();
        }, 2000);
      }
      
      function verticalSwipeUp() {
          
        if ( !$subSlide.length || pageY.start >= Number( $( window ).height() / 2 ) + Number( $menuContainer.height())) {
          
          scrollThePage();
          return;
        }
        
        swipeUpDown();
        
      }
      
      function scrollThePage() {
        //scroll the page
        $mobileSlideMenu.css({ marginTop: 0 });
        $( 'header' ).css({ marginTop: -1*$( 'header' ).height() + 'px' }).addClass( 'i-hidden' );
        
        //stop menu self animation
        if ( intervalId ) {
          clearInterval( intervalId );
        }
        //show the first menu item
        $subSlide = $mobileSlideMenu.find( '.b-msm-slide:eq(0)' );
        swipeUpDown();
        
        $( '.b-tour-list' ).addClass( 'i-animate-button' );
        
        setTimeout( function() {
          $( 'html' ).removeClass( 'i-overflow-hidden' );
        }, 500);
      }
      
      function swipeUpDown() {
        $activeSlide.addClass( 'i-animate' );
        $activeSlide = $subSlide.addClass( 'i-sub' );
        
        clearTimeout( timeoutID );
        
        timeoutID = setTimeout( function() {
          $mobileSlideMenu.find( '.b-msm-slide.i-active' ).removeClass( 'i-animate' ).removeClass( 'i-active' );
          $subSlide.removeClass( 'i-sub' ).addClass( 'i-active' );
        }, 500);
        
        //menu
        $activeMenu.removeClass( 'i-active' );
        $activeMenu = $mobileSlideMenu.find( '.b-msm-menu-item[ data-num=' + $activeSlide.data( 'num' ) + ' ]' ).addClass( 'i-active' ).removeClass( 'i-hidden' );
        $menuContainer.css({ top: 'calc( 50% - 20px - ' + ( $menuItems.index( $menuContainer.find( '.i-active' )) * lineHeight + lineHeight/2 ) + 'px )', marginTop: 0 });
        
        //transparent menu items
        var x = $activeSlide.data( 'num' ) - 3;
        while ( x >= 0 ) {
          $mobileSlideMenu.find( '.b-msm-menu-item[ data-num=' + x-- + ' ]' ).addClass( 'i-hidden' );
        }
        var y = $activeSlide.data( 'num' ) - 2;
        while ( y <= $menuItems.length ) {
          $mobileSlideMenu.find( '.b-msm-menu-item[ data-num=' + y++ + ' ]' ).removeClass( 'i-hidden' );
        }
        
        //no scrolling
        $( 'html' ).addClass( 'i-overflow-hidden' );
      }
      
      //swipe the page
      $( 'body' ).on( 'touchstart', function(e) {
        if ( !$( 'header' ).hasClass( 'i-hidden' )) {
          return;
        }
        
        pageX.start = e.originalEvent.changedTouches[0].pageX;
        pageY.start = e.originalEvent.changedTouches[0].pageY;
      });
      
      $( 'body' ).on( 'touchend', function(e) {
        
        if ( !$( 'header' ).hasClass( 'i-hidden' )) {
          return;
        }
        
        pageX.end = e.originalEvent.changedTouches[0].pageX;
        pageY.end = e.originalEvent.changedTouches[0].pageY;
        
        if ( Math.abs( pageY.end - pageY.start ) < Math.abs( pageX.end - pageX.start )) {
          return;//not a vertical swipe
        }
        
        if ( pageY.start < pageY.end && $( window ).scrollTop() <= 0 ) {//vertical swipe down
          $( 'header' ).removeClass( 'i-hidden' ).css({ marginTop: 0 });
          //start menu self animation
          startIntervalSwipe();
          $( 'html' ).addClass( 'i-overflow-hidden' );
        }
      });
      
      $( '.b-mobile-slide-menu__scroll-down' ).click( function() {
        scrollThePage();
      });
      
    });
  
    /*if ( window.BX ) {
      BX.addCustomEvent( "onFrameDataReceived", function () {});
    }*/
  });

}( jQuery ));