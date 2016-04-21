
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
