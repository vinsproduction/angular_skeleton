
appControllers = angular.module('appControllers', []) 

appControllers
.controller('headCtrl', ['$rootScope', ($rootScope) ->


])

.controller('page1Ctrl', ['APP','$rootScope','$scope', '$route', 'listeners', (APP,$rootScope,$scope,$route, listeners) ->

	$rootScope.title =  "title::page-1"
	$rootScope.bodyClass = "page-1"

	$scope.title = 'page-1'

	$scope.phones = [
		{'name': 'Nexus'},
		{'name': 'Motorola'},
		{'name': 'Nokia'}
	]

	# setTimeout(->
	# 	$scope.$apply -> $scope.title = 'Hello'
	# ,3000)

	$scope.add = (vars, event) ->
		$scope.phones.push {'name': 'Samsung'}
		$scope.$broadcast('dataloaded');

])
.directive('section1', ['$rootScope', ($rootScope) ->
	restrict: 'C'
	link: (scope, el, attr) -> #console.log el

])
.directive('section2', ['$rootScope', ($rootScope) ->
	restrict: 'C'
	link: (scope, el, attr) ->

		logit = ->
			p = el.find('.list > p')
			# console.log 'phones:', scope.phones

		_.defer -> do logit

		scope.$on 'dataloaded', ->
			_.defer ->
					do logit
])


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

])



