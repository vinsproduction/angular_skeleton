
/* 
 Directives
 */
var appDirectives;

appDirectives = angular.module('appDirectives', []);

appDirectives.directive('placeholderDirective', function() {
  return {
    restrict: 'A',
    scope: {},
    link: function(scope, el, attr) {
      el = $(el);
      el.focus(function() {
        if (el.val() === attr.placeholderDirective) {
          return el.val("");
        }
      });
      el.blur(function() {
        if (el.val() === "") {
          return el.val(attr.placeholderDirective);
        }
      });
      return el.blur();
    }
  };
});
