(function() {
	'use strict';
	angular.module('googleMaps')

	.directive('maps', function() {
		return {
			template: '<p>Baked beans - this is a directive</p>'
		}
	})

	.directive('geoButton', function() {


		function getLocation() {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(showPosition);
			} else {
				x.innerHTML = "Geolocation is not supported by this browser.";
			}
		}


		function showPosition(position) {
			var x = "Latitude: " + position.coords.latitude +
				"<br>Longitude: " + position.coords.longitude;
			console.log(x);
		}

		return {
			replace: true,
			link: function( scope, element, attributes) {
				element.bind('click', function() {
					console.log("I've been clicked");
					getLocation();
				});
				element.css({
					backgroundColor: 'blue',
					color: 'white',
					cursor: 'pointer',
					padding: '0.7em',
					borderRadius: '6px'
				});
			},
			template: '<button>Find me!</button>'
		}
	});

})();