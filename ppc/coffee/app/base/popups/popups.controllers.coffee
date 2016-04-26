
app.controller('popupsCtrl', ['APP','Api','Popup','$rootScope','$scope','$timeout', (APP,Api,Popup,$rootScope,$scope,$timeout) ->
	
	# $rootScope.popups.example  <-- scope popup custom

	# $timeout ->
	# 	popup.open('example',{scope: {title:'Hello',body: 'World', popupsCtrlScope: $scope} })
	
])
