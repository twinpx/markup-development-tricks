( function($) {

  'use strict';
  
  $( function() {
    
    $( '.b-mls__nav__item' ).click( function(e) {
      e.preventDefault();
      var $navItem = $( this );
      if ( $navItem.hasClass( 'i-active' )) {
        return;
      }
      
      $( '.b-mls__tabs__item, .b-mls__nav__item' ).removeClass( 'i-active' );
      $( '.b-mls__tabs__item[ data-tab="' + $navItem.data( 'tab' ) + '" ]' ).addClass( 'i-active' );
      $navItem.addClass( 'i-active' );
    });
    
    ymaps.ready(function () {
      var myMap = new ymaps.Map( 'yMap', {
        center: [ 55.751574, 37.573856 ],
        zoom: 12,
        controls: [ 'geolocationControl', 'zoomControl' ]
      }, {
        searchControlProvider: 'yandex#search'
      });
      
      myMap.behaviors.disable( 'scrollZoom' );
      
      //cluster
      var preset = 'islands#blackClusterIcons';
      if ( window.yMapPlacemarksIcons ) {
        preset = 'islands#' + yMapPlacemarksIcons;
      }
      var clusterer = new ymaps.Clusterer({
        preset: preset,
        //clusterNumbers: [10],
        groupByCoordinates: false,
      });
      
      //on load
      yMapPlacemarks.forEach( function( elem ) {
      
        var BalloonContentLayout = ymaps.templateLayoutFactory.createClass(
          '<div style="display: flex;">' +
            '<img src="{{properties.img}}" width="80" height="80" style="margin-right: 10px;">' + 
            '<div>' +
              '<b>{{properties.title}}</b>' +
              '<p style="color: #666666; margin: 10px 0 0;">{{properties.description}}</p>' +
              '<p style="margin: 10px 0 0;"><a href="{{properties.href}}">Подробнее</a></p>' +
            '</div>' +
          '</div>',
        {});
        
        clusterer.add( new ymaps.Placemark( elem.coords, elem.balloon, {
          iconLayout: 'default#image',
          iconImageHref: elem.icon,
          iconImageSize: [32, 32],
          iconImageOffset: [-16, -16],
          balloonContentLayout: BalloonContentLayout,
          balloonPanelMaxMapArea: 0
        }));
      });
      
      myMap.geoObjects.add( clusterer );
      
      myMap.setBounds( myMap.geoObjects.getBounds());
      
    });
  
    /*if ( window.BX ) {
      BX.addCustomEvent( "onFrameDataReceived", function () {});
    }*/
  });

}( jQuery ));