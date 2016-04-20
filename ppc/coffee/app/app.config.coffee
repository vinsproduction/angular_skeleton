### App Config ###


### Установки шаблонизатора ###
app.config ['$interpolateProvider', ($interpolateProvider) ->
	$interpolateProvider.startSymbol('[[')
	$interpolateProvider.endSymbol(']]')
	return
]

### Отображение тегов ###
app.config ['$sceProvider', ($sceProvider) ->
	$sceProvider.enabled(false)
	return
]





