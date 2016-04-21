### App Run ###

app.run ['APP','Camelcase','$rootScope', '$location',  (APP, Camelcase, $rootScope, $location) ->

	### HELPERS ###
	# $rootScope.declOfViews 		= (val) -> $$.declOfNum(val, ['Просмотр', 'Просмотра', 'Просмотров'])

	
	### POPUPS ###

	popup.logs = false

	$rootScope.popups = {}

	_.each  popup.popups, (data) ->
		$rootScope.popups[Camelcase(data.name)] = {}

	return

]




