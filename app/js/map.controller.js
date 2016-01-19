(function() {
	'use strict';
	angular.module('googleMaps')
	.controller('mapsCtrl', mapsCtrl);
	mapsCtrl.$inject = ['$scope'];
	function mapsCtrl($scope) {
		$scope.message = 'Good Evening';
	}

})();