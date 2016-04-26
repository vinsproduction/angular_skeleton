### App Run ###

app.run ['APP','$rootScope',(APP,$rootScope) ->

	### HELPERS ###
	$rootScope.isEmpty 		= _.isEmpty
	$rootScope.size 			=  _.size
	# $rootScope.declOfViews 	= (val) -> $$.declOfNum(val, ['Просмотр', 'Просмотра', 'Просмотров'])
	

	return

]




