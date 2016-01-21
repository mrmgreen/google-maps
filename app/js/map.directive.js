(function() {
	'use strict';
	angular.module('googleMaps')

	.directive('maps', function() {
		var coords;
		function addGmapsScript(args) {
			coords = args;
			console.log('addGmapsScript args', coords);
			var gmapsScript = document.createElement('script');
			gmapsScript.src = "http://maps.googleapis.com/maps/api/js";
			document.querySelector('head').appendChild(gmapsScript);
			gmapsScript.addEventListener('load', initialize);
		}

		function initialize() {
			console.log('initialize coords', coords);
			var myCenter=new google.maps.LatLng(coords.lat, coords.long);
			var mapProp = {
				center:myCenter,
				zoom:15,
			    mapTypeId:google.maps.MapTypeId.ROADMAP
			};
			var map=new google.maps.Map(document.getElementById("googleMap"), mapProp);

			var marker=new google.maps.Marker({
			  position:myCenter,
			  });

			marker.setMap(map);
		}

		return {
			link: function(scope, element, attributes) {
				scope.$on('usersCurrentCoords', function(event, args) {
				console.log('coords received by maps directive event', event);
				addGmapsScript(args);
				});
			},
			template: '<div id="googleMap" style="width:500px;height:380px;"></div>'
		}
	})

	.directive('geoButton', function() {
		var $scope;

		function getLocation(scope) {
			$scope = scope;
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(showPosition);
				console.log('scope', $scope);
			} else {
				console.log("Geolocation is not supported by this browser.");
			}
		}

		function showPosition(position) {
			var coords = {};
			coords.lat = position.coords.latitude;
			coords.long = position.coords.longitude;
			$scope.$emit('usersCurrentCoords', coords);
		}

		return {
			replace: true,
			link: function( scope, element, attributes) {
				element.bind('click', function() {
					getLocation(scope);
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