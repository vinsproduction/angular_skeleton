var appDirectives;

appDirectives = angular.module('appDirectives', []);

appDirectives.directive('testDirective', function() {
  return {
    restrict: 'A',
    scope: {},
    link: function(scope, el, attr) {}
  };
});
