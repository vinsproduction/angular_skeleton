### 
 Controllers
###


appControllers = angular.module('appControllers', [])


appControllers.controller('popupsCtrl', ['APP','$rootScope','$scope','$location', (APP,$rootScope,$scope,$location) ->
	# popup.open 'unique'
])


appControllers.controller('homeCtrl', ['APP','$rootScope','$scope','$location', (APP,$rootScope,$scope,$location) ->
	$rootScope.title = "home"
])
.directive('homeDirective', ['$rootScope','$location', ($rootScope,$location) ->

	restrict: 'A'
	link: (scope, el, attr) ->

		# console.log el

])

