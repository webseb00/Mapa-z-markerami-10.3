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
      zoom: 6,
      center: firstSlideCoords
    });

    for(var i = 0; i < imagesInfo.length; i++) {
      var marker = new google.maps.Marker({position: imagesInfo[i]['coords'], map: map});
    }

  }     
   
})();  

