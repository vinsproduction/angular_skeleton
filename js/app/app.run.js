
/* App Run */
app.run([
  'APP', '$rootScope', '$location', function(APP, $rootScope, $location) {

    /* HELPERS */
    $rootScope.isEmpty = function(val) {
      return val && _.isEmpty(val);
    };
  }
]);
