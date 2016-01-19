angular.module('googleMaps', [
		'ngRoute'
	]);

angular.module('googleMaps')
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/', {
				controller: 'mapsCtrl',
				templateUrl: './html/map.html'
			})
	}]);