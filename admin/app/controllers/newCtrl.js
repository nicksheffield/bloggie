angular.module('app.controllers')

.controller('newCtrl', function($scope, $posts, Post, $location) {

	$scope.post = new Post
	
	$scope.save = function() {
		$scope.post.$save(function() {
			$location.url('/edit/' + $scope.post._id)
		})
	}
	
	$scope.publish = function() {
		$scope.post.published_at = new Date()
		
		$scope.save()
	}
	
	$scope.current = "Save Draft"
	
	$scope.comboActions = {
		"Save Draft": {
			func: $scope.save,
			condition: function() { return true }
		},
		"Publish": {
			func: $scope.publish,
			condition: function() { return true }
		}
	}
	
})