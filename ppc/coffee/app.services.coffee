### 
 Services
###


appServices = angular.module('appServices', [])

### Обертка для $http

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

### Api

	api({url:'/'}).success((res) -> ).error((res) -> )
###

appServices.factory "api", ['http','APP','$cookieStore',(http,APP,$cookieStore) ->

	request = (options={}) ->

		host = if APP.local then APP.remoteHost else APP.host

		options.url = host + '/' + options.url

		options.headers = {} if !options.headers
		options.headers['X-CSRFToken'] = $cookieStore.get('csrftoken')

		request = http(options)
		request.success (response, status, headers, config) ->
		request.error (response, status, headers, config) -> 

		return request

	return request

]




### Listeners

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
				$(window).trigger("AppOnResize",[size])
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


### Scroll
	scroll(500)
	scroll(500,true)
	scroll('section#guests',true)
	scroll('section#guests',{time:500,easing:'easeOutElastic',done:function(){console.log('animate complete');}})
	scroll($('section#guests'))
###

appServices.factory "scroll", [() ->

	(v,animate) ->

		time 		= animate?.time 	|| 800
		easing 	= animate?.easing || 'easeOutCubic'
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

appServices.factory "size", [() ->

	windowWidth 	: $(window).width()
	windowHeight 	: $(window).height()

	documentWidth  : $(document).width()
	documentHeight : $(document).height()

	bodyWidth 		: parseInt($('body').width())
	bodyHeight 		: parseInt($('body').height())

	mainWidth			: parseInt($('body > main').width())
	mainHeight		: parseInt($('body > main').height())

	headerWidth		: parseInt($('body > main > header').width())
	headerHeight	: parseInt($('body > main > header').height())

	footerWidth		: parseInt($('body > main > footer').width())
	footerHeight	: parseInt($('body > main > footer').height())
	
	sectionsWidth : parseInt($('body > main > .sections').width())
	sectionsHeight: parseInt($('body > main > .sections').height())

]

### Социальные настройки (Не проверено на Ангуларе!) ###

appServices.factory "social", [() ->

	class Social

		constructor: ->

			@vkontakteApiId			= if APP.local or /dev.site.ru/.test(APP.host) then '4555300' else '4574053'
			@facebookApiId			= if APP.local or /dev.site.ru/.test(APP.host) then '1487802001472904' else '687085858046891'
			@odnoklassnikiApiId = ''

			# if VK?
			# 	VK.init
			# 		apiId: @vkontakteApiId

			# if FB?
			# 	FB.init
			# 		appId: @facebookApiId
			# 		status: true
			# 		cookie: true
			# 		xfbml: true
			# 		oauth: true

		auth: 

			vk: (callback) ->

				if !VK? then return console.warn '[App > auth > vk] VK is not defined'

				# if app.local

				# 	user =
				# 		domain: ""
				# 		sex: 2
				# 		first_name: "Ailoved"
				# 		href: "https://vk.com/id169209728"
				# 		id: "169209728"
				# 		last_name: "Ailove"
				# 		nickname: ""

				# 	console.debug '[VKONTAKTE::LOCAL > auth]', user
				# 	return callback user
				

				VK.Auth.login (r) ->

					if r.session
						console.debug '[VKONTAKTE > auth]', r.session.user
						callback r.session.user
					else
						console.error '[VKONTAKTE > auth]', r

			fb: (callback) ->

				if !FB? then return console.warn '[App > auth > fb] FB is not defined'

				# if app.local

				# 	user =
				# 		first_name: "Vins"
				# 		gender: "male"
				# 		id: "762527367142381"
				# 		last_name: "Polyakov"
				# 		link: "https://www.facebook.com/app_scoped_user_id/762527367142381/"
				# 		locale: "ru_RU"
				# 		name: "Vins Polyakov"
				# 		timezone: 4
				# 		updated_time: "2014-07-22T08:46:05+0000"
				# 		verified: true

				# 	console.debug '[FACEBOOK::LOCAL > auth]', user
				# 	return callback user


				getUser = (authResponse) ->

					FB.api '/me', (r) ->

						_.extend r, authResponse

						console.debug '[FACEBOOK > auth]', r
						callback r

				FB.getLoginStatus (r) ->

					if r.status is 'connected'
						getUser(r.authResponse)

					else

						FB.login((r) ->

							if r.authResponse
								getUser(r.authResponse)
							else
								console.error '[FACEBOOK > auth]', r

						,{scope: 'user_likes'})

		### Пост на стенку в соц. сети ###
		wallPost:

			vk: (options={}) ->


				if !VK? then return console.warn '[App > social > wallPost] VK is not defined'

				###
				в attachments должна быть только 1 ссылка! Если надо прекрепить фото, 
				оно должно быть залито в сам ВКонтакте
				###

				options.attachLink = if options.attachLink then "#{app.social.url}#" + options.attachLink else app.social.url
				options.attachPhoto = if options.attachPhoto then options.attachPhoto else "photo131380871_321439116"

				VK.api "wall.post",
					owner_id	: options.owner_id
					message	: options.message
					attachments: "#{options.attachPhoto},#{options.attachLink}"

						
				, (r) ->

					# ответ после отправки приходит в любом случае, даже если закрыли попап!

					if not r or r.error
						console.error '[VKONTAKTE > wall.post]', r
						if options.error
							options.error(r.error)

						if popup and r.error and r.error.error_msg and r.error.error_code
							if r.error.error_code is 214
								app.errors.popup "Стенка закрыта", false
					else
						console.debug '[VKONTAKTE > wall.post] success'
						if options.success then options.success()

					if options.allways then options.allways()

			fb: (options={}) ->

				if !FB? then return console.warn '[FB > social > wallPost] FB is not defined'

				FB.ui
					to: options.to
					method: "feed"
					link: options.link || app.social.url
					picture: options.picture  || ""
					name: options.name  || ""
					description: options.description || ""
					caption: options.caption || ""
				, (r) ->

					unless r
						console.error '[socWallPost Facebook] error', r
						if options.error then options.error()
					else
						console.debug '[socWallPost Facebook] success'
						if options.success then options.success()

					if options.allways then options.allways()

			ok: (options={}) ->
				url = options.url || app.social.url

				window.open "http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1&st._surl=" + encodeURIComponent(url) + "&st.comments=" + encodeURIComponent(options.comments), "", "toolbar=0,status=0,width=626,height=436"

		### Шаринг в сосетях ###
		share:

			### 
			просто хелпер для всего приложения для навешивания на ссылки, например:
			app.social.share.it()
			###
			it: -> 
				options = {}
				options.title 	= "title"
				options.description 	= "description"
				options.image 	= "#{app.host}/img/for_post.png"

				@facebook options

			vk: (options={}) ->

				if !options.url
					if app.local
						options.url = app.remoteHost + window.location.pathname + window.location.hash
					else
						options.url = window.location.href

				url = "http://vkontakte.ru/share.php?"
				url += "url=" + encodeURIComponent(options.url) if options.url
				url += "&title=" + encodeURIComponent(options.title.substr(0,100)) if options.title
				url += "&description=" + encodeURIComponent(options.description.substr(0,100) + '...') if options.description
				url += "&image=" + encodeURIComponent(options.image) if options.image
				url += "&noparse=true"

				@popup url

			vkCount: (options={}) ->

				if !options.url
					if app.local
						options.url = app.remoteHost + window.location.pathname + window.location.hash
					else
						options.url = window.location.href

				window.VK.Share = {} if !window.VK.share
				window.VK.Share.count = (index, count) ->
					console.debug '[VK Share count]', count
					options.callback(count) if options.callback

				$.getJSON 'http://vkontakte.ru/share.php?act=count&index=1&url=' + escape(options.url) + '&format=json&callback=?'

			ok: (options={}) ->

				if !options.url
					if app.local
						options.url = app.remoteHost + window.location.pathname + window.location.hash
					else
						options.url = window.location.href

				url = "http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1"
				url += "&st._surl=" + encodeURIComponent(options.url) if options.url
				url += "&title=" + encodeURIComponent(options.title) if options.title
				url += "&st.comments=" + encodeURIComponent(options.description) if options.description
				

				@popup url

			okCount: (options={}) ->

				if !options.url
					if app.local
						options.url = app.remoteHost + window.location.pathname + window.location.hash
					else
						options.url = window.location.href

				window.ODKL = {} if !window.ODKL
				window.ODKL.updateCountOC = (a, count, b, c) ->
					console.debug '[OK Share count]', count
					options.callback(count) if options.callback

				$.getJSON 'http://www.odnoklassniki.ru/dk?st.cmd=extOneClickLike&uid=odklocs0&callback=?&ref=' + escape(options.url)

			fb: (options={}) ->

				if !options.url
					if app.local
						options.url = app.remoteHost + window.location.pathname + window.location.hash
					else
						options.url = window.location.href

				FB.ui
					method: 'feed',
					link: options.url
					name: options.title.substr(0,100) if options.title
					caption: options.description.substr(0,100) + '...' if options.description
					picture: options.image if options.image
				, (res) ->

			fbCount: (options={}) ->

				if !options.url
					if app.local
						options.url = app.remoteHost + window.location.pathname + window.location.hash
					else
						options.url = window.location.href

				$.getJSON 'http://api.facebook.com/restserver.php?method=links.getStats&callback=?&urls=' + escape(options.url) + '&format=json', (data) ->
					console.debug '[FB Share count]', data[0].share_count
					options.callback(data[0].share_count) if options.callback

			tw: (options={}) ->

				if !options.url
					if app.local
						options.url = app.remoteHost + window.location.pathname + window.location.hash
					else
						options.url = window.location.href

				url = "http://twitter.com/share?"
				url += "text=" + encodeURIComponent(options.title) if options.title
				url += "&url=" + encodeURIComponent(options.url) if options.url
				url += "&counturl=" + encodeURIComponent(options.url) if options.url

				@popup url

			twCount: (options={}) ->

				if !options.url
					if app.local
						options.url = app.remoteHost + window.location.pathname + window.location.hash
					else
						options.url = window.location.href

				$.getJSON 'http://urls.api.twitter.com/1/urls/count.json?url=' + escape(options.url) + '&callback=?', (data) ->
					console.debug '[TW Share count]', data.count
					options.callback(data.count) if options.callback

			mailru: (options={}) ->

				options.url = options.url || app.social.url

				url = "http://connect.mail.ru/share?"
				url += "url=" + encodeURIComponent(options.url)
				url += "&title=" + encodeURIComponent(options.title)
				url += "&description=" + encodeURIComponent(options.description)
				url += "&imageurl=" + encodeURIComponent(options.image)

				@popup url

			popup: (url) ->
				window.open url, "", "toolbar=0,status=0,width=626,height=436"

	return new Social

]