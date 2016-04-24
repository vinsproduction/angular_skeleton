app.controller('homeViewCtrl', [
  'APP', 'Api', '$rootScope', '$scope', function(APP, Api, $rootScope, $scope) {
    $scope.test = 'home';
    return popup.open('example', {
      scope: {
        title: 'Hello',
        body: 'World',
        test: 2,
        homeScope: $scope
      }
    });
  }
]);
