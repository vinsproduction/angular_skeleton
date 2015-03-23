### 
 Controllers
###


appControllers = angular.module('appControllers', [])

appControllers.controller('headCtrl', ['$rootScope', ($rootScope) ->
	# $rootScope.title 			= 'default'
	# $rootScope.bodyClass 	= "default"
	# $rootScope.mainClass 	= "default"
])

appControllers.controller('bodyCtrl', ['APP','$rootScope', '$location', (APP,$rootScope, $location) ->
	# route = $location.path()
	# switch route
	# 	when '/item-1'
	# 	when '/item-2'
	# 	when '/item-3'
])

appControllers.controller('popupsCtrl', ['APP','$rootScope','$scope','$location', (APP,$rootScope,$scope,$location) ->
	# popup.open 'unique'
])


appControllers.controller('homeCtrl', ['APP','$rootScope','$scope','$location', (APP,$rootScope,$scope,$location) ->
	$rootScope.title = "home"
])

