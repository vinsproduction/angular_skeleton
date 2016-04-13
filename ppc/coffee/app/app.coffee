do ->
	### LIVERELOAD ###

	if window.WebSocket and /localhost/.test window.location.host

		port = 35729
		url  = "http://localhost:#{port}/livereload.js"
		script = document.createElement('script')
		script.src = url
		document.getElementsByTagName('head')[0].appendChild(script)

		console.debug "[LiveReload] #{url}"


### App ###

app = angular.module 'app',

	[	
		'ngCookies',
		'appControllers',
		'appDirectives',
		'appServices'
	]


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
	return 0
]

### Отображать теги ###
app.config ['$sceProvider', ($sceProvider) ->
	$sceProvider.enabled(false)
	return 0
]


app.run ['APP','$rootScope', '$location',  (APP, $rootScope, $location) ->

	window.console.groupCollapsed "[App] #{APP.project} run"
	window.console.log "APP:", APP
	window.console.log "app:", app
	window.console.groupEnd()

	### HELPERS ###
	$rootScope.isEmpty 	= (val) -> val and _.isEmpty val
	# $rootScope.declOfViews 		= (val) -> $$.declOfNum(val, ['Просмотр', 'Просмотра', 'Просмотров'])


	# ### FORMS ###
 
	# APP.forms = {}

	# APP.forms.scroll = (el) ->

	# 	$select = el
	# 	$selected = $select.find('[data-selected]')
	# 	$options 	= $select.find('[data-options]')

	# 	if !$select.find('.scrollbar').size()
	# 		$options.wrapInner """
	# 			<div class="viewport"><div class="overview"></div></div>
	# 		"""
	# 		$options.prepend """
	# 			<div class="scrollbar"><div class="track"><div class="thumb"><div class="end"></div></div></div></div>
	# 		"""

	# 	_.defer ->
	# 		scrollbar = $options.tinyscrollbar({sizethumb: 40,wheel: (if $$.browser.mobile then 2 else 40),invertscroll:$$.browser.mobile})
	# 		$selected.click -> scrollbar.tinyscrollbar_update()
	# 		scrollbar.tinyscrollbar_update()

	# 	return


]




