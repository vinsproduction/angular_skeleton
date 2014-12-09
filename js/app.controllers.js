var appControllers;

appControllers = angular.module('appControllers', []);

appControllers.controller('headCtrl', ['$rootScope', function($rootScope) {}]).controller('page1Ctrl', [
  'APP', '$rootScope', '$scope', '$route', 'listeners', function(APP, $rootScope, $scope, $route, listeners) {
    $rootScope.title = "title::page-1";
    $rootScope.bodyClass = "page-1";
    $scope.title = 'page-1';
    $scope.phones = [
      {
        'name': 'Nexus'
      }, {
        'name': 'Motorola'
      }, {
        'name': 'Nokia'
      }
    ];
    return $scope.add = function(vars, event) {
      $scope.phones.push({
        'name': 'Samsung'
      });
      return $scope.$broadcast('dataloaded');
    };
  }
]).directive('section1', [
  '$rootScope', function($rootScope) {
    return {
      restrict: 'C',
      link: function(scope, el, attr) {}
    };
  }
]).directive('section2', [
  '$rootScope', function($rootScope) {
    return {
      restrict: 'C',
      link: function(scope, el, attr) {
        var logit;
        logit = function() {
          var p;
          return p = el.find('.list > p');
        };
        _.defer(function() {
          return logit();
        });
        return scope.$on('dataloaded', function() {
          return _.defer(function() {
            return logit();
          });
        });
      }
    };
  }
]).controller('page2Ctrl', [
  'APP', 'api', '$rootScope', '$scope', '$routeParams', function(APP, api, $rootScope, $scope, $routeParams) {
    $rootScope.title = "title::page-2";
    $rootScope.bodyClass = "page-2";
    $scope.title = 'page-' + $routeParams.pageId;
    $scope.state = 'hide';
    $scope.show = function(vars, event) {
      return $scope.state = 'show';
    };
    return $scope.request = function() {
      return api({
        url: '/api/user/details',
        params: {
          id: 1
        }
      }).success(function(res) {
        return $scope.response = res;
      });
    };
  }
]);
