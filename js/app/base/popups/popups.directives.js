app.directive('examplePopupDirective', [
  'APP', 'Api', '$rootScope', '$compile', function(APP, Api, $rootScope, $compile) {
    return {
      restrict: 'A',
      scope: {
        'popupName': '@popupName'
      },
      controller: function($scope) {
        $rootScope.popupScope($scope.popupName, $scope);
        return $scope.controller = "directive controller";
      },
      link: function(scope, el, attr) {
        $compile(el.contents())(scope);
        scope.directive = "directive link";
        scope.popupOnInit = function() {
          return console.log('init ' + scope.popupName, scope);
        };
        scope.popupOnOpen = function() {
          return console.log('open ' + scope.popupName, scope);
        };
        scope.popupOnClose = function() {
          return console.log('close ' + scope.popupName, scope);
        };
      }
    };
  }
]);
