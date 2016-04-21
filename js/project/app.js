
/* App */
var app;

app = angular.module('app', ['ngCookies', 'angular-underscore']);


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
  'APP', 'Camelcase', '$rootScope', '$location', function(APP, Camelcase, $rootScope, $location) {

    /* HELPERS */

    /* POPUPS */
    popup.logs = false;
    $rootScope.popups = {};
    _.each(popup.popups, function(data) {
      return $rootScope.popups[Camelcase(data.name)] = {};
    });
  }
]);


/* Services */

/*
	Обертка для $http
	Http({url:'/'}).success((res) -> ).error((res) -> )
 */
app.factory("Http", [
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

app.factory("Api", [
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
      if (!options.data) {
        options.data = {};
      }
      request = Http(options);
      request.success(function(response, status, headers, config) {});
      request.error(function(response, status, headers, config) {});
      return request;
    };
    return request;
  }
]);

app.factory('Camelcase', [
  function() {
    return function(str) {
      return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
        if (index === 0) {
          return letter.toLowerCase();
        } else {
          return letter.toUpperCase();
        }
      }).replace(/\s+/g, '');
    };
  }
]);

app.controller('headerLayoutCtrl', ['APP', 'Api', '$rootScope', '$scope', function(APP, Api, $rootScope, $scope) {}]);

app.controller('footerLayoutCtrl', ['APP', 'Api', '$rootScope', '$scope', function(APP, Api, $rootScope, $scope) {}]);

app.controller('mainLayoutCtrl', ['APP', 'Api', '$rootScope', '$scope', function(APP, Api, $rootScope, $scope) {}]);

app.controller('viewsLayoutCtrl', ['APP', 'Api', '$rootScope', '$scope', function(APP, Api, $rootScope, $scope) {}]);



app.controller('popupsCtrl', ['APP', 'Api', '$rootScope', '$scope', function(APP, Api, $rootScope, $scope) {}]);



app.controller('homeViewCtrl', ['APP', 'Api', '$rootScope', '$scope', function(APP, Api, $rootScope, $scope) {}]);

app.directive('homeViewDirective', [
  'APP', 'Api', '$rootScope', function(APP, Api, $rootScope) {
    return {
      restrict: 'A',
      link: function(scope, el, attr, ctrl, transclude) {}
    };
  }
]);
