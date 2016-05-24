angular.module('app.controllers')

.controller('optionsCtrl', function($scope, $http) {
	$http.get('/api/options').then(function(res) {
		$scope.options = res.data
		
		console.log($scope.options)
	})
	
	$scope.save = function() {
		$http.post('/api/options', $scope.options, function(data) {
			console.log(data)
		})
	}
})