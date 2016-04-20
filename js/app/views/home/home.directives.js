appDirectives.directive('homeViewDirective', [
  'APP', 'Api', '$rootScope', function(APP, Api, $rootScope) {
    return {
      restrict: 'A',
      controller: function($scope) {},
      link: function(scope, el, attr, ctrl, transclude) {}
    };
  }
]);
