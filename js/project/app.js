
/* App */
var app;

app = angular.module('app', ['ngCookies']);


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


/* App Run */
app.run([
  'APP', 'Camelcase', '$rootScope', '$location', '$timeout', function(APP, Camelcase, $rootScope, $location, $timeout) {

    /* HELPERS */
    $rootScope.isEmpty = _.isEmpty;

    /* POPUPS */
    (function() {
      var parent, popup, popupClose, popupOpen, popupWatch, popups, watcher;
      parent = $rootScope;
      popup = window.popup;
      popup.logs = false;
      popups = {};
      parent.popups = popups;
      watcher = null;
      _.each(popup.popups, function(popup) {
        var name;
        name = Camelcase(popup.name);
        return popups[name] = {
          popupIsOpen: false
        };
      });
      parent.popupScope = function(name, scope) {
        if (!name) {
          return popups[name];
        }
        name = Camelcase(name);
        if (!popups[name]) {
          return;
        }
        popups[name] = angular.extend(scope, popups[name]);
        $timeout(function() {
          if (popups[name].popupOnInit) {
            return popups[name].popupOnInit();
          }
        });
        return popups[name];
      };
      popupOpen = function(popup) {
        var name;
        name = Camelcase(popup.name);
        if (!popups[name]) {
          return;
        }
        if (!popup.opt) {
          popup.opt = {};
        }
        if (!popup.opt.scope) {
          popup.opt.scope = {};
        }
        popups[name] = angular.extend(popups[name], popup.opt.scope);
        popups[name].popupIsOpen = true;
        parent.$digest();
        $timeout(function() {
          if (popups[name].popupOnOpen) {
            return popups[name].popupOnOpen();
          }
        });
      };
      popupClose = function(popup) {
        var name;
        name = Camelcase(popup.name);
        if (!popups[name]) {
          return;
        }
        popups[name].popupIsOpen = false;
        parent.$digest();
        $timeout(function() {
          if (popups[name].popupOnClose) {
            return popups[name].popupOnClose();
          }
        });
      };
      popupWatch = function(name) {
        name = Camelcase(name);
        if (!popups[name]) {
          return;
        }
        watcher = $rootScope.$watchCollection("popups." + name, function(scope) {
          if (scope.popupIsOpen) {
            return $timeout(function() {
              return scope.popupOnOpen();
            });
          } else {
            return $timeout(function() {
              return scope.popupOnClose();
            });
          }
        });
        return watcher;
      };
      popup.$popup.on('open', function(e, popup) {
        popupOpen(popup);
      });
      return popup.$popup.on('close', function(e, popup) {
        popupClose(popup);
      });
    })();
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
      }).replace(/\s+/g, '').replace(/\-/g, '');
    };
  }
]);

app.controller('headerLayoutCtrl', ['APP', 'Api', '$rootScope', '$scope', function(APP, Api, $rootScope, $scope) {}]);

app.controller('footerLayoutCtrl', ['APP', 'Api', '$rootScope', '$scope', function(APP, Api, $rootScope, $scope) {}]);

app.controller('mainLayoutCtrl', ['APP', 'Api', '$rootScope', '$scope', function(APP, Api, $rootScope, $scope) {}]);

app.controller('viewsLayoutCtrl', ['APP', 'Api', '$rootScope', '$scope', function(APP, Api, $rootScope, $scope) {}]);



app.controller('popupsCtrl', ['APP', 'Api', '$rootScope', '$scope', 'Camelcase', function(APP, Api, $rootScope, $scope, Camelcase) {}]);

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

app.directive('homeViewDirective', [
  'APP', 'Api', '$rootScope', function(APP, Api, $rootScope) {
    return {
      restrict: 'A',
      link: function(scope, el, attr, ctrl, transclude) {}
    };
  }
]);
