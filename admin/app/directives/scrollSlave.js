angular.module('app.directives')

.directive('scrollSlave', function() {
	function link(scope, el, attrs){
		var em = el[0]
		
		scope.$watch('scrollSlave', function(val) {
			console.log('change', val)
			var h = em.scrollHeight - em.clientHeight
			var y = val / 100 * h
			em.scrollTop = y
		}, true)
	}

	return {
		restrict: 'A',
		replace: false,
		transclude: false,
		link: link,
		scope: {
			'scrollSlave': '='
		}
	}
})