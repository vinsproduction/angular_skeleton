### App Run ###

app.run ['APP','Camelcase','$rootScope','$location','$timeout',(APP,Camelcase,$rootScope,$location,$timeout) ->

	### HELPERS ###
	$rootScope.isEmpty 		= _.isEmpty
	# $rootScope.declOfViews 	= (val) -> $$.declOfNum(val, ['Просмотр', 'Просмотра', 'Просмотров'])
	
	### POPUPS ###

	do ->

		parent = $rootScope

		popup = window.popup
		popup.logs = false

		# parent.popup = popup # Add to $rootScope

		popups = {}
		parent.popups = popups

		watcher = null

		_.each popup.popups, (popup) ->
			name = Camelcase(popup.name)
			popups[name] =
				popupIsOpen: false

		parent.popupScope = (name,scope) ->

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

		popupOpen = (popup) ->

			name = Camelcase(popup.name)
			return if !popups[name]

			popup.opt = {} if !popup.opt	
			popup.opt.scope = {} if !popup.opt.scope

			popups[name]  = angular.extend popups[name], popup.opt.scope

			popups[name].popupIsOpen = true

			# console.log 'open__', popups[name]

			parent.$digest()

			$timeout ->
				popups[name].popupOnOpen() if popups[name].popupOnOpen

			return

		popupClose = (popup) ->

			name = Camelcase(popup.name)
			return if !popups[name]

			popups[name].popupIsOpen = false

			# console.log 'close__', $rootScope.popups[name]

			parent.$digest()

			$timeout ->
				popups[name].popupOnClose() if popups[name].popupOnClose

			return

		popupWatch = (name)  ->

			name = Camelcase(name)
			return if !popups[name]

			watcher = $rootScope.$watchCollection "popups.#{name}", (scope) ->

				# console.log 'watch__', scope

				if scope.popupIsOpen
					$timeout ->
						scope.popupOnOpen()
				else
					$timeout ->
						scope.popupOnClose()

			return watcher

		popup.$popup.on 'open', (e,popup) ->
			popupOpen(popup)
			return

		popup.$popup.on 'close', (e,popup) ->
			popupClose(popup)
			return


	return

]




