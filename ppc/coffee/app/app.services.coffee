### Services ###

###
	Обертка для $http
	Http({url:'/'}).success((res) -> ).error((res) -> )
###


app.factory "Http", ['$http', ($http) ->

	defaultOptions =

		log: true # логировать запросы
		method: 'GET'
		url: ""
		headers: {}
		data: {}

	request = (options={}) ->

		log = options.log ? defaultOptions.log

		debug = if APP.debug.api then "DEBUG API " else ""

		params = angular.extend({},defaultOptions,options)

		delete params.log

		request = $http(params)

		request.success (response, status, headers, config) ->
			if log then console.debug "[#{debug}#{config.method} #{status}] #{config.url} | success:", response
		
		request.error (response, status, headers, config) ->
			if log then console.error "[#{debug}#{config.method} #{status}] #{config.url} | error:", response, "| config:", config

		return request


	return request

]

###
	Api

	Api({ method: 'POST', url:"email", data: {email: 'example.com'}})
		.error (res) -> console.error res
		.success (res) ->
			return if res.status isnt 'success'
###

app.factory "Api", ['Http','APP',(Http,APP) ->

	request = (options={}) ->

		options.url = APP.host + '/api/' + options.url

		options.xsrfHeaderName = 'X-CSRFToken'
		options.xsrfCookieName = 'csrftoken'

		request = Http(options)
		request.success (response, status, headers, config) ->
		request.error (response, status, headers, config) ->

		return request

	return request

]


###
	POPUPS (adapter for window.popup)

	popup.open('example',{scope:{test:1}}) # open popup
	Popup.scope(popupName, $scope) # merge popup scope
###

app.factory "Popup", ['$rootScope','Camelcase', '$timeout', ($rootScope, Camelcase,$timeout) ->

	parent = $rootScope

	popupParent = window.popup
	popupParent.logs = false

	popup = {}
	popup =
		open: (name,opt) -> popupParent.open.call(popupParent,name,opt)
		close: -> popupParent.close.call(popupParent)
		
	parent.popup = popup

	popups = {}
	parent.popups = popups

	_.each popupParent.popups, (popup) ->
		name = Camelcase(popup.name)
		popups[name] =
			popupIsOpen: false

	open = (popup) ->

		name = Camelcase(popup.name)
		return if !popups[name]

		popup.opt = {} if !popup.opt	
		popup.opt.scope = {} if !popup.opt.scope

		popups[name]  = angular.extend popups[name], popup.opt.scope

		popups[name].popupIsOpen = true

		# console.log 'open__', popups[name]

		parent.$digest() if !parent.$$phase

		$timeout ->
			$(window).resize()
			popups[name].popupOnOpen() if popups[name].popupOnOpen


		return

	close = (popup) ->

		name = Camelcase(popup.name)
		return if !popups[name]

		popups[name].popupIsOpen = false

		# console.log 'close__', parent.popups[name]

		parent.$digest() if !parent.$$phase

		$timeout ->
			popups[name].popupOnClose() if popups[name].popupOnClose


		return

	popupParent.$popup.on 'open', (e,popup) ->
		open(popup)
		return

	popupParent.$popup.on 'close', (e,popup) ->
		close(popup)
		return

	obj =

		watch: (name)  ->

			name = Camelcase(name)
			return if !popups[name]

			watcher = parent.$watchCollection "popups.#{name}", (scope) ->

				console.log 'Popup watch:change', scope

				if scope.popupIsOpen
					$timeout ->
						console.log 'Popup watch:open', scope
				else
					$timeout ->
						console.log 'Popup watch:close', scope

			return watcher

		scope: (name,scope) ->

			if !name
				return popups[name]

			name = Camelcase(name)
			return if !popups[name]

			# watcher = popupWatch(name) # add wacther
			# watcher() # remove wacther

			popups[name] = angular.extend scope, popups[name]

			$timeout ->
				popups[name].popupOnInit() if popups[name].popupOnInit

			return popups[name]

	return obj

]

# Camelcase string

app.factory 'Camelcase', [->

	(str) ->
		str.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index)  ->
			if index is 0 then letter.toLowerCase() else letter.toUpperCase()
		).replace(/\s+/g, '').replace(/\-/g, '')

]