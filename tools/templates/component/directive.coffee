
appDirectives.directive('[componentName]ComponentDirective', ['APP','Api','$rootScope',(APP,Api,$rootScope) -> 

	restrict: 'A'
	transclude: true
	scope: {}
	controller: ($scope) ->
	templateUrl: 'js/app/components/[componentDir]/[componentDir].html'
	link: (scope, el, attr, ctrl, transclude) ->

		return

])