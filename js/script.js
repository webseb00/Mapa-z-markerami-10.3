var elem = document.querySelector('.main-carousel'),
	resetBtn = document.querySelector('#resetButton'),
	progressBar = document.querySelector('.progress-bar'),
	templateSlider = document.querySelector('#template-slide-pictures').innerHTML,
	carousel = document.querySelector('.main-carousel'),
	listItems = '';

  Mustache.parse(templateSlider);

  for(var i = 0;i < imagesInfo.length; i++) {
    listItems = listItems + Mustache.render(templateSlider, imagesInfo[i]);
  }

  carousel.insertAdjacentHTML('beforeend', listItems);


// initialize flkty slider	
var flkty = new Flickity( elem, {
  // options
  cellAlign: 'left',
  contain: true,
  pageDots: false,
  hash: true
});

// reset slider to first image
resetButton.addEventListener('click', function() {
	flkty.select(0);
});

// progress bar under the slider
flkty.on( 'scroll', function( progress ) {
  progress = Math.max( 0, Math.min( 1, progress ) );
  progressBar.style.width = progress * 100 + '%';
});

'use strict';
(function(){ 
  
    window.initMap = function() {
    
    var firstSlideCoords = imagesInfo[0]['coords'];
    
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: firstSlideCoords
    });

    var markers = [];

    // create markers on google map
    for(var i = 0; i < imagesInfo.length; i++) {
    	var marker = new google.maps.Marker({position: imagesInfo[i]['coords'], map: map, id: i});	
    	// push created markers to markers object
    	markers.push(marker);
    		// loop through markers object, and pass id number to carousel 
	    	for(var k = 0; k < markers.length; k++) {
	    		markers[k].addListener('click', function() {
	    		//console.log(this['id']);
	    		flkty.select(this['id']);
	    	});
    	}
    }

    flkty.on('change', function(index) {
    	smoothPanAndZoom(map, 6, imagesInfo[index]['coords']);
    });


    // smoothPanAndZoom function
    var smoothPanAndZoom = function(map, zoom, coords){
		var jumpZoom = zoom - Math.abs(map.getZoom() - zoom);
		jumpZoom = Math.min(jumpZoom, zoom -1);
		jumpZoom = Math.max(jumpZoom, 3);

		smoothZoom(map, jumpZoom, function(){
			smoothPan(map, coords, function(){
				smoothZoom(map, zoom); 
			});
		});
	};
	
	var smoothZoom = function(map, zoom, callback) {
		var startingZoom = map.getZoom();
		var steps = Math.abs(startingZoom - zoom);
		
		if(!steps) {
			if(callback) {
				callback();
			}
			return;
		}

		var stepChange = - (startingZoom - zoom) / steps;

		var i = 0;
		var timer = window.setInterval(function(){
			if(++i >= steps) {
				window.clearInterval(timer);
				if(callback) {
					callback();
				}
			}
			map.setZoom(Math.round(startingZoom + stepChange * i));
		}, 80);
	};

	var smoothPan = function(map, coords, callback) {
		var mapCenter = map.getCenter();
		coords = new google.maps.LatLng(coords);

		var steps = 12;
		var panStep = {lat: (coords.lat() - mapCenter.lat()) / steps, lng: (coords.lng() - mapCenter.lng()) / steps};

		var i = 0;
		var timer = window.setInterval(function(){
			if(++i >= steps) {
				window.clearInterval(timer);
				if(callback) callback();
			}
			map.panTo({lat: mapCenter.lat() + panStep.lat * i, lng: mapCenter.lng() + panStep.lng * i});
		}, 1000/30);
	}; 

  }     
   
})();  

