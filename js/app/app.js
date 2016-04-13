var app;

(function() {

  /* LIVERELOAD */
  var port, script, url;
  if (window.WebSocket && /localhost/.test(window.location.host)) {
    port = 35729;
    url = "http://localhost:" + port + "/livereload.js";
    script = document.createElement('script');
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
    return console.debug("[LiveReload] " + url);
  }
})();


/* App */

app = angular.module('app', ['ngCookies', 'appControllers', 'appDirectives', 'appServices']);


/* App Init */

angular.element(document).ready(function() {
  return angular.bootstrap(document, ['app']);
});


/* Дефолтные настройки для приложения */

app.constant('APP', {
  project: 'Angular Skeleton',
  debug: /debug/.test(window.location.search),
  test: /\^?debug=test$/.test(location.search),
  local: window.location.host === "" || /localhost/.test(window.location.host),
  host: window.location.protocol + "//" + window.location.host,
  remoteHost: '',
  staticUrl: ''
});


/* Установки шаблонизатора */

app.config([
  '$interpolateProvider', function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
    return 0;
  }
]);


/* Отображать теги */

app.config([
  '$sceProvider', function($sceProvider) {
    $sceProvider.enabled(false);
    return 0;
  }
]);

app.run([
  'APP', '$rootScope', '$location', function(APP, $rootScope, $location) {
    window.console.groupCollapsed("[App] " + APP.project + " run");
    window.console.log("APP:", APP);
    window.console.log("app:", app);
    window.console.groupEnd();

    /* HELPERS */
    return $rootScope.isEmpty = function(val) {
      return val && _.isEmpty(val);
    };
  }
]);
