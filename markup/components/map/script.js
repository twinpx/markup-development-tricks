!function(c){"use strict";c(function(){ymaps.ready(function(){var o=new ymaps.Map("yMap",{center:[55.751574,37.573856],zoom:12,controls:["geolocationControl","zoomControl"]},{searchControlProvider:"yandex#search"});o.behaviors.disable("scrollZoom");var a="islands#blackClusterIcons";window.yMapPlacemarksIcons&&(a="islands#"+yMapPlacemarksIcons);var n=new ymaps.Clusterer({preset:a,groupByCoordinates:!1});c(".b-map__nav-item.i-active").each(function(){var a=c(this).data("tab");a&&yMapPlacemarks[a].forEach(function(a){var e=new ymaps.Placemark(a.coords,{},{iconLayout:"default#image",iconImageHref:a.icon,iconImageSize:[32,32],iconImageOffset:[-16,-16]});e.events.add("click",function(){a.href&&(window.location=a.href)}),n.add(e)})}),o.geoObjects.add(n),o.setBounds(n.getBounds(),{checkZoomRange:!0,duration:500}),c(".b-map__nav-item").click(function(){var a=c(this),e=c(this).closest(".b-map");e.data("singletab")&&e.find(".b-map__nav-item").removeClass("i-active"),a.toggleClass("i-active"),n.removeAll(),c(".b-map__nav-item.i-active").each(function(){var a=c(this).data("tab");a&&yMapPlacemarks[a].forEach(function(a){n.add(new ymaps.Placemark(a.coords,{},{iconLayout:"default#image",iconImageHref:a.icon,iconImageSize:[32,32],iconImageOffset:[-16,-16]}))})}),o.setBounds(n.getBounds(),{checkZoomRange:!0,duration:500})})})})}(jQuery);