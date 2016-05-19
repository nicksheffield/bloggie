angular.module('app.controllers')

.controller('sidebarCtrl', function($scope, $location) {
	$scope.url = $location.url()
	
	$scope.nav = [
		{ icon: 'file', url: '/new', label: 'New Post' },
		{ icon: 'file-text', url: '/', label: 'Content' },
		{ icon: 'cogs', url: '/options', label: 'Options' }
	]
})