
### 
 App
###

app = angular.module('app', ['ngRoute', 'ngCookies', 'appControllers', 'appDirectives', 'appServices'])

angular.element(document).ready ->

	angular.bootstrap document, ['app']

	window.console.info "[App loaded] APP: ", app.APP

### Дефолтные константы для приложения ###	
app.APP = do ->

	opt = 

		project: 'Angular Skeleton'
		debug: 	/debug/.test(window.location.search)
		local: 	window.location.host is "" or /localhost/.test window.location.host
		host: 	window.location.protocol + "//" + window.location.host
		remoteHost: 'http://vinsproduction.com'
		root: ''

	### Автоперезагрузка браузера для разработки ###
	if window.WebSocket and /localhost/.test window.location.host

		port = 777
		url  = "http://localhost:#{port}/livereload.js"
		window.document.write('<script type="text/javascript" src="' + url + '"></scr' + 'ipt>')
		console.debug "[LiveReload] #{url}"

	return opt

app.constant 'APP', do -> app.APP

### Установка и переназначение констант приложения из вне ###
app.setApp = (key,val) ->
	app.constant 'APP', do ->
		app.APP[key] = val
		return app.APP

### Установки шаблонизатора ###
app.config ['$interpolateProvider', ($interpolateProvider) ->
	$interpolateProvider.startSymbol('[[')
	$interpolateProvider.endSymbol(']]')
	return 0
]


app.run ['$route', '$rootScope', '$location',  ($route, $rootScope, $location) ->

	### HELPERS ###
	$rootScope.isEmpty 				= (val) -> val and _.isEmpty val
	# $rootScope.declOfViews 		= (val) -> $$.declOfNum(val, ['Просмотр', 'Просмотра', 'Просмотров'])

	### Смена урла без перезагрузки страницы - $location.path("/product/1", false) ###
	original = $location.path
	$location.path = (path, reload) -> 
		if reload is false
			lastRoute = $route.current
			un = $rootScope.$on '$locationChangeSuccess', ->
				$route.current = lastRoute
				un()

		original.apply($location, [path]);

	### ROUTE EVENTS ###
	
	$rootScope.$on '$routeChangeSuccess', ->
		# 

	$rootScope.$on '$routeChangeStart', ->
		# $rootScope.location = $location.path()
		# console.log '__ ROUTE:', $location.path()


	### RESIZE ###
	
	# $main 			= $('main')
	# $header 	 	= $('main > header')
	# headerH 	 	= $('main > header').height()
	# $footer 	 	= $('main > footer')
	# footerH 	 	= $('main > footer').height()

	# $rootScope.resize = ->

	# 	_.defer ->

	# 		$body 			= $main.find('> .body')
	# 		$view 			= $body.find('> .views > .view')
	# 		$sections 	= $view.find('> .sections')

	# 		sectionsH = $sections.height()
	# 		h = sectionsH

	# 		mainH = headerH + $body.height() + footerH

	# 		# $view.height(h)
	# 		viewH = $view.height() + parseInt($view.css('padding-top')) + parseInt($view.css('padding-bottom'))

	# 		console.log '[App Resize]', 'header:', headerH, 'main:', mainH, 'view:', viewH, 'sections:', sectionsH, 'footer:', footerH,


	# $rootScope.resize()



]

