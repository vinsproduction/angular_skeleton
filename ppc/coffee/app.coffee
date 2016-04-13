
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
		test: 	/\^?debug=test$/.test(location.search)
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

### Отображать теги ###
app.config ['$sceProvider', ($sceProvider) ->
	$sceProvider.enabled(false)
	return 0
]


app.run ['$route', '$rootScope', '$location',  ($route, $rootScope, $location) ->

	### HELPERS ###
	$rootScope.isEmpty 				= (val) -> val and _.isEmpty val
	# $rootScope.declOfViews 		= (val) -> $$.declOfNum(val, ['Просмотр', 'Просмотра', 'Просмотров'])


	# ### Смена урла без перезагрузки страницы - $location.path("/product/1", false) ###
	# original = $location.path
	# $location.path = (path, reload) -> 
	# 	if reload is false
	# 		lastRoute = $route.current
	# 		un = $rootScope.$on '$locationChangeSuccess', ->
	# 			$route.current = lastRoute
	# 			un()

	# 	original.apply($location, [path]);

	# ### ROUTE EVENTS ###
	
	# $rootScope.$on '$routeChangeSuccess', ->
	# 	# 

	# $rootScope.$on '$routeChangeStart', ->
	# 	# $rootScope.location = $location.path()
	# 	# console.log '__ ROUTE:', $location.path()


]


# ### FORMS ###
 
# app.forms = {}

# app.forms.scroll = (el) ->

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




