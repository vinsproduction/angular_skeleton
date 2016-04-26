

app.directive('examplePopupDirective', ['APP','Api','Popup','$rootScope','$compile', (APP,Api,Popup,$rootScope,$compile) ->

	restrict: 'A'
	scope:
		'popupName': '@popupName'

	controller: ($scope) ->

		Popup.scope($scope.popupName, $scope)
		# Popup.watch($scope.popupName)

	link: (scope, el, attr) ->

		$compile(el.contents())(scope)

		scope.popupOnInit = ->
			console.log 'init ' + scope.popupName, scope

		scope.popupOnOpen = ->
			console.log 'open ' + scope.popupName, scope

		scope.popupOnClose = ->
			console.log 'close ' + scope.popupName, scope

		return

])