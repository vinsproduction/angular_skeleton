### App ###

app = angular.module 'app',

	[	
		'ngCookies',
	]



### App Init ###

angular.element(document).ready ->
	angular.bootstrap document, ['app']


### App Constants ###	

app.constant 'APP',

	debug: do ->
		return false if !/debug/.test(window.location.search)
		obj = 
			test:  /\^?debug=test$/.test(location.search)
			api: 	 /\^?debug=api$/.test(location.search)
		return obj

	local: 	window.location.host is "" or /localhost/.test window.location.host
	host: 	window.location.protocol + "//" + window.location.host
	# remoteHost: ''
	# staticUrl: ''



app.run ['APP','$rootScope', (APP, $rootScope) ->


	window.console.groupCollapsed "[App] init"
	window.console.log "APP:", APP
	window.console.log "app:", app	
	window.console.groupEnd()

	return
]




