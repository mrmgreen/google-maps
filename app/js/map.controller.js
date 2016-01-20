(function() {
	'use strict';
	angular.module('googleMaps')
	.controller('mapsCtrl', mapsCtrl);
	mapsCtrl.$inject = ['$scope', 'googleMap'];
	function mapsCtrl($scope, googleMap) {
		$scope.message = 'Good Evening';
		$scope.map = googleMap.map;
	}

})();