### App ###

app = angular.module 'app',

	[	
		'ngCookies',
		'appControllers',
		'appDirectives',
		'appServices'
	]


appControllers 	= angular.module('appControllers', [])
appDirectives 	= angular.module('appDirectives', [])
appServices 		= angular.module('appServices', [])



### App Init ###

angular.element(document).ready ->
	angular.bootstrap document, ['app']


### Дефолтные настройки для приложения ###	
app.constant 'APP',

	project: 'Angular Skeleton'
	debug: 	/debug/.test(window.location.search)
	test: 	/\^?debug=test$/.test(location.search)
	local: 	window.location.host is "" or /localhost/.test window.location.host
	host: 	window.location.protocol + "//" + window.location.host
	remoteHost: ''
	staticUrl: ''


### Установки шаблонизатора ###
app.config ['$interpolateProvider', ($interpolateProvider) ->
	$interpolateProvider.startSymbol('[[')
	$interpolateProvider.endSymbol(']]')
	return
]

### Отображать теги ###
app.config ['$sceProvider', ($sceProvider) ->
	$sceProvider.enabled(false)
	return
]



app.run ['APP','$rootScope', '$location',  (APP, $rootScope, $location) ->

	window.console.groupCollapsed "[App] #{APP.project} run"
	window.console.log "APP:", APP
	window.console.log "app:", app
	window.console.groupEnd()

	return
]




