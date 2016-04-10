
/* 
 Controllers
 */
var appControllers;

appControllers = angular.module('appControllers', []);

appControllers.controller('headerCtrl', ['APP', '$rootScope', '$scope', '$location', function(APP, $rootScope, $scope, $location) {}]);

appControllers.controller('footerCtrl', ['APP', '$rootScope', '$scope', '$location', function(APP, $rootScope, $scope, $location) {}]);

appControllers.controller('bodyCtrl', ['APP', '$rootScope', '$scope', '$location', function(APP, $rootScope, $scope, $location) {}]);

appControllers.controller('popupsCtrl', ['APP', '$rootScope', '$scope', '$location', function(APP, $rootScope, $scope, $location) {}]);

appControllers.controller('homeCtrl', [
  'APP', '$rootScope', '$scope', '$location', function(APP, $rootScope, $scope, $location) {
    return $rootScope.title = "home";
  }
]).directive('homeDirective', [
  'APP', '$rootScope', '$location', function(APP, $rootScope, $location) {
    return {
      restrict: 'A',
      link: function(scope, el, attr) {}
    };
  }
]);
