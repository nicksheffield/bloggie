angular.module('app.resources')

.factory('Post', function($resource) {
	var url = '/api/post/:id'

	var defaults = {
		'id': '@id'
	}

	var methods = {
		update: {
			method: 'PUT'
		}
	}

	return $resource(url, defaults, methods)
});