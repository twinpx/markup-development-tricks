( function($) {

  'use strict';
  
  $( function() {

    document.querySelectorAll( '.b-timetable-block' ).forEach( function( block ) {

      var elem1 = block.querySelector( '.b-timetable-elem-1');
      var elem2 = block.querySelector( '.b-timetable-elem-2');

      if ( isWorktime()) {
        elem1.style.display = "block";
        elem2.style.display = "none";
      } else {
        elem1.style.display = "none";
        elem2.style.display = "block";
      }

      function isWorktime() {
        var flag = true;// true - worktime, false - night and weekend

        var date = new Date();
        var hours = date.getHours();
        var day = date.getDay();

        if (( day <= 0 || day >= 6 ) || ( hours < 10 || hours >= 19 )) {
          flag = false;
        }

        return flag;
      }

    });

  });

}( jQuery ));