

var
__helpers__ = {}, // ORIGINAL NAMESPACE
$$; // SHORT NAMESPACE

(function($){

	$$ = __helpers__;

	$.staticVersion = window.staticVersion || 1;
	$.staticPath 		= window.staticPath || '';

	if (!window.console.log) 	{ window.console.log = function(){}; }
	if (!window.console.groupCollapsed) { window.console.groupCollapsed = window.console.log; }
	if (!window.console.groupEnd) { window.console.groupEnd = window.console.log; }
	if (!window.console.debug) { window.console.debug = window.console.log; }
	if (!window.console.warn) { window.console.warn = window.console.log; }
	if (!window.console.info) { window.console.info = window.console.log; }
	if (!window.console.error) { window.console.error = window.console.log; }


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

	/* INCLUDE JAVASCRIPT FILE
	EXAMPLE $$.includeJS('/js/helpers.js'); */
	$.includeJS = function(src) { return window.document.write('<script src="' + $.staticPath + src + '?v=' + $.staticVersion + '"></scr' + 'ipt>'); };
	
	/* INCLUDE CSS FILE
	EXAMPLE $$.includeCSS('/css/helpers.css'); */
	$.includeCSS = function(src) { return window.document.write('<link rel="stylesheet" href="' + $.staticPath + src + '?v=' + $.staticVersion + '" />');};


	/* ======= BUILD PROJECT ====== */

	if(/^\?debug/.test(window.location.search)){

		$.staticVersion = Math.random();

		console.debug('[DEBUG MODE] v.' + $.staticVersion);
		console.log('[Build] list', build);

		var cssList = build.css.libs.concat(build.css.main).concat(build.css.base);
		for(var i in cssList) {
			$.includeCSS(build.css.list[i]);
		}

		var jsList = build.js.libs.concat(build.js.main).concat(build.js.base);
		for(var i in jsList) {					
			$.includeJS(build.js.list[i]);
		}


	}else{

		console.debug('[PRODUCTION MODE] v.' + $.staticVersion);

		if(!/^\?console/.test(window.location.search)){
			$.disableConsole();
		};

		console.log('[Build] list', build);

		$.includeCSS('css/project/libs.min.css');
		$.includeCSS('css/project/app.min.css');
		$.includeJS('js/project/libs.min.js');
		$.includeJS('js/project/app.min.js');
	}


})(__helpers__);


