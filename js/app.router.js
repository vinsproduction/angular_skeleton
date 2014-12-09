
/* 
 Router
 */
app.config([
  '$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'views/index.html',
      controller: 'indexCtrl'
    });
    $routeProvider.when('/index', {
      redirectTo: '/'
    });
    $routeProvider.otherwise({
      templateUrl: 'views/404.html',
      controller: function($rootScope) {
        $rootScope.title = '404';
        return $rootScope.bodyClass = 'view-404';
      },
      redirectTo: '/404'
    });
    return 0;
  }
]);
