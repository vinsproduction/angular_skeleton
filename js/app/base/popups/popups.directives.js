app.directive('examplePopupDirective', [
  'APP', 'Api', 'Popup', '$rootScope', '$compile', function(APP, Api, Popup, $rootScope, $compile) {
    return {
      restrict: 'A',
      scope: {
        'popupName': '@popupName'
      },
      controller: function($scope) {
        return Popup.scope($scope.popupName, $scope);
      },
      link: function(scope, el, attr) {
        $compile(el.contents())(scope);
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
