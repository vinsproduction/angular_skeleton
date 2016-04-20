### App Run ###

app.run ['APP','$rootScope', '$location',  (APP, $rootScope, $location) ->

	### HELPERS ###
	$rootScope.isEmpty 	= (val) -> val and _.isEmpty val
	# $rootScope.declOfViews 		= (val) -> $$.declOfNum(val, ['Просмотр', 'Просмотра', 'Просмотров'])

	return

]




