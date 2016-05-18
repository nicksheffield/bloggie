angular.module('app.controllers')

.controller('homeCtrl', function($scope, $posts) {
	$scope.posts = $posts.all
	
	$posts.all.$promise.then(function() {
		$scope.currentPost = $posts.all[0]
	})
	
	$scope.currentPost = null
	
	$scope.choosePost = function(post) {
		$scope.currentPost = post
	}
})