### Services ###

###
	Обертка для $http
	Http({url:'/'}).success((res) -> ).error((res) -> )
###


appServices.factory "Http", ['$http', ($http) ->

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

	Api({ method: 'POST', url:"email", data: {email: 'example.com'}})
		.error (res) -> console.error res
		.success (res) ->
			return if res.status isnt 'success'
###

appServices.factory "Api", ['Http','APP','$cookieStore',(http,APP,$cookieStore) ->

	request = (options={}) ->

		# host = if APP.local then APP.remoteHost else APP.host

		options.url = host + '/' + options.url

		options.xsrfHeaderName = 'X-CSRFToken'
		options.xsrfCookieName = 'csrftoken'

		options.headers = {} if !options.headers

		# options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
		# options.data = $.param(options.data) if options.data

		request = Http(options)
		request.success (response, status, headers, config) ->
		request.error (response, status, headers, config) ->

		return request

	return request

]




###

	Listeners

	Listeners.onScroll (v) ->
	Listeners.onResize (v) ->
	Listeners.onHash (v) ->
###

appServices.factory "Listeners", ['Scroll', 'Size', (Scroll,Size) ->

	class Factory

		constructor: ->

			### Scroll ###

			### Listener callback scroll
			Listeners.onScroll (v) ->
			###

			@onScroll = (callback) ->
				$(window).on 'AppOnScroll', (event,v) ->
					callback(v) if callback

			lastScrollTop = 0

			throttled = _.throttle(->

				top = Scroll()

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
			Listeners.onResize (v) ->
			###
			@onResize = (callback) ->
				$(window).on 'AppOnResize', (event,v) ->
					callback(v) if callback


			debounced = _.debounce(->
				$(window).trigger("AppOnResize",[Size()])
			,300)

			$(window).resize(debounced)

			_.defer ->
				$(window).resize()


			### Hash change ###

			### Listener callback Hash
			Listeners.onHash (v) ->
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

	Scroll(500)
	Scroll(500,true)
	Scroll('section#guests',true)
	Scroll('section#guests',{time:500,easing:'easeOutElastic',done:function(){console.log('animate complete');}})
	Scroll($('section#guests'))
###

appServices.factory "Scroll", [ ->

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

appServices.factory "Size", [ ->

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