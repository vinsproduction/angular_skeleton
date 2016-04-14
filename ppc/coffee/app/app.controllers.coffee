### Controllers ###


appControllers = angular.module('appControllers', [])

appControllers.controller('headerCtrl', ['APP','api','$rootScope','$scope','$location', (APP,api,$rootScope,$scope) ->

])

appControllers.controller('footerCtrl', ['APP','api','$rootScope','$scope','$location', (APP,api,$rootScope,$scope) ->

])

appControllers.controller('viewsCtrl', ['APP','api','$rootScope','$scope','$location', (APP,api,$rootScope,$scope) ->

])

appControllers.controller('popupsCtrl', ['APP','api','$rootScope','$scope','$location', (APP,api,$rootScope,$scope) ->
	# popup.open 'custom', {title:'Hello',body: 'world!'}
])


appControllers.controller('viewHomeCtrl', ['size','APP','api','$rootScope','$scope','$location', (size,APP,api,$rootScope,$scope) ->
	$rootScope.title = "home"
	return
])
.directive('homeDirective', ['APP','api','$rootScope','$location', (APP,api,$rootScope,$location) ->

	restrict: 'A'
	link: (scope, el, attr, ctrl, transclude) ->

		# $rootScope.$watch 'title', (newValue,oldValue) ->
		# 	if newValue
		# 		console.log $rootScope.title

		return
])

