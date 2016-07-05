
/* App */
var app;

app = angular.module('app', ['ngCookies']);


/* App Init */

angular.element(document).ready(function() {
  return angular.bootstrap(document, ['app']);
});


/* App Constants */

app.constant('APP', {
  debug: (function() {
    var obj;
    if (!/debug/.test(window.location.search)) {
      return false;
    }
    obj = {
      test: /\^?debug=test$/.test(location.search),
      api: /\^?debug=api$/.test(location.search)
    };
    return obj;
  })(),
  local: window.location.host === "" || /localhost/.test(window.location.host),
  host: window.location.protocol + "//" + window.location.host
});

app.run([
  'APP', '$rootScope', function(APP, $rootScope) {
    window.console.groupCollapsed("[App] init");
    window.console.log("APP:", APP);
    window.console.log("app:", app);
    window.console.groupEnd();
  }
]);


/* App Commons */
app.run([
  'APP', '$rootScope', function(APP, $rootScope) {

    /* HELPERS */
    var declOfNum;
    $rootScope.isEmpty = _.isEmpty;
    $rootScope.size = _.size;
    declOfNum = function(number, titles) {
      var cases;
      cases = [2, 0, 1, 1, 1, 2];
      return titles[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]];
    };
  }
]);


/* FORMS */

app.forms = {};

app.forms.scroll = function(el) {
  var $options, $select, $selected;
  $select = el;
  $selected = $select.find('[data-selected]');
  $options = $select.find('[data-options]');
  if (!$select.find('.scrollbar').size()) {
    $options.wrapInner("<div class=\"viewport\"><div class=\"overview\"></div></div>");
    $options.prepend("<div class=\"scrollbar\"><div class=\"track\"><div class=\"thumb\"><div class=\"end\"></div></div></div></div>");
  }
  _.defer(function() {
    var scrollbar;
    scrollbar = $options.tinyscrollbar({
      sizethumb: 40,
      wheel: ($$.browser.mobile ? 2 : 40),
      invertscroll: $$.browser.mobile
    });
    $selected.click(function() {
      return scrollbar.tinyscrollbar_update();
    });
    return scrollbar.tinyscrollbar_update();
  });
};


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


/* Directives */
app.directive('tabsDirective', [
  '$rootScope', '$window', '$location', function($rootScope, $window, $location) {
    return {
      restrict: 'A',
      link: function(scope, el, attr) {
        var $labels, $tabs, openTab;
        $tabs = $(el);
        $labels = $tabs.find('> .labels');
        $rootScope.$on('$locationChangeStart', function(next, current) {
          var name;
          name = $location.path().replace('/', '');
          openTab(name);
        });
        $labels.on('click', '.label', function() {
          var name;
          name = $(this).attr('data-tab');
          $location.path(name);
          $rootScope.$apply();
        });
        openTab = function(name) {
          var $content, $label;
          $label = $labels.find('> .label');
          $content = $tabs.find('> .contents > .content');
          if ($label.filter("[data-tab='" + name + "']").size()) {
            $label.removeClass('active');
            $content.removeClass('active');
            $label.filter("[data-tab='" + name + "']").addClass('active');
            $content.filter("[data-tab='" + name + "']").addClass('active');
          }
        };
      }
    };
  }
]);




/* Services */

/*
	Обертка для $http
	Http({url:'/'}).success((res) -> ).error((res) -> )
 */
app.factory("Http", [
  '$http', 'APP', function($http, APP) {
    var defaultOptions, request;
    defaultOptions = {
      log: true,
      method: 'GET',
      url: "",
      headers: {},
      data: {}
    };
    request = function(options) {
      var debug, log, params, ref;
      if (options == null) {
        options = {};
      }
      log = (ref = options.log) != null ? ref : defaultOptions.log;
      debug = APP.debug.api ? "DEBUG API " : "";
      params = angular.extend({}, defaultOptions, options);
      delete params.log;
      request = $http(params);
      request.success(function(response, status, headers, config) {
        if (log) {
          return console.debug("[" + debug + config.method + " " + status + "] " + config.url + " | data:", config.data, "| success:", response);
        }
      });
      request.error(function(response, status, headers, config) {
        if (log) {
          return console.error("[" + debug + config.method + " " + status + "] " + config.url + " | error:", response, "| config:", config);
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
      if (!parent.$$phase) {
        parent.$digest();
      }
      $timeout(function() {
        $(window).resize();
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
      if (!parent.$$phase) {
        parent.$digest();
      }
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

app.controller('headerLayoutCtrl', ['APP', 'Api', '$rootScope', '$scope', function(APP, Api, $rootScope, $scope) {}]);

app.controller('footerLayoutCtrl', ['APP', 'Api', '$rootScope', '$scope', function(APP, Api, $rootScope, $scope) {}]);

app.controller('mainLayoutCtrl', ['APP', 'Api', '$rootScope', '$scope', function(APP, Api, $rootScope, $scope) {}]);

app.controller('viewsLayoutCtrl', ['APP', 'Api', '$rootScope', '$scope', function(APP, Api, $rootScope, $scope) {}]);



app.controller('popupsCtrl', ['APP', 'Api', 'Popup', '$rootScope', '$scope', '$timeout', function(APP, Api, Popup, $rootScope, $scope, $timeout) {}]);



app.controller('homeViewCtrl', ['APP', 'Api', '$rootScope', '$scope', function(APP, Api, $rootScope, $scope) {}]);

app.directive('homeViewDirective', [
  'APP', 'Api', '$rootScope', function(APP, Api, $rootScope) {
    return {
      restrict: 'A',
      link: function(scope, el, attr, ctrl, transclude) {}
    };
  }
]);
