
/* 
 Controllers
 */
var appControllers;

appControllers = angular.module('appControllers', []);

appControllers.controller('headCtrl', ['$rootScope', function($rootScope) {}]);

appControllers.controller('indexCtrl', [
  'APP', '$rootScope', '$scope', function(APP, $rootScope, $scope) {
    $rootScope.title = "index";
    return $rootScope.bodyClass = "view-index";
  }
]).directive('indexCtrlDirective', [
  '$rootScope', function($rootScope) {
    return {
      restrict: 'C',
      link: function(scope, el, attr) {}
    };
  }
]);
