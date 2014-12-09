var appControllers;

appControllers = angular.module('appControllers', []);

appControllers.controller('headCtrl', ['$rootScope', function($rootScope) {}]);

appControllers.controller('testCtrl', [
  'APP', '$rootScope', '$scope', function(APP, $rootScope, $scope) {
    $rootScope.title = "test";
    return $rootScope.bodyClass = "test";
  }
]).directive('testCtrlDirective', [
  '$rootScope', function($rootScope) {
    return {
      restrict: 'C',
      link: function(scope, el, attr) {}
    };
  }
]);
