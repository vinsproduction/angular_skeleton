
/* App Commons */
app.run([
  'APP', '$rootScope', function(APP, $rootScope) {

    /* HELPERS */
    var declOfNum;
    $rootScope.isEmpty = _.isEmpty;
    $rootScope.size = _.size;
    declOfNum = function(number, titles) {
      var cases;
      cases = [2, 0, 1, 1, 1, 2];
      return titles[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]];
    };
  }
]);


/* FORMS */

app.forms = {};

app.forms.scroll = function(el) {
  var $options, $select, $selected;
  $select = el;
  $selected = $select.find('[data-selected]');
  $options = $select.find('[data-options]');
  if (!$select.find('.scrollbar').size()) {
    $options.wrapInner("<div class=\"viewport\"><div class=\"overview\"></div></div>");
    $options.prepend("<div class=\"scrollbar\"><div class=\"track\"><div class=\"thumb\"><div class=\"end\"></div></div></div></div>");
  }
  _.defer(function() {
    var scrollbar;
    scrollbar = $options.tinyscrollbar({
      sizethumb: 40,
      wheel: ($$.browser.mobile ? 2 : 40),
      invertscroll: $$.browser.mobile
    });
    $selected.click(function() {
      return scrollbar.tinyscrollbar_update();
    });
    return scrollbar.tinyscrollbar_update();
  });
};
