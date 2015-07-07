
/* 
 Controllers
 */
var appControllers;

appControllers = angular.module('appControllers', []);

appControllers.controller('popupsCtrl', ['APP', '$rootScope', '$scope', '$location', function(APP, $rootScope, $scope, $location) {}]);

appControllers.controller('homeCtrl', [
  'APP', '$rootScope', '$scope', '$location', function(APP, $rootScope, $scope, $location) {
    return $rootScope.title = "home";
  }
]).directive('homeDirective', [
  '$rootScope', '$location', function($rootScope, $location) {
    return {
      restrict: 'A',
      link: function(scope, el, attr) {}
    };
  }
]);
