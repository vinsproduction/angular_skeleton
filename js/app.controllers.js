
/* 
 Controllers
 */
var appControllers;

appControllers = angular.module('appControllers', []);

appControllers.controller('headCtrl', ['$rootScope', function($rootScope) {}]);

appControllers.controller('bodyCtrl', ['APP', '$rootScope', '$location', function(APP, $rootScope, $location) {}]);

appControllers.controller('popupsCtrl', ['APP', '$rootScope', '$scope', '$location', function(APP, $rootScope, $scope, $location) {}]);

appControllers.controller('homeCtrl', [
  'APP', '$rootScope', '$scope', '$location', function(APP, $rootScope, $scope, $location) {
    return $rootScope.title = "home";
  }
]);
