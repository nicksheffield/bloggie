angular.module('app.directives')

.directive('combo', function() {
	function link(scope, el, attrs){
		
		scope.open = false
		
		scope.setCurrent = function(key) {
			scope.current = key
			scope.open = false
		}
		
		scope.slugify = function(str) {
			return str.toLowerCase().split(' ').join('-')
		}
	}

	return {
		restrict: 'EA',
		replace: false,
		transclude: false,
		link: link,
		templateUrl: 'directives/combo.html'
	}
})