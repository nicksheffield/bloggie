angular.module('app.controllers')

.controller('editCtrl', function($routeParams, $scope, $location, $posts, Post) {
	
	$posts.load().then(function() {
		$scope.post = _.find($posts.all, function(post) {
			return post._id == $routeParams.id
		})
		
		$scope.setDefault()
		
		$scope.originalTitle = $scope.post.title
	})
	
	$scope.save = function() {
		Post.update({id: $scope.post._id}, $scope.post, function(data) {
			$scope.post = data
			
			$scope.setDefault()
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
		if(confirm('Are you sure you want to delete this post?\nThere are no backups.')) {
			Post.delete({id: $scope.post._id}, function(data) {
				$location.url('/')
			})
		}
	}
	
	$scope.current = 'Save Draft'

	$scope.comboActions = {
		"Save Draft": {
			func: $scope.save,
			condition: function() { return $scope.post && !$scope.post.published_at },
			isDefault: function() { return $scope.post && !$scope.post.published_at }
		},
		"Publish": {
			func: $scope.publish,
			condition: function() { return $scope.post && !$scope.post.published_at }
		},
		"Update": {
			func: $scope.publish,
			condition: function() { return $scope.post && $scope.post.published_at },
			isDefault: function() { return $scope.post && $scope.post.published_at }
		},
		"Unpublish": {
			func: $scope.unpublish,
			condition: function() { return $scope.post && $scope.post.published_at }
		},
		"Delete": {
			func: $scope.delete,
			condition: function() { return $scope.post && $scope.post._id }
		}
	}
	
	$scope.setDefault = function() {
		for(prop in $scope.comboActions) {
			if($scope.comboActions[prop].isDefault != undefined
				&& $scope.comboActions[prop].isDefault()){
				$scope.current = prop
			}
		}
	}

})