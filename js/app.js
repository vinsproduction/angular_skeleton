
/* 
 App
 */
var app;

app = angular.module('app', ['ngRoute', 'ngCookies', 'appControllers', 'appDirectives', 'appServices']);

angular.element(document).ready(function() {
  angular.bootstrap(document, ['app']);
  return window.console.info("[app loaded] APP: ", app.APP);
});


/* Дефолтные константы для приложения */

app.APP = (function() {
  var opt, port, url;
  opt = {
    remoteHost: 'http://vinsproduction.com',
    host: window.location.protocol + "//" + window.location.host,
    debug: /debug/.test(window.location.search),
    local: window.location.host === "" || /localhost/.test(window.location.host)
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

app.config(['$interpolateProvider', function($interpolateProvider) {}]);
