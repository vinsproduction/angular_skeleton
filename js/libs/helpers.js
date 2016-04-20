
if (!window.console.log) 	{ window.console.log = function(){}; }
if (!window.console.groupCollapsed) { window.console.groupCollapsed = window.console.log; }
if (!window.console.groupEnd) { window.console.groupEnd = window.console.log; }
if (!window.console.debug) { window.console.debug = window.console.log; }
if (!window.console.warn) { window.console.warn = window.console.log; }
if (!window.console.info) { window.console.info = window.console.log; }
if (!window.console.error) { window.console.error = window.console.log; }


/* LIVERELOAD */
(function() {
  var port, script, url;
  if (window.WebSocket && /localhost/.test(window.location.host)) {

		port = 35729;
    url = "http://localhost:" + port + "/livereload.js";
    script = document.createElement('script');
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
    return console.debug("[LiveReload] " + url);

  };
})();


/*  HELPERS  */

var
__helpers__ = {}, // ORIGINAL NAMESPACE
$$; // SHORT NAMESPACE


(function($){
	
	$$ = __helpers__;

	/* INCLUDE JAVASCRIPT FILE
	EXAMPLE includeJS('/js/helpers.js'); */
	$.includeJS = function(src) { return window.document.write('<script src="' + src + '"></scr' + 'ipt>'); };
	/* INCLUDE CSS FILE
	EXAMPLE includeCSS('/css/helpers.css'); */
	$.includeCSS = function(src) { return window.document.write('<link rel="stylesheet" href="' + src + '" />');};


	/* BROWSER */
	
	$.userAgent = navigator.userAgent.toLowerCase();

	$.browser = {
		userAgent: $.userAgent,
		version: ($.userAgent.match( /.+(?:me|ox|on|rv|it|era|ie)[\/: ]([\d.]+)/ ) || [0,'0'])[1],
		opera: /opera/i.test($.userAgent),
		msie: (/msie/i.test($.userAgent) && !/opera/i.test($.userAgent)),
		msie6: (/msie 6/i.test($.userAgent) && !/opera/i.test($.userAgent)),
		msie7: (/msie 7/i.test($.userAgent) && !/opera/i.test($.userAgent)),
		msie8: (/msie 8/i.test($.userAgent) && !/opera/i.test($.userAgent)),
		msie9: (/msie 9/i.test($.userAgent) && !/opera/i.test($.userAgent)),
		mozilla: /firefox/i.test($.userAgent),
		chrome: /chrome/i.test($.userAgent),
		safari: (!(/chrome/i.test($.userAgent)) && /webkit|safari|khtml/i.test($.userAgent)),
		iphone: /iphone/i.test($.userAgent),
		ipod: /ipod/i.test($.userAgent),
		iphone4: /iphone.*OS 4/i.test($.userAgent),
		ipod4: /ipod.*OS 4/i.test($.userAgent),
		ipad: /ipad/i.test($.userAgent),
		android: /android/i.test($.userAgent),
		bada: /bada/i.test($.userAgent),
		mobile: /iphone|ipod|ipad|opera mini|opera mobi|iemobile/i.test($.userAgent),
		msie_mobile: /iemobile/i.test($.userAgent),
		safari_mobile: /iphone|ipod|ipad/i.test($.userAgent),
		opera_mobile: /opera mini|opera mobi/i.test($.userAgent),
		mac: /mac/i.test($.userAgent)
	};

	// Get Browser
	for (var i in $.browser) {
		if($.browser[i] === true){
			$.browser.name = i;
		}
	};
	

	$.disableConsole = function(){
		window.console = {
			log: function(){},
			debug: function(){},
			warn: function(){},
			info: function(){},
			error: function(){},
			groupCollapsed: function(){},
			groupEnd: function(){}
		};	
	};


})(__helpers__);



