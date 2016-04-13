### 
 Controllers
###


<<<<<<< HEAD
appControllers
.controller('headCtrl', ['$rootScope', ($rootScope) ->


])

.controller('page1Ctrl', ['APP','$rootScope','$scope', '$route', 'listeners', (APP,$rootScope,$scope,$route, listeners) ->
=======
appControllers = angular.module('appControllers', [])
>>>>>>> origin/master

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

<<<<<<< HEAD
.controller('page2Ctrl', ['APP','api','$rootScope','$scope','$routeParams', (APP,api,$rootScope,$scope,$routeParams) ->


	$rootScope.title =  "title::page-2"
	$rootScope.bodyClass = "page-2"

	$scope.title = 'page-' + $routeParams.pageId

	$scope.state = 'hide'

	$scope.show = (vars, event) -> $scope.state = 'show'

	$scope.request = ->

		api(
			url:'/api/user/details'
			params:
				id: 1
		).success (res) ->
			#console.log 'response', res
			$scope.response = res
=======
		# $rootScope.$watch 'title', (newValue,oldValue) ->
		# 	if newValue
		# 		console.log $rootScope.title
>>>>>>> origin/master

])

