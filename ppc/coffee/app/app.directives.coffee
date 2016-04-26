
### Directives ###

app.directive('tabsDirective', ['$rootScope','$window', '$location', ($rootScope, $window, $location)->

	restrict: 'A'
	link: (scope, el, attr) ->

		$tabs = $(el)
		$labels 	= $tabs.find('> .labels')

		$rootScope.$on '$locationChangeStart', (next, current) ->
			name = $location.path().replace('/', '')
			openTab(name)
			return

		$labels.on 'click' , '.label',  ->
			name = $(@).attr('data-tab')
			$location.path(name)
			$rootScope.$apply()
			return

		openTab = (name) ->

			$label 		= $labels.find('> .label')
			$content 	= $tabs.find('> .contents > .content')

			if $label.filter("[data-tab='#{name}']").size()

				$label.removeClass 'active'
				$content.removeClass 'active'

				$label.filter("[data-tab='#{name}']").addClass 'active'
				$content.filter("[data-tab='#{name}']").addClass 'active'

			return

		return

])