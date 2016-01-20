(function() {
	'use strict';
	angular.module('googleMaps')
	.controller('mapsCtrl', mapsCtrl);
	mapsCtrl.$inject = ['$scope', 'googleMap'];
	function mapsCtrl($scope, googleMap) {
		$scope.message = 'Good Evening this is a controller';
		$scope.map = googleMap.map;
		$scope.$on('usersCurrentCoords', function(event, args) {
			console.log('coords received event', event);
			console.log('coords received args', args);
		});
	}

})();