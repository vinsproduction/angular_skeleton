### 
 Controllers
###


appControllers = angular.module('appControllers', [])

appControllers.controller 'headCtrl', ['$rootScope', ($rootScope) ->
	# $rootScope.title 			= 'default'
	# $rootScope.bodyClass 	= "default"
	# $rootScope.mainClass 	= "default"
]

appControllers.controller('bodyCtrl', ['APP','$rootScope', '$location', (APP,$rootScope, $location) ->

])

appControllers.controller('indexCtrl', ['APP','$rootScope','$scope', (APP,$rootScope,$scope) ->

	$rootScope.title = "index"
	$rootScope.bodyClass 	= "view-index"

])

