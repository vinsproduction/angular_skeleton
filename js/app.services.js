
/* 
 Services
 */
var appServices;

appServices = angular.module('appServices', []);


/* Обертка для $http

	http({url:'/'}).success((res) -> ).error((res) -> )
 */

appServices.factory("http", [
  '$http', function($http) {
    var defaultOptions, request;
    defaultOptions = {
      log: true
    };
    request = function(options) {
      var log, params, _ref;
      if (options == null) {
        options = {};
      }
      log = (_ref = options.log) != null ? _ref : defaultOptions.log;
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


/* Api

	api({url:'/'}).success((res) -> ).error((res) -> )
 */

appServices.factory("api", [
  'http', 'APP', '$cookieStore', function(http, APP, $cookieStore) {
    var request;
    request = function(options) {
      var host;
      if (options == null) {
        options = {};
      }
      host = APP.local ? APP.remoteHost : APP.host;
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


/* Listeners

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
          return $(window).trigger("AppOnResize", [size]);
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


/* Scroll
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
      easing = (animate != null ? animate.easing : void 0) || 'easeOutCubic';
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
    return {
      windowWidth: $(window).width(),
      windowHeight: $(window).height(),
      documentWidth: $(document).width(),
      documentHeight: $(document).height(),
      bodyWidth: parseInt($('body').width()),
      bodyHeight: parseInt($('body').height()),
      mainWidth: parseInt($('body > main').width()),
      mainHeight: parseInt($('body > main').height()),
      headerWidth: parseInt($('body > main > header').width()),
      headerHeight: parseInt($('body > main > header').height()),
      footerWidth: parseInt($('body > main > footer').width()),
      footerHeight: parseInt($('body > main > footer').height()),
      sectionsWidth: parseInt($('body > main > .sections').width()),
      sectionsHeight: parseInt($('body > main > .sections').height())
    };
  }
]);


/* Социальные настройки (Не проверено на Ангуларе!) */

appServices.factory("social", [
  'APP', function(APP) {
    var Social;
    Social = (function() {
      function Social() {}

      Social.prototype.auth = {
        vk: function(callback) {
          if (typeof VK === "undefined" || VK === null) {
            return console.warn('[App > auth > vk] VK is not defined');
          }
          return VK.Auth.login(function(r) {
            if (r.session) {
              console.debug('[VKONTAKTE > auth]', r.session.user);
              return callback(r.session.user);
            } else {
              return console.error('[VKONTAKTE > auth]', r);
            }
          });
        },
        fb: function(callback) {
          var getUser;
          if (typeof FB === "undefined" || FB === null) {
            return console.warn('[App > auth > fb] FB is not defined');
          }
          getUser = function(authResponse) {
            return FB.api('/me', function(r) {
              _.extend(r, authResponse);
              console.debug('[FACEBOOK > auth]', r);
              return callback(r);
            });
          };
          return FB.getLoginStatus(function(r) {
            if (r.status === 'connected') {
              return getUser(r.authResponse);
            } else {
              return FB.login(function(r) {
                if (r.authResponse) {
                  return getUser(r.authResponse);
                } else {
                  return console.error('[FACEBOOK > auth]', r);
                }
              }, {
                scope: 'user_likes'
              });
            }
          });
        }
      };


      /* Пост на стенку в соц. сети */

      Social.prototype.wallPost = {
        vk: function(options) {
          if (options == null) {
            options = {};
          }
          if (typeof VK === "undefined" || VK === null) {
            return console.warn('[App > social > wallPost] VK is not defined');
          }

          /*
          				в attachments должна быть только 1 ссылка! Если надо прекрепить фото, 
          				оно должно быть залито в сам ВКонтакте
          				attachments: "photo131380871_348071400,http://vinsproduction.com"
           */
          options.attachLink = options.attachLink ? options.attachLink : "";
          options.attachPhoto = options.attachPhoto ? options.attachPhoto : "";
          return VK.api("wall.post", {
            owner_id: options.owner_id,
            message: options.message,
            attachments: "" + options.attachPhoto + "," + options.attachLink
          }, function(r) {
            if (!r || r.error) {
              console.error('[VKONTAKTE > wall.post]', r);
              if (options.error) {
                options.error(r.error);
              }
            } else {
              console.debug('[VKONTAKTE > wall.post] success');
              if (options.success) {
                options.success();
              }
            }
            if (options.allways) {
              return options.allways();
            }
          });
        },
        fb: function(options) {
          if (options == null) {
            options = {};
          }
          if (typeof FB === "undefined" || FB === null) {
            return console.warn('[FB > social > wallPost] FB is not defined');
          }
          return FB.ui({
            to: options.to,
            method: "feed",
            link: options.link || app.social.url,
            picture: options.picture || "",
            name: options.name || "",
            description: options.description || "",
            caption: options.caption || ""
          }, function(r) {
            if (!r) {
              console.error('[socWallPost Facebook] error', r);
              if (options.error) {
                options.error();
              }
            } else {
              console.debug('[socWallPost Facebook] success');
              if (options.success) {
                options.success();
              }
            }
            if (options.allways) {
              return options.allways();
            }
          });
        },
        ok: function(options) {
          var url;
          if (options == null) {
            options = {};
          }
          url = options.url || app.social.url;
          return window.open("http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1&st._surl=" + encodeURIComponent(url) + "&st.comments=" + encodeURIComponent(options.comments), "", "toolbar=0,status=0,width=626,height=436");
        }
      };


      /* Шаринг в сосетях */

      Social.prototype.share = {

        /* 
        			просто хелпер для всего приложения для навешивания на ссылки, например:
        			app.social.share.it()
         */
        it: function() {
          var options;
          options = {};
          options.title = "title";
          options.description = "description";
          options.image = "" + app.host + "/img/for_post.png";
          return this.facebook(options);
        },
        vk: function(options) {
          var url;
          if (options == null) {
            options = {};
          }
          if (!options.url) {
            if (app.local) {
              options.url = app.remoteHost + window.location.pathname + window.location.hash;
            } else {
              options.url = window.location.href;
            }
          }
          url = "http://vkontakte.ru/share.php?";
          if (options.url) {
            url += "url=" + encodeURIComponent(options.url);
          }
          if (options.title) {
            url += "&title=" + encodeURIComponent(options.title.substr(0, 100));
          }
          if (options.description) {
            url += "&description=" + encodeURIComponent(options.description.substr(0, 100) + '...');
          }
          if (options.image) {
            url += "&image=" + encodeURIComponent(options.image);
          }
          url += "&noparse=true";
          return this.popup(url);
        },
        vkCount: function(options) {
          if (options == null) {
            options = {};
          }
          if (!options.url) {
            if (app.local) {
              options.url = app.remoteHost + window.location.pathname + window.location.hash;
            } else {
              options.url = window.location.href;
            }
          }
          if (!window.VK.share) {
            window.VK.Share = {};
          }
          window.VK.Share.count = function(index, count) {
            console.debug('[VK Share count]', count);
            if (options.callback) {
              return options.callback(count);
            }
          };
          return $.getJSON('http://vkontakte.ru/share.php?act=count&index=1&url=' + escape(options.url) + '&format=json&callback=?');
        },
        ok: function(options) {
          var url;
          if (options == null) {
            options = {};
          }
          if (!options.url) {
            if (app.local) {
              options.url = app.remoteHost + window.location.pathname + window.location.hash;
            } else {
              options.url = window.location.href;
            }
          }
          url = "http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1";
          if (options.url) {
            url += "&st._surl=" + encodeURIComponent(options.url);
          }
          if (options.title) {
            url += "&title=" + encodeURIComponent(options.title);
          }
          if (options.description) {
            url += "&st.comments=" + encodeURIComponent(options.description);
          }
          return this.popup(url);
        },
        okCount: function(options) {
          if (options == null) {
            options = {};
          }
          if (!options.url) {
            if (app.local) {
              options.url = app.remoteHost + window.location.pathname + window.location.hash;
            } else {
              options.url = window.location.href;
            }
          }
          if (!window.ODKL) {
            window.ODKL = {};
          }
          window.ODKL.updateCountOC = function(a, count, b, c) {
            console.debug('[OK Share count]', count);
            if (options.callback) {
              return options.callback(count);
            }
          };
          return $.getJSON('http://www.odnoklassniki.ru/dk?st.cmd=extOneClickLike&uid=odklocs0&callback=?&ref=' + escape(options.url));
        },
        fb: function(options) {
          if (options == null) {
            options = {};
          }
          if (!options.url) {
            if (app.local) {
              options.url = app.remoteHost + window.location.pathname + window.location.hash;
            } else {
              options.url = window.location.href;
            }
          }
          return FB.ui({
            method: 'feed',
            link: options.url,
            name: options.title ? options.title.substr(0, 100) : void 0,
            caption: options.description ? options.description.substr(0, 100) + '...' : void 0,
            picture: options.image ? options.image : void 0
          }, function(res) {});
        },
        fbCount: function(options) {
          if (options == null) {
            options = {};
          }
          if (!options.url) {
            if (app.local) {
              options.url = app.remoteHost + window.location.pathname + window.location.hash;
            } else {
              options.url = window.location.href;
            }
          }
          return $.getJSON('http://api.facebook.com/restserver.php?method=links.getStats&callback=?&urls=' + escape(options.url) + '&format=json', function(data) {
            console.debug('[FB Share count]', data[0].share_count);
            if (options.callback) {
              return options.callback(data[0].share_count);
            }
          });
        },
        tw: function(options) {
          var url;
          if (options == null) {
            options = {};
          }
          if (!options.url) {
            if (app.local) {
              options.url = app.remoteHost + window.location.pathname + window.location.hash;
            } else {
              options.url = window.location.href;
            }
          }
          url = "http://twitter.com/share?";
          if (options.title) {
            url += "text=" + encodeURIComponent(options.title);
          }
          if (options.url) {
            url += "&url=" + encodeURIComponent(options.url);
          }
          if (options.url) {
            url += "&counturl=" + encodeURIComponent(options.url);
          }
          return this.popup(url);
        },
        twCount: function(options) {
          if (options == null) {
            options = {};
          }
          if (!options.url) {
            if (app.local) {
              options.url = app.remoteHost + window.location.pathname + window.location.hash;
            } else {
              options.url = window.location.href;
            }
          }
          return $.getJSON('http://urls.api.twitter.com/1/urls/count.json?url=' + escape(options.url) + '&callback=?', function(data) {
            console.debug('[TW Share count]', data.count);
            if (options.callback) {
              return options.callback(data.count);
            }
          });
        },
        mailru: function(options) {
          var url;
          if (options == null) {
            options = {};
          }
          options.url = options.url || app.social.url;
          url = "http://connect.mail.ru/share?";
          url += "url=" + encodeURIComponent(options.url);
          url += "&title=" + encodeURIComponent(options.title);
          url += "&description=" + encodeURIComponent(options.description);
          url += "&imageurl=" + encodeURIComponent(options.image);
          return this.popup(url);
        },
        popup: function(url) {
          return window.open(url, "", "toolbar=0,status=0,width=626,height=436");
        }
      };

      return Social;

    })();
    return new Social;
  }
]);
