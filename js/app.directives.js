var appDirectives;

appDirectives = angular.module('appDirectives', []);

appDirectives.directive('alertDirective', function() {
  return {
    restrict: 'A',
    scope: {},
    link: function(scope, el, attr) {
      return el.click(function() {
        alert(attr.info + ' : ' + scope.title);
        return console.log('module:', el);
      });
    }
  };
});
