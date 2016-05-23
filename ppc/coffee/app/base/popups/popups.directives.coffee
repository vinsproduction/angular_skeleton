

# app.directive('examplePopupDirective', ['APP','Api','Popup','$rootScope',(APP,Api,Popup,$rootScope) ->

# 	restrict: 'A'
# 	transclude: true
# 	scope: {}

# 	controller: ($scope) ->

# 		Popup.scope('example', $scope)
# 		# Popup.watch($scope.popupName)

# 	link: (scope, el, attr, ctrl, transclude) ->

# 		transclude scope, (clone) ->
# 			el.html(clone)

# 		scope.popupOnInit = ->
# 			# console.log 'init ' + scope.popupName, scope

# 		scope.popupOnOpen = ->
# 			# console.log 'open ' + scope.popupName, scope

# 		scope.popupOnClose = ->
# 			# console.log 'close ' + scope.popupName, scope

# 		return

# ])