
appControllers = angular.module('appControllers', [])

appControllers.controller 'headCtrl', ['$rootScope', ($rootScope) ->
	# $rootScope.title 			= 'default'
	# $rootScope.bodyClass 	= "default"
	# $rootScope.mainClass 	= "default"
]

appControllers
.controller('testCtrl', ['APP','$rootScope','$scope', (APP,$rootScope,$scope) ->

	$rootScope.title = "test"
	$rootScope.bodyClass 	= "test"

])
.directive('testCtrlDirective', ['$rootScope', ($rootScope) ->
	restrict: 'C'
	link: (scope, el, attr) -> #console.log el

])

