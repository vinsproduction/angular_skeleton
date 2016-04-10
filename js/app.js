
/* 
 App
 */
var app;

app = angular.module('app', ['ngRoute', 'ngCookies', 'appControllers', 'appDirectives', 'appServices']);

angular.element(document).ready(function() {
  angular.bootstrap(document, ['app']);
  return window.console.info("[App loaded] APP: ", app.APP);
});


/* Дефолтные константы для приложения */

app.APP = (function() {
  var opt, port, url;
  opt = {
    project: 'Angular Skeleton',
    debug: /debug/.test(window.location.search),
    test: /\^?debug=test$/.test(location.search),
    local: window.location.host === "" || /localhost/.test(window.location.host),
    host: window.location.protocol + "//" + window.location.host,
    remoteHost: 'http://vinsproduction.com',
    root: ''
  };

  /* Автоперезагрузка браузера для разработки */
  if (window.WebSocket && /localhost/.test(window.location.host)) {
    port = 777;
    url = "http://localhost:" + port + "/livereload.js";
    window.document.write('<script type="text/javascript" src="' + url + '"></scr' + 'ipt>');
    console.debug("[LiveReload] " + url);
  }
  return opt;
})();

app.constant('APP', (function() {
  return app.APP;
})());


/* Установка и переназначение констант приложения из вне */

app.setApp = function(key, val) {
  return app.constant('APP', (function() {
    app.APP[key] = val;
    return app.APP;
  })());
};


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
  '$route', '$rootScope', '$location', function($route, $rootScope, $location) {

    /* HELPERS */
    return $rootScope.isEmpty = function(val) {
      return val && _.isEmpty(val);
    };
  }
]);
