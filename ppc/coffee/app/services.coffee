### Services ###


appServices = angular.module('appServices', [])

###
	Обертка для $http
	http({url:'/'}).success((res) -> ).error((res) -> )
###


appServices.factory "http", ['$http', ($http) ->

	defaultOptions =
		log: true # логировать запросы

	request = (options={}) ->

		log = options.log ? defaultOptions.log

		params = angular.extend({},defaultOptions,options)

		delete params.log

		request = $http(params)

		request.success (response, status, headers, config) ->
			if log then console.debug "[#{config.method} #{status}] #{config.url} | success:", response, "| config:", config
		
		request.error (response, status, headers, config) ->
			if log then console.error "[#{config.method} #{status}] #{config.url} | error:", response, "| config:", config

		return request


	return request

]

###
	Api

	api({ method: 'POST', url:"email", data: {email: 'example.com'}})
		.error (res) -> console.error res
		.success (res) ->
			return if res.status isnt 'success'
###

appServices.factory "api", ['http','APP','$cookieStore',(http,APP,$cookieStore) ->

	request = (options={}) ->

		# host = if APP.local then APP.remoteHost else APP.host

		options.url = host + '/' + options.url

		options.xsrfHeaderName = 'X-CSRFToken'
		options.xsrfCookieName = 'csrftoken'

		options.headers = {} if !options.headers

		# options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
		# options.data = $.param(options.data) if options.data

		request = http(options)
		request.success (response, status, headers, config) ->
		request.error (response, status, headers, config) ->

		return request

	return request

]




###

	Listeners

	listeners.onScroll (v) ->
	listeners.onResize (v) ->
	listeners.onHash (v) ->
###

appServices.factory "listeners", ['scroll', 'size', (scroll,size) ->

	class Factory

		constructor: ->

			### Scroll ###

			### Listener callback scroll
			listeners.onScroll (v) ->
			###

			@onScroll = (callback) ->
				$(window).on 'AppOnScroll', (event,v) ->
					callback(v) if callback

			lastScrollTop = 0

			throttled = _.throttle(->

				top = scroll()

				if top isnt lastScrollTop

					isBottom = top + $(window).height() >= $(document).height()
					action = if top > lastScrollTop then 'down' else 'up'
					lastScrollTop = top

					vars = {top,isBottom,action}

					$(window).trigger("AppOnScroll",[vars])

			,100)


			$(window).scroll throttled

			### Resize ###

			### Listener callback resize
			listeners.onResize (v) ->
			###
			@onResize = (callback) ->
				$(window).on 'AppOnResize', (event,v) ->
					callback(v) if callback


			debounced = _.debounce(->
				$(window).trigger("AppOnResize",[size()])
			,300)

			$(window).resize(debounced)

			_.defer ->
				$(window).resize()


			### Hash change ###

			### Listener callback Hash
			listeners.onHash (v) ->
			###

			@onHash = (callback) ->

				set = false

				$(window).on 'AppOnHash', (event,v) ->
					callback(v) if callback

				if !set
					callback(window.location.hash) if callback
					set = true

			$(window).on 'hashchange', =>
				$(window).trigger("AppOnHash",[window.location.hash])

			$(window).trigger 'hashchange'

	factory =  new Factory

	# factory.onScroll (v) -> console.log v
	# factory.onResize (v) -> console.log v
	# factory.onHash (v) -> console.log v

	return factory


]


###
	Scroll

	scroll(500)
	scroll(500,true)
	scroll('section#guests',true)
	scroll('section#guests',{time:500,easing:'easeOutElastic',done:function(){console.log('animate complete');}})
	scroll($('section#guests'))
###

appServices.factory "scroll", [() ->

	(v,animate) ->

		time 		= animate?.time 	|| 800
		easing 	= animate?.easing || 'linear'
		callback = false

		# Если это строка, то имеется ввиду селектор
		if v? and _.isString(v)

			el = $(v)

			if el[0] and _.isElement(el[0])

				if animate
					$('html,body').stop().animate {scrollTop : el.offset().top}, time, easing, ->
						if !callback
							callback = true 
							animate.done() if animate.done
				else
					$('html,body').scrollTop el.offset().top

		# Если это элемент дома
		else if v? and v[0] and _.isElement(v[0])

			if animate
				$('html,body').stop().animate {scrollTop : v.offset().top}, time, easing, ->
					if !callback
						callback = true 
						animate.done() if animate.done
			else
				$('html,body').scrollTop v.offset().top

		# Если передается значение
		else if v?

			if animate
				$('html,body').stop().animate {scrollTop :v}, time, easing, ->
					if !callback
						callback = true 
						animate.done() if animate.done
			else
				$('html,body').scrollTop v

		# В противном случае отдается значение
		else

			$(window).scrollTop()

]

### Size ###

appServices.factory "size", [ ->

	size = ->

		selectors = 
			"window": window
			"document": document
			"body": "body"
			"main": "body > main"
			"header": "body > main > header"
			"footer": "body > main > footer"
			"views" : "body > main > .views"

		$.each selectors, (k,selector) ->

			el = $(selector)

			selectors[k] =
				height: parseInt(el.height())
				width: parseInt(el.width())
				innerHeight: parseInt(el.innerHeight())
				innerWidth: parseInt(el.innerWidth())
				outerHeight: parseInt(el.outerHeight())
				outerWidth: parseInt(el.outerWidth())


	return size

]