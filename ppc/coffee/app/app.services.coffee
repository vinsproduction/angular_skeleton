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

appServices.factory "Api", ['Http','APP','$cookieStore',(Http,APP,$cookieStore) ->

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
