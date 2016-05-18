angular.module('app.controllers')

.controller('newCtrl', function($scope, $posts, Post, $location) {

	$scope.post = new Post
	
	$scope.save = function() {
		if($scope.post._id) {
			Post.update({id: $scope.post._id}, $scope.post, function(data) {
				$scope.post = data
			})
		} else {
			$scope.post.$save()
		}
	}
	
	$scope.publish = function() {
		$scope.post.published_at = new Date()
		
		$scope.save()
	}
	
	$scope.unpublish = function() {
		$scope.post.published_at = null
		
		$scope.save()
	}
	
	
})