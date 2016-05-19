angular.module('app.directives')

.directive('scrollMaster', function() {
	function link(scope, el, attrs){
		var em = el[0]
		
		el.on('scroll', function(e) {
			var h = em.scrollHeight - em.clientHeight
			var y = em.scrollTop
			scope.scrollMaster = y * 100 / h
			
			scope.$apply()
		})
	}

	return {
		restrict: 'A',
		replace: false,
		transclude: false,
		link: link,
		scope: {
			'scrollMaster': '='
		}
	}
})