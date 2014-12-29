
/* 
 Controllers
 */
var appControllers;

appControllers = angular.module('appControllers', []);

appControllers.controller('headCtrl', ['$rootScope', function($rootScope) {}]);

appControllers.controller('bodyCtrl', ['APP', '$rootScope', '$location', function(APP, $rootScope, $location) {}]);

appControllers.controller('popupsCtrl', ['APP', '$rootScope', '$scope', '$location', function(APP, $rootScope, $scope, $location) {}]);

appControllers.controller('indexCtrl', [
  'APP', '$rootScope', '$scope', function(APP, $rootScope, $scope) {
    $rootScope.title = "index";
    return $rootScope.bodyClass = "view-index";
  }
]);
