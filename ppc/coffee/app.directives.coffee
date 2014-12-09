
appDirectives = angular.module('appDirectives', [])

appDirectives.directive('alertDirective', ->

	restrict: 'A'
	scope: {}
	link: (scope, el, attr) ->

		el.click ->
			alert attr.info + ' : ' + scope.title
			console.log 'module:' , el

)