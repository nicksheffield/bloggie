angular.module('app.routes')

.config(function($routeProvider) {

	$routeProvider
	
		.when('/', {
			controller: 'homeCtrl',
			templateUrl: 'views/home.html'
		})
	
		.when('/edit/:id', {
			controller: 'editCtrl',
			templateUrl: 'views/edit.html'
		})
		
		.when('/new', {
			controller: 'newCtrl',
			templateUrl: 'views/edit.html'
		})
		
		.otherwise({
			redirectTo: '/'
		})
});