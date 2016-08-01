app.directive('404-pageViewDirective', [
  'APP', 'Api', '$rootScope', function(APP, Api, $rootScope) {
    return {
      restrict: 'A',
      link: function(scope, el, attr, ctrl, transclude) {}
    };
  }
]);
