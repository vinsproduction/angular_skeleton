
/* App */
var app, appControllers, appDirectives, appServices;

app = angular.module('app', ['ngCookies', 'appControllers', 'appDirectives', 'appServices']);


/* App Modules */

appControllers = angular.module('appControllers', []);

appDirectives = angular.module('appDirectives', []);

appServices = angular.module('appServices', []);


/* App Init */

angular.element(document).ready(function() {
  return angular.bootstrap(document, ['app']);
});


/* App Constants */

app.constant('APP', {
  debug: /debug/.test(window.location.search),
  test: /\^?debug=test$/.test(location.search),
  local: window.location.host === "" || /localhost/.test(window.location.host),
  host: window.location.protocol + "//" + window.location.host,
  remoteHost: '',
  staticUrl: ''
});

app.run([
  'APP', function(APP) {
    window.console.groupCollapsed("[App] init");
    window.console.log("APP:", APP);
    window.console.log("app:", app);
    window.console.groupEnd();
  }
]);


/* App Config */

/* Установки шаблонизатора */
app.config([
  '$interpolateProvider', function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
  }
]);


/* Отображение тегов */

app.config([
  '$sceProvider', function($sceProvider) {
    $sceProvider.enabled(false);
  }
]);




/* App Run */
app.run([
  'APP', '$rootScope', '$location', function(APP, $rootScope, $location) {

    /* HELPERS */
    $rootScope.isEmpty = function(val) {
      return val && _.isEmpty(val);
    };
  }
]);


/* Services */

/*
	Обертка для $http
	Http({url:'/'}).success((res) -> ).error((res) -> )
 */
appServices.factory("Http", [
  '$http', function($http) {
    var defaultOptions, request;
    defaultOptions = {
      log: true
    };
    request = function(options) {
      var log, params, ref;
      if (options == null) {
        options = {};
      }
      log = (ref = options.log) != null ? ref : defaultOptions.log;
      params = angular.extend({}, defaultOptions, options);
      delete params.log;
      request = $http(params);
      request.success(function(response, status, headers, config) {
        if (log) {
          return console.debug("[" + config.method + " " + status + "] " + config.url + " | success:", response, "| config:", config);
        }
      });
      request.error(function(response, status, headers, config) {
        if (log) {
          return console.error("[" + config.method + " " + status + "] " + config.url + " | error:", response, "| config:", config);
        }
      });
      return request;
    };
    return request;
  }
]);


/*
	Api

	Api({ method: 'POST', url:"email", data: {email: 'example.com'}})
		.error (res) -> console.error res
		.success (res) ->
			return if res.status isnt 'success'
 */

appServices.factory("Api", [
  'Http', 'APP', '$cookieStore', function(Http, APP, $cookieStore) {
    var request;
    request = function(options) {
      if (options == null) {
        options = {};
      }
      options.url = host + '/' + options.url;
      options.xsrfHeaderName = 'X-CSRFToken';
      options.xsrfCookieName = 'csrftoken';
      if (!options.headers) {
        options.headers = {};
      }
      request = Http(options);
      request.success(function(response, status, headers, config) {});
      request.error(function(response, status, headers, config) {});
      return request;
    };
    return request;
  }
]);

appControllers.controller('headerLayoutCtrl', ['APP', 'Api', '$rootScope', '$scope', function(APP, Api, $rootScope, $scope) {}]);

appControllers.controller('footerLayoutCtrl', ['APP', 'Api', '$rootScope', '$scope', function(APP, Api, $rootScope, $scope) {}]);

appControllers.controller('viewsLayoutCtrl', ['APP', 'Api', '$rootScope', '$scope', function(APP, Api, $rootScope, $scope) {}]);



appControllers.controller('popupsCtrl', ['APP', 'Api', '$rootScope', '$scope', function(APP, Api, $rootScope, $scope) {}]);



appControllers.controller('homeViewCtrl', ['APP', 'Api', '$rootScope', '$scope', function(APP, Api, $rootScope, $scope) {}]);

appDirectives.directive('homeViewDirective', [
  'APP', 'Api', '$rootScope', function(APP, Api, $rootScope) {
    return {
      restrict: 'A',
      link: function(scope, el, attr, ctrl, transclude) {}
    };
  }
]);
