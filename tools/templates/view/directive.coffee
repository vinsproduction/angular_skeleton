
appDirectives.directive('[viewName]ViewDirective', ['APP','Api','$rootScope', (APP,Api,$rootScope) -> 

	restrict: 'A'
	controller: ($scope) ->
	link: (scope, el, attr, ctrl, transclude) ->

		# transclude scope, (clone) ->
		# 	el.html(clone)

		return

])