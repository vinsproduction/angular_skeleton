### 
 Controllers
###


appControllers = angular.module('appControllers', [])

appControllers.controller('headerCtrl', ['APP','$rootScope','$scope','$location', (APP,$rootScope,$scope,$location) ->

])

appControllers.controller('footerCtrl', ['APP','$rootScope','$scope','$location', (APP,$rootScope,$scope,$location) ->

])

appControllers.controller('bodyCtrl', ['APP','$rootScope','$scope','$location', (APP,$rootScope,$scope,$location) ->

])

appControllers.controller('popupsCtrl', ['APP','$rootScope','$scope','$location', (APP,$rootScope,$scope,$location) ->
	# popup.open 'unique'
])


appControllers.controller('homeCtrl', ['APP','$rootScope','$scope','$location', (APP,$rootScope,$scope,$location) ->
	$rootScope.title = "home"
])
.directive('homeDirective', ['APP','$rootScope','$location', (APP, $rootScope,$location) ->

	restrict: 'A'
	link: (scope, el, attr) ->

		# $rootScope.$watch 'title', (newValue,oldValue) ->
		# 	if newValue
		# 		console.log $rootScope.title

])

