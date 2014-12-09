
app = angular.module('app', ['ngRoute', 'ngCookies', 'appControllers', 'appDirectives', 'appServices'])

angular.element(document).ready ->

	angular.bootstrap document, ['app']

	window.console.info "[app loaded] APP: ", app.APP

### Дефолтные константы для приложения ###	
app.APP = do ->

	opt = 

		remoteHost: 'http://vinsproduction.com'
		host: 	window.location.protocol + "//" + window.location.host
		debug: 	/debug/.test(window.location.search)
		local: 	window.location.host is "" or /localhost/.test window.location.host

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


app.config ['$interpolateProvider', ($interpolateProvider) ->
	# $interpolateProvider.startSymbol('[[')
	# $interpolateProvider.endSymbol(']]')
	# return 0
]

app.config ['$routeProvider', ($routeProvider) ->

	$routeProvider.when '/test',
		templateUrl: 'test.html'
		controller: 'testCtrl'

	$routeProvider.otherwise
		redirectTo: '/test'

	return 0

]