(function() {
	'use strict';
	angular.module('googleMaps')
	.controller('mapsCtrl', mapsCtrl);
	mapsCtrl.$inject = ['$scope', 'googleMap'];
	function mapsCtrl($scope, googleMap) {
		$scope.message = 'Good Evening this is a controller';
		$scope.map = googleMap.map;
	}

})();