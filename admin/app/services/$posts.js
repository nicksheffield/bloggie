angular.module('app.services')

.factory('$posts', function(Post) {
	var service = {
		all: Post.query()
	}

	return service
})