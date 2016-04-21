
app.controller('popupsCtrl', ['APP','Api','$rootScope','$scope', (APP,Api,$rootScope,$scope) ->
	
	# popup.logs = false

	# popup.$popup.on 'open', (e,popup) ->
	# 	console.log popup

	# popup.$popup.on 'close', (e,popup) ->
	# 	console.log popup

	# $rootScope.popups.custom  <-- scope popup custom
	# popup.popups['custom'].el <-- el popup custom

	# watch popup custom
	# $rootScope.$watch 'popups.custom', ->
	# 	console.log $rootScope.popups.custom

	# _.defer ->
	# 	popup.open 'custom', {title:'Hello',body: 'world!'}


])
