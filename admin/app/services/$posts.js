angular.module('app.services')

.factory('$posts', function(Post) {
	var service = {
		all: null,
		load: function() {
			service.all = Post.query()
			
			return service.all.$promise
		}
	}

	return service
})