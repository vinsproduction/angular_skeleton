
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
