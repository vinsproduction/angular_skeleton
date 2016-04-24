

app.directive('examplePopupDirective', ['APP','Api','$rootScope','$compile', (APP,Api,$rootScope,$compile) ->

	restrict: 'A'
	scope:
		'popupName': '@popupName'

	controller: ($scope) ->

		$rootScope.popupScope($scope.popupName, $scope)

		$scope.controller = "directive controller"

	link: (scope, el, attr) ->

		$compile(el.contents())(scope)

		scope.directive = "directive link"

		scope.popupOnInit = ->
			console.log 'init ' + scope.popupName, scope

		scope.popupOnOpen = ->
			console.log 'open ' + scope.popupName, scope

		scope.popupOnClose = ->
			console.log 'close ' + scope.popupName, scope

		return

])