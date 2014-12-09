
### 
 Router
###

app.config ['$routeProvider', ($routeProvider) ->

	$routeProvider.when '/',
		templateUrl: 'views/index.html'
		controller: 'indexCtrl'

	$routeProvider.when '/index',
		redirectTo: '/'

	$routeProvider.otherwise
		templateUrl: 'views/404.html'
		controller: ($rootScope) ->
			$rootScope.title = '404'
			$rootScope.bodyClass = 'view-404'
		redirectTo: '/404'

	console.log $routeProvider

	return 0

]