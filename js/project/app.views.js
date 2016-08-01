app.controller('404-pageViewCtrl', ['APP', 'Api', '$rootScope', '$scope', function(APP, Api, $rootScope, $scope) {}]);

app.directive('404-pageViewDirective', [
  'APP', 'Api', '$rootScope', function(APP, Api, $rootScope) {
    return {
      restrict: 'A',
      link: function(scope, el, attr, ctrl, transclude) {}
    };
  }
]);

app.controller('homeViewCtrl', ['APP', 'Api', '$rootScope', '$scope', function(APP, Api, $rootScope, $scope) {}]);

app.directive('homeViewDirective', [
  'APP', 'Api', '$rootScope', function(APP, Api, $rootScope) {
    return {
      restrict: 'A',
      link: function(scope, el, attr, ctrl, transclude) {}
    };
  }
]);
