
/* Controllers */
var appControllers;

appControllers = angular.module('appControllers', []);

appControllers.controller('headerCtrl', ['APP', 'api', '$rootScope', '$scope', '$location', function(APP, api, $rootScope, $scope) {}]);

appControllers.controller('footerCtrl', ['APP', 'api', '$rootScope', '$scope', '$location', function(APP, api, $rootScope, $scope) {}]);

appControllers.controller('viewsCtrl', ['APP', 'api', '$rootScope', '$scope', '$location', function(APP, api, $rootScope, $scope) {}]);

appControllers.controller('popupsCtrl', ['APP', 'api', '$rootScope', '$scope', '$location', function(APP, api, $rootScope, $scope) {}]);

appControllers.controller('viewHomeCtrl', [
  'size', 'APP', 'api', '$rootScope', '$scope', '$location', function(size, APP, api, $rootScope, $scope) {
    $rootScope.title = "home";
  }
]).directive('homeDirective', [
  'APP', 'api', '$rootScope', '$location', function(APP, api, $rootScope, $location) {
    return {
      restrict: 'A',
      link: function(scope, el, attr, ctrl, transclude) {}
    };
  }
]);
