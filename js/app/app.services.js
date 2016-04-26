
/* Services */

/*
	Обертка для $http
	Http({url:'/'}).success((res) -> ).error((res) -> )
 */
app.factory("Http", [
  '$http', function($http) {
    var defaultOptions, request;
    defaultOptions = {
      log: true,
      method: 'GET',
      url: "",
      headers: {},
      data: {}
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
          return console.debug("[" + config.method + " " + status + "] " + config.url + " | success:", response);
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
  'Http', 'APP', function(Http, APP) {
    var request;
    request = function(options) {
      if (options == null) {
        options = {};
      }
      options.url = APP.host + '/api/' + options.url;
      options.xsrfHeaderName = 'X-CSRFToken';
      options.xsrfCookieName = 'csrftoken';
      request = Http(options);
      request.success(function(response, status, headers, config) {});
      request.error(function(response, status, headers, config) {});
      return request;
    };
    return request;
  }
]);


/*
	POPUPS (adapter for window.popup)

	popup.open('example',{scope:{test:1}}) # open popup
	Popup.scope(popupName, $scope) # merge popup scope
 */

app.factory("Popup", [
  '$rootScope', 'Camelcase', '$timeout', function($rootScope, Camelcase, $timeout) {
    var close, obj, open, parent, popup, popupParent, popups;
    parent = $rootScope;
    popupParent = window.popup;
    popupParent.logs = false;
    popup = {};
    popup = {
      open: function(name, opt) {
        return popupParent.open.call(popupParent, name, opt);
      },
      close: function() {
        return popupParent.close.call(popupParent);
      }
    };
    parent.popup = popup;
    popups = {};
    parent.popups = popups;
    _.each(popupParent.popups, function(popup) {
      var name;
      name = Camelcase(popup.name);
      return popups[name] = {
        popupIsOpen: false
      };
    });
    open = function(popup) {
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
      $timeout(function() {
        if (popups[name].popupOnOpen) {
          return popups[name].popupOnOpen();
        }
      });
    };
    close = function(popup) {
      var name;
      name = Camelcase(popup.name);
      if (!popups[name]) {
        return;
      }
      popups[name].popupIsOpen = false;
      $timeout(function() {
        if (popups[name].popupOnClose) {
          return popups[name].popupOnClose();
        }
      });
    };
    popupParent.$popup.on('open', function(e, popup) {
      open(popup);
    });
    popupParent.$popup.on('close', function(e, popup) {
      close(popup);
    });
    obj = {
      watch: function(name) {
        var watcher;
        name = Camelcase(name);
        if (!popups[name]) {
          return;
        }
        watcher = parent.$watchCollection("popups." + name, function(scope) {
          console.log('Popup watch:change', scope);
          if (scope.popupIsOpen) {
            return $timeout(function() {
              return console.log('Popup watch:open', scope);
            });
          } else {
            return $timeout(function() {
              return console.log('Popup watch:close', scope);
            });
          }
        });
        return watcher;
      },
      scope: function(name, scope) {
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
      }
    };
    return obj;
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
