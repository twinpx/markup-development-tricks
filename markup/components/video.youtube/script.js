!function(o){"use strict";o(function(){var t=document.createElement("script");t.src="https://www.youtube.com/iframe_api";var e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(t,e);var i=o(".b-video-yt"),a={};window.onYouTubeIframeAPIReady=function(){i.each(function(){var e=o(this);a[e.attr("id")]=new YT.Player(e.attr("id"),{height:e.data("height"),width:e.data("width"),videoId:e.data("videoid"),playerVars:{controls:0,modestbranding:1,rel:0,showinfo:0,playlist:e.data("videoid"),loop:1},events:{onReady:function(t){!function(t,e){e.mute(),t.target.playVideo(),setTimeout(function(){o(".b-yt-shutter").remove()},500)}(t,a[e.attr("id")])}}})})}})}(jQuery);