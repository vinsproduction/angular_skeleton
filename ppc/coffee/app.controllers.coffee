### 
 Controllers
###


appControllers = angular.module('appControllers', [])

appControllers.controller 'headCtrl', ['$rootScope', ($rootScope) ->
	# $rootScope.title 			= 'default'
	# $rootScope.bodyClass 	= "default"
	# $rootScope.mainClass 	= "default"
]

appControllers
.controller('indexCtrl', ['APP','$rootScope','$scope', (APP,$rootScope,$scope) ->

	$rootScope.title = "index"
	$rootScope.bodyClass 	= "view-index"

])
.directive('indexCtrlDirective', ['$rootScope', ($rootScope) ->
	restrict: 'C'
	link: (scope, el, attr) -> #console.log el

])

