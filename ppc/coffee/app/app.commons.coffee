### App Commons ###

app.run ['APP','$rootScope',(APP,$rootScope) ->

	### HELPERS ###
	$rootScope.isEmpty 		= _.isEmpty
	$rootScope.size 			=  _.size

	declOfNum = (number, titles) ->
		cases = [2, 0, 1, 1, 1, 2]
		titles[if number % 100 > 4 and number % 100 < 20 then 2 else cases[if number % 10 < 5 then number % 10 else 5]]

	# $rootScope.declOfViews 	= (val) -> declOfNum(val, ['Просмотр', 'Просмотра', 'Просмотров'])
	

	return

]



### FORMS ###
 
app.forms = {}

app.forms.scroll = (el) ->

	$select = el
	$selected = $select.find('[data-selected]')
	$options 	= $select.find('[data-options]')

	if !$select.find('.scrollbar').size()
		$options.wrapInner """
			<div class="viewport"><div class="overview"></div></div>
		"""
		$options.prepend """
			<div class="scrollbar"><div class="track"><div class="thumb"><div class="end"></div></div></div></div>
		"""

	_.defer ->
		scrollbar = $options.tinyscrollbar({sizethumb: 40,wheel: (if $$.browser.mobile then 2 else 40),invertscroll:$$.browser.mobile})
		$selected.click -> scrollbar.tinyscrollbar_update()
		scrollbar.tinyscrollbar_update()

	return


