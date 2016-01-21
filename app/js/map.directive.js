(function() {
	'use strict';
	angular.module('googleMaps')

	.directive('maps', function() {
		var coords;
		function addGmapsScript(args) {
			coords = args;
			var gmapsScript = document.createElement('script');
			gmapsScript.src = "http://maps.googleapis.com/maps/api/js?libraries=places";
			document.querySelector('head').appendChild(gmapsScript);
			gmapsScript.addEventListener('load', initialize);
		}

		function initialize() {
			var infowindow;
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

			infowindow = new google.maps.InfoWindow();

			var service = new google.maps.places.PlacesService(map);
			service.nearbySearch({
				location: myCenter,
				radius: 500,
				types: ['atm', 'subway_station', 'train_station']
			}, callback);

			function callback(results, status) {
				if (status === google.maps.places.PlacesServiceStatus.OK) {
					for (var i = 0; i < results.length; i++) {
						createMarker(results[i]);
					}
				}
			}

			function createMarker(place) {

				var image = {
					url: place.icon,
					// This marker is 20 pixels wide by 32 pixels high.
					scaledSize: new google.maps.Size(20, 32),

					origin: new google.maps.Point(0, 0),

					anchor: new google.maps.Point(0, 0)
				};

				var placeLoc = place.geometry.location;
				var marker = new google.maps.Marker({
					map: map,
					position: place.geometry.location,
					icon: image
				});

				google.maps.event.addListener(marker, 'click', function() {
					infowindow.setContent(place.name);
					console.log('place', place);
					infowindow.open(map, this);
				});
			}

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