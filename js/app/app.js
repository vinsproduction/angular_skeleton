
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
