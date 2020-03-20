( function($) {

  'use strict';
  
  $( function() {
    
    $( '.firstbanerfotorama' ).fotorama();
    
    function a() {
      
      if ( window.matchMedia("( min-width: 1200px )").matches ) {
        e = "lg";
      } else if ( window.matchMedia("( min-width: 992px )").matches ) {
        e = "md";
      } else if ( window.matchMedia("( min-width: 768px )").matches ) {
        e = "sm";
      } else {
        e = "xs";
      }
      
      if ( d !== e ) {
        d = e;
        b();
      }
      
    }

    function b() {
        if ( c.data("fotorama")) {
          c.data("fotorama").destroy();
        }
        
        if ( "lg" === d ) {
          f = 440;
        } else if ( "md" === d ) {
          f = 440;
        } else {
          f = 360;
        }
        
        c.on( "fotorama:show", function(a, b) {
          var c, d = $("video", $(b.activeFrame.$stageFrame)),
              e = !1;
          
          if ( $(document).innerWidth() > 768 && d.length > 0 ) {
            c = setInterval(function() {
              if (e) {clearTimeout(c);}
              else {
                  var a = d.get(0).play();
                  if ( void 0 !== a ) {
                    a.then(function() {
                        e = !0;
                    }).catch(function() {
                        d.get(0).play();
                    });
                  }
                  
              }
            }, 1e3);
          }
          
        }).fotorama({ height: f });
    }
    var c = $(".firstbanerfotorama"),
        d = "",
        e = "",
        f = 440,
        g = $( ".firstbanerfotorama .item" );
        
    if ( g.length > 0 ) {
      g.each(function() {
        var a = $(this);
        if (a.data("ytvideo") && a.data("videoid")) {
          var b = "";
          if ( a.data("videoautoplay") && (b = "autoPlayModal"), 0 === $("#" + a.data("videoid")).length) {
              $('<div id="' + a.data("videoid") + '" tabindex="-1" role="dialog" aria-labelledby="' + a.data("videoid") + 'Label" class="modal ' + b + ' "><div role="document" class="modal-dialog modal-lg"><div class="modal-content text-middle"><button type="button" data-dismiss="modal" aria-label="Close" class="close"></button><div class="modal-body center"><div class="embed-responsive embed-responsive-16by9"><iframe src="https://www.youtube.com/embed/' + a.data("ytvideo") + '?enablejsapi=1&rel=0&autoplay=0" allowfullscreen></iframe></div></div></div></div></div>').appendTo("body");
          }
        }
      });
    }
    
    $(".autoPlayModal").on("loaded.bs.modal", function(a) {}).on("hide.bs.modal", function(a) {
        var b = a.target;
        $("iframe", b)[0].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*");
    }).on("show.bs.modal", function(a) {
        var b = a.target;
        $("iframe", b)[0].contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', "*");
    });
    
    $(window).resize(a);
    
    a();

  
    /*if ( window.BX ) {
      BX.addCustomEvent( "onFrameDataReceived", function () {});
    }*/
  });

}( jQuery ));