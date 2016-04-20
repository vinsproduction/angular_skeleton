
/* App */
var app, appControllers, appDirectives, appServices;

app = angular.module('app', ['ngCookies', 'appControllers', 'appDirectives', 'appServices']);

appControllers = angular.module('appControllers', []);

appDirectives = angular.module('appDirectives', []);

appServices = angular.module('appServices', []);


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
  }
]);


/* Отображать теги */

app.config([
  '$sceProvider', function($sceProvider) {
    $sceProvider.enabled(false);
  }
]);

app.run([
  'APP', '$rootScope', '$location', function(APP, $rootScope, $location) {
    window.console.groupCollapsed("[App] " + APP.project + " run");
    window.console.log("APP:", APP);
    window.console.log("app:", app);
    window.console.groupEnd();
  }
]);
