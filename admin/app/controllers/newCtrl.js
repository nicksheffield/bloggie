angular.module('app.controllers')

.controller('newCtrl', function($scope, $posts, Post, $location) {

	$scope.post = new Post
	
	$scope.save = function() {
		if($scope.post._id) {
			Post.update({id: $scope.post._id}, $scope.post, function(data) {
				$location.url('/edit/' + $scope.post._id)
			})
		} else {
			$scope.post.$save(function() {
				$location.url('/edit/' + $scope.post._id)
			})
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