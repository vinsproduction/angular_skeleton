
/* Services */
var appServices;

appServices = angular.module('appServices', []);


/*
	Обертка для $http
	http({url:'/'}).success((res) -> ).error((res) -> )
 */

appServices.factory("http", [
  '$http', function($http) {
    var defaultOptions, request;
    defaultOptions = {
      log: true
    };
    request = function(options) {
      var log, params, ref;
      if (options == null) {
        options = {};
      }
      log = (ref = options.log) != null ? ref : defaultOptions.log;
      params = angular.extend({}, defaultOptions, options);
      delete params.log;
      request = $http(params);
      request.success(function(response, status, headers, config) {
        if (log) {
          return console.debug("[" + config.method + " " + status + "] " + config.url + " | success:", response, "| config:", config);
        }
      });
      request.error(function(response, status, headers, config) {
        if (log) {
          return console.error("[" + config.method + " " + status + "] " + config.url + " | error:", response, "| config:", config);
        }
      });
      return request;
    };
    return request;
  }
]);


/*
	Api

	api({ method: 'POST', url:"email", data: {email: 'example.com'}})
		.error (res) -> console.error res
		.success (res) ->
			return if res.status isnt 'success'
 */

appServices.factory("api", [
  'http', 'APP', '$cookieStore', function(http, APP, $cookieStore) {
    var request;
    request = function(options) {
      if (options == null) {
        options = {};
      }
      options.url = host + '/' + options.url;
      options.xsrfHeaderName = 'X-CSRFToken';
      options.xsrfCookieName = 'csrftoken';
      if (!options.headers) {
        options.headers = {};
      }
      request = http(options);
      request.success(function(response, status, headers, config) {});
      request.error(function(response, status, headers, config) {});
      return request;
    };
    return request;
  }
]);


/*

	Listeners

	listeners.onScroll (v) ->
	listeners.onResize (v) ->
	listeners.onHash (v) ->
 */

appServices.factory("listeners", [
  'scroll', 'size', function(scroll, size) {
    var Factory, factory;
    Factory = (function() {
      function Factory() {

        /* Scroll */

        /* Listener callback scroll
        			listeners.onScroll (v) ->
         */
        var debounced, lastScrollTop, throttled;
        this.onScroll = function(callback) {
          return $(window).on('AppOnScroll', function(event, v) {
            if (callback) {
              return callback(v);
            }
          });
        };
        lastScrollTop = 0;
        throttled = _.throttle(function() {
          var action, isBottom, top, vars;
          top = scroll();
          if (top !== lastScrollTop) {
            isBottom = top + $(window).height() >= $(document).height();
            action = top > lastScrollTop ? 'down' : 'up';
            lastScrollTop = top;
            vars = {
              top: top,
              isBottom: isBottom,
              action: action
            };
            return $(window).trigger("AppOnScroll", [vars]);
          }
        }, 100);
        $(window).scroll(throttled);

        /* Resize */

        /* Listener callback resize
        			listeners.onResize (v) ->
         */
        this.onResize = function(callback) {
          return $(window).on('AppOnResize', function(event, v) {
            if (callback) {
              return callback(v);
            }
          });
        };
        debounced = _.debounce(function() {
          return $(window).trigger("AppOnResize", [size()]);
        }, 300);
        $(window).resize(debounced);
        _.defer(function() {
          return $(window).resize();
        });

        /* Hash change */

        /* Listener callback Hash
        			listeners.onHash (v) ->
         */
        this.onHash = function(callback) {
          var set;
          set = false;
          $(window).on('AppOnHash', function(event, v) {
            if (callback) {
              return callback(v);
            }
          });
          if (!set) {
            if (callback) {
              callback(window.location.hash);
            }
            return set = true;
          }
        };
        $(window).on('hashchange', (function(_this) {
          return function() {
            return $(window).trigger("AppOnHash", [window.location.hash]);
          };
        })(this));
        $(window).trigger('hashchange');
      }

      return Factory;

    })();
    factory = new Factory;
    return factory;
  }
]);


/*
	Scroll

	scroll(500)
	scroll(500,true)
	scroll('section#guests',true)
	scroll('section#guests',{time:500,easing:'easeOutElastic',done:function(){console.log('animate complete');}})
	scroll($('section#guests'))
 */

appServices.factory("scroll", [
  function() {
    return function(v, animate) {
      var callback, easing, el, time;
      time = (animate != null ? animate.time : void 0) || 800;
      easing = (animate != null ? animate.easing : void 0) || 'linear';
      callback = false;
      if ((v != null) && _.isString(v)) {
        el = $(v);
        if (el[0] && _.isElement(el[0])) {
          if (animate) {
            return $('html,body').stop().animate({
              scrollTop: el.offset().top
            }, time, easing, function() {
              if (!callback) {
                callback = true;
                if (animate.done) {
                  return animate.done();
                }
              }
            });
          } else {
            return $('html,body').scrollTop(el.offset().top);
          }
        }
      } else if ((v != null) && v[0] && _.isElement(v[0])) {
        if (animate) {
          return $('html,body').stop().animate({
            scrollTop: v.offset().top
          }, time, easing, function() {
            if (!callback) {
              callback = true;
              if (animate.done) {
                return animate.done();
              }
            }
          });
        } else {
          return $('html,body').scrollTop(v.offset().top);
        }
      } else if (v != null) {
        if (animate) {
          return $('html,body').stop().animate({
            scrollTop: v
          }, time, easing, function() {
            if (!callback) {
              callback = true;
              if (animate.done) {
                return animate.done();
              }
            }
          });
        } else {
          return $('html,body').scrollTop(v);
        }
      } else {
        return $(window).scrollTop();
      }
    };
  }
]);


/* Size */

appServices.factory("size", [
  function() {
    var size;
    size = function() {
      var selectors;
      selectors = {
        "window": window,
        "document": document,
        "body": "body",
        "main": "body > main",
        "header": "body > main > header",
        "footer": "body > main > footer",
        "views": "body > main > .views"
      };
      return $.each(selectors, function(k, selector) {
        var el;
        el = $(selector);
        return selectors[k] = {
          height: parseInt(el.height()),
          width: parseInt(el.width()),
          innerHeight: parseInt(el.innerHeight()),
          innerWidth: parseInt(el.innerWidth()),
          outerHeight: parseInt(el.outerHeight()),
          outerWidth: parseInt(el.outerWidth())
        };
      });
    };
    return size;
  }
]);