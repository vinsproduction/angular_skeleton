
###  Directives ###

appDirectives = angular.module('appDirectives', [])

appDirectives.directive('placeholderDirective', ->

	restrict: 'A'
	scope: {}
	link: (scope, el, attr) ->

		el = $(el)

		el.focus ->
			if el.val() is attr.placeholderDirective 
				 el.val("")

		el.blur ->
			if el.val() is "" 
				 el.val(attr.placeholderDirective)

		el.blur()

		return
)