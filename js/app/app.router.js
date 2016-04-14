
/* 
 Router
 */
app.config([
  '$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'home.html',
      controller: 'homeCtrl'
    });
    $routeProvider.when('/index', {
      redirectTo: '/'
    });
    $routeProvider.otherwise({
      templateUrl: '404.html',
      controller: function($rootScope) {
        return $rootScope.title = '404';
      },
      redirectTo: '/404'
    });
    return 0;
  }
]);
