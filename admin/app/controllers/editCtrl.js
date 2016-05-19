angular.module('app.controllers')

.controller('editCtrl', function($routeParams, $scope, $location, $posts, Post) {
	
	$posts.load().then(function() {
		$scope.post = _.find($posts.all, function(post) {
			return post._id == $routeParams.id
		})
		
		$scope.originalTitle = $scope.post.title
	})
	
	$scope.save = function() {
		Post.update({id: $scope.post._id}, $scope.post, function(data) {
			$scope.post = data
		})
	}
	
	$scope.publish = function() {
		$scope.post.published_at = new Date()
		
		$scope.save()
	}
	
	$scope.unpublish = function() {
		$scope.post.published_at = null
		
		$scope.save()
	}
	
	$scope.delete = function() {
		Post.delete({id: $scope.post._id}, function(data) {
			$location.url('/')
		})
	}
})