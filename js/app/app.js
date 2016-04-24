
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
