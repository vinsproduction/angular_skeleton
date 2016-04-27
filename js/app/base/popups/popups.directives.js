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
        scope.popupOnInit = function() {};
        scope.popupOnOpen = function() {};
        scope.popupOnClose = function() {};
      }
    };
  }
]);
