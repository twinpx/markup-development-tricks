!function(n){"use strict";n(function(){function a(){o=window.matchMedia("( min-width: 1200px )").matches?"lg":window.matchMedia("( min-width: 992px )").matches?"md":window.matchMedia("( min-width: 768px )").matches?"sm":"xs",t!==o&&(t=o,function(){e.data("fotorama")&&e.data("fotorama").destroy();d="lg"===t?440:"md"===t?440:360;e.on("fotorama:show",function(a,e){var t,o=n("video",n(e.activeFrame.$stageFrame)),d=!1;768<n(document).innerWidth()&&0<o.length&&(t=setInterval(function(){if(d)clearTimeout(t);else{var a=o.get(0).play();void 0!==a&&a.then(function(){d=!0}).catch(function(){o.get(0).play()})}},1e3))}).fotorama({height:d})}())}n(".firstbanerfotorama").fotorama();var e=n(".firstbanerfotorama"),t="",o="",d=440,i=n(".firstbanerfotorama .item");0<i.length&&i.each(function(){var a=n(this);if(a.data("ytvideo")&&a.data("videoid")){var e="";a.data("videoautoplay")&&(e="autoPlayModal"),0===n("#"+a.data("videoid")).length&&n('<div id="'+a.data("videoid")+'" tabindex="-1" role="dialog" aria-labelledby="'+a.data("videoid")+'Label" class="modal '+e+' "><div role="document" class="modal-dialog modal-lg"><div class="modal-content text-middle"><button type="button" data-dismiss="modal" aria-label="Close" class="close"></button><div class="modal-body center"><div class="embed-responsive embed-responsive-16by9"><iframe src="https://www.youtube.com/embed/'+a.data("ytvideo")+'?enablejsapi=1&rel=0&autoplay=0" allowfullscreen></iframe></div></div></div></div></div>').appendTo("body")}}),n(".autoPlayModal").on("loaded.bs.modal",function(a){}).on("hide.bs.modal",function(a){var e=a.target;n("iframe",e)[0].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}',"*")}).on("show.bs.modal",function(a){var e=a.target;n("iframe",e)[0].contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}',"*")}),n(window).resize(a),a()})}(jQuery);