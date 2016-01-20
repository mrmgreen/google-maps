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
				console.log("Geolocation is not supported by this browser.");
			}
		}

		function showPosition(position) {
			var coords = {};
			coords.lat = position.coords.latitude;
			coords.long = position.coords.longitude;
			console.log('coords received', coords);
			$scope.$emit('usersCurrentCoords', coords);
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