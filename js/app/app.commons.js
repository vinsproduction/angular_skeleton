
/* App Run */
app.run([
  'APP', 'Camelcase', '$rootScope', '$location', '$timeout', function(APP, Camelcase, $rootScope, $location, $timeout) {

    /* HELPERS */
    $rootScope.isEmpty = _.isEmpty;

    /* POPUPS */
    (function() {
      var parent, popup, popupClose, popupOpen, popupWatch, popups, watcher;
      parent = $rootScope;
      popup = window.popup;
      popup.logs = false;
      popups = {};
      parent.popups = popups;
      watcher = null;
      _.each(popup.popups, function(popup) {
        var name;
        name = Camelcase(popup.name);
        return popups[name] = {
          popupIsOpen: false
        };
      });
      parent.popupScope = function(name, scope) {
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
      };
      popupOpen = function(popup) {
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
        parent.$digest();
        $timeout(function() {
          if (popups[name].popupOnOpen) {
            return popups[name].popupOnOpen();
          }
        });
      };
      popupClose = function(popup) {
        var name;
        name = Camelcase(popup.name);
        if (!popups[name]) {
          return;
        }
        popups[name].popupIsOpen = false;
        parent.$digest();
        $timeout(function() {
          if (popups[name].popupOnClose) {
            return popups[name].popupOnClose();
          }
        });
      };
      popupWatch = function(name) {
        name = Camelcase(name);
        if (!popups[name]) {
          return;
        }
        watcher = $rootScope.$watchCollection("popups." + name, function(scope) {
          if (scope.popupIsOpen) {
            return $timeout(function() {
              return scope.popupOnOpen();
            });
          } else {
            return $timeout(function() {
              return scope.popupOnClose();
            });
          }
        });
        return watcher;
      };
      popup.$popup.on('open', function(e, popup) {
        popupOpen(popup);
      });
      return popup.$popup.on('close', function(e, popup) {
        popupClose(popup);
      });
    })();
  }
]);
